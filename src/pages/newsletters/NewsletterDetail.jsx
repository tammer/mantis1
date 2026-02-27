import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import { useNewsletters } from 'contexts/NewslettersContext';
import { fetchPostSummary } from 'api/newsletter';

// ==============================|| NEWSLETTER DETAIL (POST SUMMARY) ||============================== //

export default function NewsletterDetail() {
  const { id: newsletterId, postId } = useParams();
  const { accessToken } = useNewsletters();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message ?? 'Failed to load article.');
        setLoading(false);
      });
  }, [postId, accessToken]);

  if (!newsletterId) {
    return (
      <Box sx={{ maxWidth: 720 }}>
        <MainCard title="Article">
          <Typography color="text.secondary">Select a newsletter and post from the sidebar.</Typography>
        </MainCard>
      </Box>
    );
  }

  if (!postId) {
    return (
      <Box sx={{ maxWidth: 720 }}>
        <MainCard title="Article">
          <Typography color="text.secondary">Select a post from the sidebar to view its summary.</Typography>
        </MainCard>
      </Box>
    );
  }

  if (loading) return <Loader />;

  if (error) {
    return (
      <Box sx={{ maxWidth: 720 }}>
        <MainCard title="Article">
          <Typography color="error">{error}</Typography>
        </MainCard>
      </Box>
    );
  }

  if (!summary) return null;

  const title = summary.article_title ?? summary.title ?? 'Article';
  const postDate = summary.post_date ?? summary.date ?? '';

  return (
    <Box sx={{ maxWidth: 720 }}>
      <MainCard title={<Typography variant="h3">{title}</Typography>}>
        <Stack spacing={2}>
          {postDate && (
            <Typography variant="body2" color="text.secondary">
              {postDate}
            </Typography>
          )}
          {summary.url && (
            <Link href={summary.url} target="_blank" rel="noopener noreferrer" variant="body2">
              Read full article
            </Link>
          )}
          {summary.short_summary && (
            <Typography variant="h5" component="p">
              {summary.short_summary}
            </Typography>
          )}
          {summary.full_summary && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {summary.full_summary}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
            <Button variant="outlined" size="small" color="inherit" sx={{ textTransform: 'none' }}>
              Mark as Read
            </Button>
          </Box>
        </Stack>
      </MainCard>
    </Box>
  );
}
