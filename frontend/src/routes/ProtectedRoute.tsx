import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "../hooks/authProvider.tsx";

const ProtectedRoute = () => {
  const user = useAuth();
  if (!user.access_token || !user.user || Object.keys(user.user).length===0) return <Navigate to="/signin" replace />;
  return <Outlet />;
};

export default ProtectedRoute;

