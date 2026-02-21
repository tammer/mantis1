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
      title: "Aashay's Newsletter",
      subtitle: 'Aashay Sanghvi',
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        { id: 'n1-art-1', title: 'Article One', type: 'item', url: '#', date: 'Feb 18, 2025' },
        { id: 'n1-art-2', title: 'This Is Why Big Companies Pay $20B for Small Startups', type: 'item', url: '#', date: 'Feb 15, 2025' },
        { id: 'n1-art-3', title: 'This Is Why Big Companies Pay $20B for Small Startups. This Is Why Big Companies Pay $20B for Small Startups', type: 'item', url: '#', date: 'Feb 10, 2025' }
      ]
    },
    {
      id: 'newsletter-two',
      title: 'Newsletter Two',
      subtitle: 'Weekly digest',
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        { id: 'n2-art-1', title: 'Article One', type: 'item', url: '#', date: 'Feb 17, 2025' },
        { id: 'n2-art-2', title: 'Article Two', type: 'item', url: '#', date: 'Feb 12, 2025' }
      ]
    },
    {
      id: 'newsletter-three',
      title: 'Newsletter Three',
      subtitle: 'Monthly roundup',
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        { id: 'n3-art-1', title: 'Article One', type: 'item', url: '#', date: 'Feb 20, 2025' },
        { id: 'n3-art-2', title: 'Article Two', type: 'item', url: '#', date: 'Feb 14, 2025' },
        { id: 'n3-art-3', title: 'Article Three', type: 'item', url: '#', date: 'Feb 8, 2025' }
      ]
    }
  ]
};

export default newsletters;
