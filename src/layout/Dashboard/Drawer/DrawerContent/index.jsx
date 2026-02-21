// material-ui
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// project imports
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import { useGetMenuMaster } from 'api/menu';
import { useNavigate } from 'react-router-dom';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  const navigate = useNavigate();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  return (
    <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Button
          variant="contained"
          fullWidth={drawerOpen}
          onClick={() => navigate('/newsletters/add')}
          sx={{
            minWidth: drawerOpen ? undefined : 40,
            px: drawerOpen ? 2 : 1,
            justifyContent: 'center'
          }}
        >
          {drawerOpen && 'Add Newsletter'}
        </Button>
      </Box>
      <Navigation />
    </SimpleBar>
  );
}
