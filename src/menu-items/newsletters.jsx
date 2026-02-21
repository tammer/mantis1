// assets
import { MailOutlined } from '@ant-design/icons';

// icons
const icons = {
  MailOutlined
};

// ==============================|| MENU ITEMS - NEWSLETTERS ||============================== //

const newsletters = {
  id: 'newsletters',
  title: 'Newsletters',
  type: 'group',
  children: [
    {
      id: 'newsletter-one',
      title: 'Newsletter One',
      subtitle: 'Latest updates',
      type: 'item',
      url: '#',
      icon: icons.MailOutlined
    },
    {
      id: 'newsletter-two',
      title: 'Newsletter Two',
      subtitle: 'Weekly digest',
      type: 'item',
      url: '#',
      icon: icons.MailOutlined
    },
    {
      id: 'newsletter-three',
      title: 'Newsletter Three',
      subtitle: 'Monthly roundup',
      type: 'item',
      url: '#',
      icon: icons.MailOutlined
    }
  ]
};

export default newsletters;
