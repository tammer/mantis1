// assets
import { MailOutlined } from '@ant-design/icons';

// icons
const icons = {
  MailOutlined
};

// ==============================|| MENU ITEMS - NEWSLETTERS (SHELL) ||============================== //
// Newsletter list and posts are now loaded dynamically via NewslettersContext and GET /newsletters, GET /posts.
// This shell is kept for backwards compatibility (e.g. menu-items import). The sidebar uses context.

const newsletters = {
  id: 'newsletters',
  title: 'Newsletters',
  type: 'group',
  children: []
};

export default newsletters;
