import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// project imports
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import { useNewsletters } from 'contexts/NewslettersContext';
import { fetchPosts } from 'api/newsletter';

// ==============================|| NEWSLETTER DETAIL ||============================== //

export default function NewsletterDetail() {
  const { id } = useParams();
  const { getNewsletterById, accessToken, loading: newslettersLoading } = useNewsletters();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const newsletter = id ? getNewsletterById(id) : null;

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('No newsletter selected.');
      return;
    }
    if (!newsletter) {
      if (!newslettersLoading) {
        setLoading(false);
        setError('Newsletter not found.');
      }
      return;
    }
    setLoading(true);
    setError(null);
    setPosts(null);
    fetchPosts(newsletter.url, accessToken)
      .then((list) => {
        setPosts(list);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message ?? 'Failed to load posts.');
        setLoading(false);
      });
  }, [id, newsletter?.url, accessToken, newslettersLoading]);

  if (!id) {
    return (
      <Box sx={{ maxWidth: 720 }}>
        <MainCard title="Newsletter">
          <Typography color="text.secondary">Select a newsletter from the sidebar.</Typography>
        </MainCard>
      </Box>
    );
  }

  if (!newsletter) {
    if (newslettersLoading) return <Loader />;
    return (
      <Box sx={{ maxWidth: 720 }}>
        <MainCard title="Newsletter">
          <Typography color="error">Newsletter not found.</Typography>
        </MainCard>
      </Box>
    );
  }

  if (loading) return <Loader />;

  if (error) {
    return (
      <Box sx={{ maxWidth: 720 }}>
        <MainCard title="Newsletter">
          <Typography color="error">{error}</Typography>
        </MainCard>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 720 }}>
      <MainCard title={<Typography variant="h3">{newsletter.title}</Typography>}>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            {newsletter.author}
          </Typography>
          {posts && posts.length > 0 ? (
            <List disablePadding>
              {posts.map((post, index) => (
                <ListItemButton
                  key={post.id ?? index}
                  component="a"
                  href={post.url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    ...(post.read && { opacity: 0.8 })
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: post.read ? 400 : 600
                        }}
                      >
                        {post.title}
                      </Typography>
                    }
                    secondary={post.date}
                  />
                  {!post.read && (
                    <Box
                      component="span"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        ml: 1,
                        flexShrink: 0
                      }}
                    />
                  )}
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Typography color="text.secondary">No posts yet.</Typography>
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
