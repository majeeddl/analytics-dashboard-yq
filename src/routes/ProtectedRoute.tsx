import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "@/store/auth.store";

const ProtectedRoute = () => {
  const token = authStore((state) => state.token);

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
