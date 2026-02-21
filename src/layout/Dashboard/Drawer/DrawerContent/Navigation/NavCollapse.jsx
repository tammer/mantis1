import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import IconButton from 'components/@extended/IconButton';
import NavItem from './NavItem';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';

// assets
import DownOutlined from '@ant-design/icons/DownOutlined';
import MoreOutlined from '@ant-design/icons/MoreOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';

// ==============================|| NAVIGATION - COLLAPSE ||============================== //

export default function NavCollapse({ item, isOpen = false, onToggle }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const menuOpen = Boolean(menuAnchorEl);

  const ExpandIcon = isOpen ? DownOutlined : RightOutlined;

  const handleToggle = (e) => {
    if (e) e.stopPropagation();
    onToggle?.();
  };

  const handleMenuOpen = (e) => {
    e.stopPropagation();
    setMenuAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  if (!drawerOpen) {
    return (
      <ListItemButton
        onClick={() => handlerDrawerOpen(true)}
        sx={{
          zIndex: 1201,
          pl: 1.5,
          py: 1.25,
          '&:hover': { bgcolor: 'transparent' }
        }}
      >
        <RightOutlined style={{ fontSize: '1.25rem' }} />
      </ListItemButton>
    );
  }

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          ...(drawerOpen && {
            '&:hover': { bgcolor: 'primary.lighter' },
            ...(menuOpen && { bgcolor: 'primary.lighter' })
          })
        }}
      >
        <ListItemButton
          onClick={handleToggle}
          sx={{
            zIndex: 1201,
            pl: 1,
            py: 1,
            '&:hover': { bgcolor: 'transparent' }
          }}
        >
          <ExpandIcon
            style={{ fontSize: '0.875rem', flexShrink: 0, marginRight: 12 }}
            onClick={(e) => {
              e.stopPropagation();
              handleToggle();
            }}
          />
          <ListItemText
            primary={
              <Typography variant="h6" sx={{ color: 'text.primary' }}>
                {item.title}
              </Typography>
            }
            secondary={
              item.subtitle ? (
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                  {item.subtitle}
                </Typography>
              ) : undefined
            }
          />
        </ListItemButton>
        <IconButton
          size="small"
          color="secondary"
          variant="text"
          onClick={handleMenuOpen}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 8,
            transform: 'translateY(-50%)',
            zIndex: 1202,
            width: 24,
            height: 24,
            color: 'text.secondary',
            '&:hover': { color: 'text.primary' }
          }}
        >
          <MoreOutlined style={{ fontSize: '1rem' }} />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              // stub: delete
            }}
          >
            Delete
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleMenuClose();
              // stub: refresh
            }}
          >
            Refresh
          </MenuItem>
        </Menu>
      </Box>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <Box component="ul" sx={{ listStyle: 'none', pl: 0, m: 0 }}>
          {item.children?.map(
            (child) =>
              child.type === 'item' && (
                <Box component="li" key={child.id}>
                  <NavItem item={child} level={2} />
                </Box>
              )
          )}
        </Box>
      </Collapse>
    </>
  );
}

NavCollapse.propTypes = {
  item: PropTypes.object,
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func
};
