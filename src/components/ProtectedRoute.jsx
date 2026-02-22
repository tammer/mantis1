import { Navigate, Outlet, useLocation } from 'react-router-dom';

// project imports
import Loader from 'components/Loader';
import { useAuth } from 'contexts/AuthContext';

// ==============================|| PROTECTED ROUTE ||============================== //

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader />;
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
