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
      type: 'item',
      url: '#',
      icon: icons.MailOutlined
    },
    {
      id: 'newsletter-two',
      title: 'Newsletter Two',
      type: 'item',
      url: '#',
      icon: icons.MailOutlined
    },
    {
      id: 'newsletter-three',
      title: 'Newsletter Three',
      type: 'item',
      url: '#',
      icon: icons.MailOutlined
    }
  ]
};

export default newsletters;
