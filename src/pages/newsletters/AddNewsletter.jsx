import { useState } from 'react';

// material-ui
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalSeverity, setModalSeverity] = useState('success');

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
        setModalMessage(result.message || 'Newsletter subscription added.');
        setModalTitle(result.title || '');
        setModalSeverity('success');
        setUrl('');
      } else {
        setModalMessage(result.message || 'Subscription failed. Please try again.');
        setModalTitle('');
        setModalSeverity('error');
      }
      setModalOpen(true);
    } catch {
      setModalMessage('Subscription failed. Please try again.');
      setModalTitle('');
      setModalSeverity('error');
      setModalOpen(true);
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
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} PaperProps={{ sx: { maxWidth: 432, width: '100%' } }}>
        <DialogContent sx={{ pt: 3 }}>
          {modalSeverity === 'success' && modalTitle && (
            <Typography variant="h5" component="p" sx={{ fontWeight: 600, mb: 2 }}>
              {modalTitle}
            </Typography>
          )}
          <Alert severity={modalSeverity} variant="outlined" sx={{ mt: 0 }}>
            {modalMessage}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} variant="contained" color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
