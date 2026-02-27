import PropTypes from 'prop-types';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

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
    read: !!post.read
  };
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
        const children = posts.map((p, i) => postToMenuItem(p, i, id));
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

  const menuGroup = {
    id: 'newsletters',
    title: 'Newsletters',
    type: 'group',
    children: newslettersList.map((nl) => {
      const menuItem = newsletterToMenuItem(nl);
      const loaded = postsByUrl[nl.url];
      menuItem.children = loaded ?? [];
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
