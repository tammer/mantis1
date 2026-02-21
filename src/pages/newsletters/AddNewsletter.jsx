// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| ADD NEWSLETTER ||============================== //

export default function AddNewsletter() {
  return (
    <Box sx={{ maxWidth: 720 }}>
      <MainCard title="Add Newsletter">
        <Typography variant="body1" color="text.secondary">
          Add a new newsletter. Form and functionality can be added here.
        </Typography>
      </MainCard>
    </Box>
  );
}
