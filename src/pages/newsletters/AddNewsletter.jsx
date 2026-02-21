import { useState } from 'react';

// material-ui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| ADD NEWSLETTER ||============================== //

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`add-newsletter-tabpanel-${index}`} aria-labelledby={`add-newsletter-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function AddNewsletter() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ maxWidth: 720 }}>
      <MainCard title="Add Newsletter">
        <Tabs value={value} onChange={handleChange} aria-label="add newsletter methods">
          <Tab label="By URL" id="add-newsletter-tab-0" aria-controls="add-newsletter-tabpanel-0" />
          <Tab label="Manual Entry" id="add-newsletter-tab-1" aria-controls="add-newsletter-tabpanel-1" />
          <Tab label="Import" id="add-newsletter-tab-2" aria-controls="add-newsletter-tabpanel-2" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Typography variant="body1" color="text.secondary">
            Add a newsletter by entering its URL. Form and functionality can be added here.
          </Typography>
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
    </Box>
  );
}
