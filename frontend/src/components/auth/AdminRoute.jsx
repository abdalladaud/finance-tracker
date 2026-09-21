import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "@/lib/store/authStore";

function AdminRoute() {
  const user = useAuthStore((state) => state.user);

  if (user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;