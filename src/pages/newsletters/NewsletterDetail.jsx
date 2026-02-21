import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// material-ui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import { fetchNewsletterById } from 'api/newsletter';

// ==============================|| NEWSLETTER DETAIL ||============================== //

export default function NewsletterDetail() {
  const { id } = useParams();
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('No newsletter selected.');
      return;
    }
    setLoading(true);
    setError(null);
    fetchNewsletterById(id)
      .then((data) => {
        setPayload(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err?.message || 'Failed to load newsletter.');
        setLoading(false);
      });
  }, [id]);

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

  if (!payload) return null;

  return (
    <Box sx={{ maxWidth: 720 }}>
      <MainCard title={payload.title}>
        <Stack spacing={2}>
          <Typography variant="body2" color="text.secondary">
            {payload.date}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {payload.short_summary}
          </Typography>
          <Box sx={{ pt: 1 }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {payload.long_summary}
            </Typography>
          </Box>
        </Stack>
      </MainCard>
    </Box>
  );
}
