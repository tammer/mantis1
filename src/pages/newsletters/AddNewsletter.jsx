import { useState } from 'react';

// material-ui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// project imports
import MainCard from 'components/MainCard';
import { subscribeNewsletterByUrl } from 'api/newsletter';
import { useAuth } from 'contexts/AuthContext';

// ==============================|| ADD NEWSLETTER ||============================== //

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`add-newsletter-tabpanel-${index}`} aria-labelledby={`add-newsletter-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function AddNewsletter() {
  const { session } = useAuth();
  const [value, setValue] = useState(0);
  const [url, setUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmitByUrl = async (e) => {
    e.preventDefault();
    if (!url?.trim() || submitting) return;
    setSubmitting(true);
    try {
      const accessToken = session?.access_token;
      const result = await subscribeNewsletterByUrl(url, accessToken);
      if (result.success) {
        setSnackbarMessage(result.message || 'Newsletter subscription added.');
        setSnackbarSeverity('success');
        setUrl('');
      } else {
        setSnackbarMessage(result.message || 'Subscription failed. Please try again.');
        setSnackbarSeverity('error');
      }
      setSnackbarOpen(true);
    } catch {
      setSnackbarMessage('Subscription failed. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const isValidUrl = (str) => {
    const trimmed = str?.trim() || '';
    if (!trimmed) return false;
    try {
      const parsed = new URL(trimmed);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const urlValid = isValidUrl(url);

  return (
    <Box sx={{ maxWidth: 720 }}>
      <MainCard title="Add Newsletter">
        <Tabs value={value} onChange={handleChange} aria-label="add newsletter methods">
          <Tab label="By URL" id="add-newsletter-tab-0" aria-controls="add-newsletter-tabpanel-0" />
          <Tab label="From Recommendations" id="add-newsletter-tab-1" aria-controls="add-newsletter-tabpanel-1" />
          <Tab label="Load Someone's list" id="add-newsletter-tab-2" aria-controls="add-newsletter-tabpanel-2" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Enter the URL of the newsletter you want to add.
          </Typography>
          <Stack component="form" onSubmit={handleSubmitByUrl} spacing={2} sx={{ maxWidth: 480 }}>
            <TextField
              fullWidth
              label="Newsletter URL"
              placeholder="https://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              variant="outlined"
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Tooltip title={!urlValid ? 'Enter a valid URL' : ''}>
              <span style={{ display: 'inline-block' }}>
                <Button type="submit" variant="contained" disabled={!urlValid || submitting}>
                  {submitting ? 'Submitting…' : 'Submit'}
                </Button>
              </span>
            </Tooltip>
          </Box>
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="body1" color="text.secondary">
            Create a new newsletter manually. Form and functionality can be added here.
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography variant="body1" color="text.secondary">
            Import a newsletter from a file or another source. Form and functionality can be added here.
          </Typography>
        </TabPanel>
      </MainCard>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
