import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../store/authStore";

interface ProtectedRouteProps {
  children: JSX.Element; // Protected route should wrap another element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if the user is logged in
  const accessToken = useAuthStore((state) => state.accessToken);

  if (!accessToken) {
    // If not logged in, redirect to the login page
    return <Navigate to="/auth/login" />;
  }

  // If logged in, allow access to the protected route
  return children || <Outlet />;
};

export default ProtectedRoute;
