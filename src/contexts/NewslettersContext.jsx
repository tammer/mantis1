import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// project imports
import { fetchNewsletters, fetchPosts } from 'api/newsletter';
import { useAuth } from './AuthContext';

// assets
import { MailOutlined } from '@ant-design/icons';

const icons = { MailOutlined };

// ==============================|| NEWSLETTERS CONTEXT ||============================== //

export const NewslettersContext = createContext(undefined);

/**
 * Maps API newsletter to sidebar collapse item (no posts yet).
 */
function newsletterToMenuItem(nl) {
  const id = nl.id ?? encodeURIComponent(nl.url);
  return {
    id,
    title: nl.title,
    subtitle: nl.author,
    type: 'collapse',
    icon: icons.MailOutlined,
    url: `/newsletters/${id}`,
    newsletterUrl: nl.url,
    children: []
  };
}

/**
 * Maps API post to sidebar NavItem shape. Links to post detail route.
 * Encodes the post URL into the route so the detail page can call /posts/summary.
 */
function postToMenuItem(post, index, newsletterId) {
  const fallbackId = post.id ?? `post-${newsletterId}-${index}`;
  const rawUrl = post.url ?? '';
  const routeKey = rawUrl ? encodeURIComponent(rawUrl) : fallbackId;
  return {
    id: routeKey,
    title: post.title,
    type: 'item',
    url: `/newsletters/${newsletterId}/posts/${routeKey}`,
    date: post.date,
    read: !!post.read,
    postUrl: rawUrl || undefined
  };
}

/** Sort posts: unread first, then by date newest first */
function sortPostsByUnreadThenDate(items) {
  return [...items].sort((a, b) => {
    const unreadFirst = (a.read ? 1 : 0) - (b.read ? 1 : 0);
    if (unreadFirst !== 0) return unreadFirst;
    const dateA = a.date ?? '';
    const dateB = b.date ?? '';
    return dateB.localeCompare(dateA);
  });
}

export function NewslettersProvider({ children }) {
  const { session } = useAuth();
  const accessToken = session?.access_token ?? null;

  const [newslettersList, setNewslettersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postsByUrl, setPostsByUrl] = useState({});
  const [postsLoadingByUrl, setPostsLoadingByUrl] = useState({});
  const [postsErrorByUrl, setPostsErrorByUrl] = useState({});
  const backgroundLoadStartedRef = useRef(false);

  const fetchNewslettersList = useCallback(() => {
    if (!accessToken) return Promise.resolve([]);
    setLoading(true);
    setError(null);
    return fetchNewsletters(accessToken)
      .then((list) => {
        setNewslettersList(list);
        setLoading(false);
        return list;
      })
      .catch((err) => {
        setError(err?.message ?? 'Failed to load newsletters');
        setNewslettersList([]);
        setLoading(false);
        throw err;
      });
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      setNewslettersList([]);
      setError(null);
      return;
    }
    fetchNewslettersList();
  }, [accessToken, fetchNewslettersList]);

  useEffect(() => {
    if (!accessToken || !newslettersList.length || backgroundLoadStartedRef.current) return;
    backgroundLoadStartedRef.current = true;
    let cancelled = false;
    (async () => {
      for (const nl of newslettersList) {
        if (cancelled) break;
        await loadPosts(nl.url);
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once when newsletters load; omit loadPosts to avoid re-running when postsByUrl updates
  }, [accessToken, newslettersList]);

  const loadPosts = useCallback(
    async (newsletterUrl) => {
      if (!accessToken || !newsletterUrl) return;
      if (postsByUrl[newsletterUrl]) return; // already loaded
      setPostsLoadingByUrl((prev) => ({ ...prev, [newsletterUrl]: true }));
      setPostsErrorByUrl((prev) => ({ ...prev, [newsletterUrl]: null }));
      try {
        const posts = await fetchPosts(newsletterUrl, accessToken);
        const newsletter = newslettersList.find((nl) => nl.url === newsletterUrl);
        const id = newsletter?.id ?? encodeURIComponent(newsletterUrl);
        const children = sortPostsByUnreadThenDate(posts.map((p, i) => postToMenuItem(p, i, id)));
        setPostsByUrl((prev) => ({ ...prev, [newsletterUrl]: children }));
      } catch (err) {
        setPostsErrorByUrl((prev) => ({
          ...prev,
          [newsletterUrl]: err?.message ?? 'Failed to load posts'
        }));
      } finally {
        setPostsLoadingByUrl((prev) => ({ ...prev, [newsletterUrl]: false }));
      }
    },
    [accessToken, newslettersList, postsByUrl]
  );

  const getNewsletterById = useCallback(
    (id) => {
      const byId = newslettersList.find((nl) => (nl.id ?? encodeURIComponent(nl.url)) === id);
      if (byId) return byId;
      try {
        const decoded = decodeURIComponent(id);
        return newslettersList.find((nl) => nl.url === decoded) ?? null;
      } catch {
        return null;
      }
    },
    [newslettersList]
  );

  const getPostReadStatus = useCallback(
    (postUrl) => {
      if (!postUrl) return undefined;
      for (const nl of newslettersList) {
        const children = postsByUrl[nl.url];
        if (!children) continue;
        const post = children.find((c) => c.postUrl === postUrl);
        if (post) return post.read;
      }
      return undefined;
    },
    [newslettersList, postsByUrl]
  );

  const setPostReadStatus = useCallback((postUrl, read) => {
    if (!postUrl) return;
    setPostsByUrl((prev) => {
      const next = { ...prev };
      for (const nl of newslettersList) {
        const children = next[nl.url];
        if (!children) continue;
        const idx = children.findIndex((c) => c.postUrl === postUrl);
        if (idx >= 0) {
          next[nl.url] = children.map((c, i) => (i === idx ? { ...c, read } : c));
          break;
        }
      }
      return next;
    });
  }, [newslettersList]);

  const menuGroup = {
    id: 'newsletters',
    title: 'Newsletters',
    type: 'group',
    children: newslettersList.map((nl) => {
      const menuItem = newsletterToMenuItem(nl);
      const loaded = postsByUrl[nl.url];
      menuItem.children = loaded ? sortPostsByUnreadThenDate(loaded) : [];
      return menuItem;
    })
  };

  const value = {
    newslettersList,
    menuGroup,
    loading,
    error,
    loadPosts,
    postsLoadingByUrl,
    postsErrorByUrl,
    getNewsletterById,
    getPostReadStatus,
    setPostReadStatus,
    accessToken,
    refetchNewsletters: fetchNewslettersList
  };

  return (
    <NewslettersContext.Provider value={value}>
      {children}
    </NewslettersContext.Provider>
  );
}

NewslettersProvider.propTypes = { children: PropTypes.node };

export function useNewsletters() {
  const context = useContext(NewslettersContext);
  if (context === undefined) {
    throw new Error('useNewsletters must be used within a NewslettersProvider');
  }
  return context;
}
