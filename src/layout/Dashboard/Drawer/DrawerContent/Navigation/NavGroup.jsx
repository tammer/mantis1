import PropTypes from 'prop-types';
import { useState } from 'react';
// material-ui
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import { useGetMenuMaster } from 'api/menu';
import { useNewsletters } from 'contexts/NewslettersContext';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

export default function NavGroup({ item }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const { loadPosts, postsLoadingByUrl, postsErrorByUrl } = useNewsletters();
  const [openCollapseId, setOpenCollapseId] = useState(null);

  const handleCollapseToggle = (menuItemId, menuItem) => {
    const nextOpen = openCollapseId === menuItemId ? null : menuItemId;
    setOpenCollapseId(nextOpen);
    const apiUrl = menuItem?.newsletterUrl ?? menuItem?.url;
    if (nextOpen && apiUrl && (!menuItem.children || menuItem.children.length === 0)) {
      loadPosts(apiUrl);
    }
  };

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={menuItem.id}
            item={menuItem}
            isOpen={openCollapseId === menuItem.id}
            onToggle={() => handleCollapseToggle(menuItem.id, menuItem)}
            postsLoading={menuItem.newsletterUrl ? postsLoadingByUrl[menuItem.newsletterUrl] : false}
            postsError={menuItem.newsletterUrl ? postsErrorByUrl[menuItem.newsletterUrl] : null}
          />
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      subheader={
        item.title &&
        drawerOpen && (
          <Box sx={{ pl: 3, mb: 1.5 }}>
            <Typography variant="subtitle2" color="textSecondary">
              {item.title}
            </Typography>
            {/* only available in paid version */}
          </Box>
        )
      }
      sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
    >
      {navCollapse}
    </List>
  );
}

NavGroup.propTypes = { item: PropTypes.object };
