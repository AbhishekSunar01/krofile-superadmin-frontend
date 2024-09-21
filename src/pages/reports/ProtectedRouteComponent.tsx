import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../../utils/checkIfLoggedIn";

interface ProtectedRouteProps {
  children: JSX.Element; // Protected route should wrap another element
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if the user is logged in
  const isLoggedIn = isUserLoggedIn();

  if (!isLoggedIn) {
    // If not logged in, redirect to the login page
    return <Navigate to="/auth/login" />;
  }

  // If logged in, allow access to the protected route
  return children;
};

export default ProtectedRoute;
