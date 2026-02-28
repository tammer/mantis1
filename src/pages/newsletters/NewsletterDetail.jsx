import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import { useNewsletters } from 'contexts/NewslettersContext';
import { fetchPostSummary, setArticleReadStatus } from 'api/newsletter';

// ==============================|| NEWSLETTER DETAIL (POST SUMMARY) ||============================== //

function ArticleStateCard({ children, color = 'text.secondary' }) {
  return (
    <Box sx={{ maxWidth: 720, mt: 3 }}>
      <MainCard title="Article">
        <Typography color={color}>{children}</Typography>
      </MainCard>
    </Box>
  );
}

export default function NewsletterDetail() {
  const { id: newsletterId, postId } = useParams();
  const navigate = useNavigate();
  const { accessToken, setPostReadStatus, getPostReadStatus, menuGroup } = useNewsletters();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRead, setIsRead] = useState(false);
  const [readLoading, setReadLoading] = useState(false);

  useEffect(() => {
    if (!postId || !accessToken) {
      setSummary(null);
      setLoading(false);
      setError(null);
      return;
    }
    let postUrl = postId;
    try {
      postUrl = decodeURIComponent(postId);
    } catch {
      // ignore, use raw value
    }
    setLoading(true);
    setError(null);
    setSummary(null);
    fetchPostSummary(postUrl, accessToken)
      .then((data) => {
        setSummary(data);
        const url = data.url ?? postUrl;
        const readFromApi = data.read;
        const readFromSidebar = getPostReadStatus(url);
        setIsRead(readFromApi !== undefined ? !!readFromApi : !!readFromSidebar);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message ?? 'Failed to load article.');
        setLoading(false);
      });
  }, [postId, accessToken]);

  if (!newsletterId) {
    return <ArticleStateCard>Select a newsletter and post from the sidebar.</ArticleStateCard>;
  }

  if (!postId) {
    return <ArticleStateCard>Select a post from the sidebar to view its summary.</ArticleStateCard>;
  }

  if (loading) {
    return (
      <Box sx={{ maxWidth: 720, mt: 3 }}>
        <MainCard title="Article">
          <Stack alignItems="center" spacing={2} sx={{ py: 4 }}>
            <CircularProgress size={40} />
            <Typography variant="body2" color="text.secondary">
              Loading article…
            </Typography>
          </Stack>
        </MainCard>
      </Box>
    );
  }

  if (error) {
    return <ArticleStateCard color="error">{error}</ArticleStateCard>;
  }

  if (!summary) return null;

  const title = summary.article_title ?? summary.title ?? 'Article';
  const postDate = summary.post_date ?? summary.date ?? '';
  const articleUrl = summary.url ?? '';

  const handleToggleRead = () => {
    if (!articleUrl || readLoading) return;
    const newRead = !isRead;
    let nextUnread;
    if (newRead) {
      const newsletter = menuGroup?.children?.find((c) => c.id === newsletterId);
      const posts = newsletter?.children ?? [];
      nextUnread = posts.find((p) => !p.read && p.postUrl !== articleUrl);
    }
    setReadLoading(true);
    setArticleReadStatus(articleUrl, newRead, accessToken)
      .then(() => {
        setIsRead(newRead);
        setPostReadStatus(articleUrl, newRead);
        if (newRead) {
          if (nextUnread) navigate(nextUnread.url);
          else navigate(`/newsletters/${newsletterId}`);
        }
      })
      .catch(() => {})
      .finally(() => setReadLoading(false));
  };

  const readColor = isRead ? 'text.secondary' : undefined;

  return (
    <Box sx={{ maxWidth: 720, mt: 3 }}>
      <MainCard
        title={
          <Typography variant="h3" color={readColor}>
            {title}
          </Typography>
        }
      >
        <Stack spacing={2} sx={isRead ? { color: 'text.secondary' } : undefined}>
          {postDate && (
            <Typography variant="body2" color="text.secondary">
              {postDate}
            </Typography>
          )}
          {summary.short_summary && (
            <Typography variant="h5" component="p">
              {summary.short_summary}
            </Typography>
          )}
          {summary.full_summary && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body1" component="p" sx={{ whiteSpace: 'pre-line' }}>
                {summary.full_summary}
                {summary.url && (
                  <>
                    {' '}
                    <Link href={summary.url} target="_blank" rel="noopener noreferrer" variant="body2">
                      Full article&raquo;
                    </Link>
                  </>
                )}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2, ...(isRead && { color: 'text.primary' }) }}>
            <Button
              variant="outlined"
              size="small"
              color={isRead ? 'primary' : 'inherit'}
              sx={{ textTransform: 'none' }}
              onClick={handleToggleRead}
              disabled={!articleUrl || readLoading}
            >
              {isRead ? 'Mark unread' : 'Mark as Read'}
            </Button>
          </Box>
        </Stack>
      </MainCard>
    </Box>
  );
}
