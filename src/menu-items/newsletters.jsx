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
        { id: 'n1-art-3', title: 'This Is Why Big Companies Pay $20B for Small Startups. This Is Why Big Companies Pay $20B for Small Startups', type: 'item', url: '#', date: 'Feb 10, 2025' },
        { id: 'n1-art-4', title: 'Article Four', type: 'item', url: '#', date: 'Feb 7, 2025' },
        { id: 'n1-art-5', title: 'Article Five', type: 'item', url: '#', date: 'Feb 4, 2025' },
        { id: 'n1-art-6', title: 'Article Six', type: 'item', url: '#', date: 'Jan 31, 2025' },
        { id: 'n1-art-7', title: 'Article Seven', type: 'item', url: '#', date: 'Jan 28, 2025' },
        { id: 'n1-art-8', title: 'Article Eight', type: 'item', url: '#', date: 'Jan 24, 2025' },
        { id: 'n1-art-9', title: 'Article Nine', type: 'item', url: '#', date: 'Jan 20, 2025' },
        { id: 'n1-art-10', title: 'Article Ten', type: 'item', url: '#', date: 'Jan 16, 2025' },
        { id: 'n1-art-11', title: 'Article Eleven', type: 'item', url: '#', date: 'Jan 12, 2025' },
        { id: 'n1-art-12', title: 'Article Twelve', type: 'item', url: '#', date: 'Jan 8, 2025' },
        { id: 'n1-art-13', title: 'Article Thirteen', type: 'item', url: '#', date: 'Jan 4, 2025' }
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
    },
    {
      id: 'newsletter-four',
      title: 'Newsletter Four',
      subtitle: 'Tech insights',
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        { id: 'n4-art-1', title: 'Article One', type: 'item', url: '#', date: 'Feb 19, 2025' },
        { id: 'n4-art-2', title: 'Article Two', type: 'item', url: '#', date: 'Feb 11, 2025' }
      ]
    },
    {
      id: 'newsletter-five',
      title: 'Newsletter Five',
      subtitle: 'Startup weekly',
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        { id: 'n5-art-1', title: 'Article One', type: 'item', url: '#', date: 'Feb 18, 2025' },
        { id: 'n5-art-2', title: 'Article Two', type: 'item', url: '#', date: 'Feb 9, 2025' }
      ]
    },
    {
      id: 'newsletter-six',
      title: 'Newsletter Six',
      subtitle: 'Design digest',
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        { id: 'n6-art-1', title: 'Article One', type: 'item', url: '#', date: 'Feb 17, 2025' },
        { id: 'n6-art-2', title: 'Article Two', type: 'item', url: '#', date: 'Feb 6, 2025' }
      ]
    },
    {
      id: 'newsletter-seven',
      title: 'Newsletter Seven',
      subtitle: 'Product updates',
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        { id: 'n7-art-1', title: 'Article One', type: 'item', url: '#', date: 'Feb 16, 2025' },
        { id: 'n7-art-2', title: 'Article Two', type: 'item', url: '#', date: 'Feb 3, 2025' }
      ]
    },
    {
      id: 'newsletter-eight',
      title: 'Newsletter Eight',
      subtitle: 'Marketing tips',
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        { id: 'n8-art-1', title: 'Article One', type: 'item', url: '#', date: 'Feb 15, 2025' },
        { id: 'n8-art-2', title: 'Article Two', type: 'item', url: '#', date: 'Jan 30, 2025' }
      ]
    },
    {
      id: 'newsletter-nine',
      title: 'Newsletter Nine',
      subtitle: 'Engineering blog',
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        { id: 'n9-art-1', title: 'Article One', type: 'item', url: '#', date: 'Feb 14, 2025' },
        { id: 'n9-art-2', title: 'Article Two', type: 'item', url: '#', date: 'Jan 27, 2025' }
      ]
    },
    {
      id: 'newsletter-ten',
      title: 'Newsletter Ten',
      subtitle: 'Leadership notes',
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        { id: 'n10-art-1', title: 'Article One', type: 'item', url: '#', date: 'Feb 13, 2025' },
        { id: 'n10-art-2', title: 'Article Two', type: 'item', url: '#', date: 'Jan 23, 2025' }
      ]
    },
    {
      id: 'newsletter-eleven',
      title: 'Newsletter Eleven',
      subtitle: 'Finance weekly',
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        { id: 'n11-art-1', title: 'Article One', type: 'item', url: '#', date: 'Feb 12, 2025' },
        { id: 'n11-art-2', title: 'Article Two', type: 'item', url: '#', date: 'Jan 19, 2025' }
      ]
    },
    {
      id: 'newsletter-twelve',
      title: 'Newsletter Twelve',
      subtitle: 'Culture & growth',
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        { id: 'n12-art-1', title: 'Article One', type: 'item', url: '#', date: 'Feb 11, 2025' },
        { id: 'n12-art-2', title: 'Article Two', type: 'item', url: '#', date: 'Jan 15, 2025' }
      ]
    },
    {
      id: 'newsletter-thirteen',
      title: 'Newsletter Thirteen',
      subtitle: 'Industry trends',
      type: 'collapse',
      icon: icons.MailOutlined,
      children: [
        { id: 'n13-art-1', title: 'Article One', type: 'item', url: '#', date: 'Feb 10, 2025' },
        { id: 'n13-art-2', title: 'Article Two', type: 'item', url: '#', date: 'Jan 11, 2025' }
      ]
    }
  ]
};

export default newsletters;
