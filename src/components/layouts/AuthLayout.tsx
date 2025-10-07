import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../../common/utils";

export const AuthLayout = () => {
  const isAuthenticated = getToken("accessToken");

  if (isAuthenticated) {
    return <Navigate to="/customer" replace />;
  }

  return <Outlet />;
};
