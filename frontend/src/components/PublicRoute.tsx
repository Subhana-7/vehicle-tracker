import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const PublicRoute = ({ children }: any) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  console.log(isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;