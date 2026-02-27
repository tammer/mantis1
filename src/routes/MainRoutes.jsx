import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import ProtectedRoute from 'components/ProtectedRoute';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// render - newsletter pages
const NewsletterDetail = Loadable(lazy(() => import('pages/newsletters/NewsletterDetail')));
const AddNewsletter = Loadable(lazy(() => import('pages/newsletters/AddNewsletter')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'newsletters',
      element: <ProtectedRoute />,
      children: [
        {
          path: 'add',
          element: <AddNewsletter />
        },
        {
          path: ':id',
          element: <NewsletterDetail />
        },
        {
          path: ':id/posts/:postId',
          element: <NewsletterDetail />
        }
      ]
    }
  ]
};

export default MainRoutes;
