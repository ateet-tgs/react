import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../../common/utils";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  // Determine which token to check based on the route
  let tokenKey = "accessToken"; // default
  if (pathname.startsWith("/customer")) {
    tokenKey = "customerAccessToken";
  }

  const isAuthenticated = getToken(tokenKey);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
