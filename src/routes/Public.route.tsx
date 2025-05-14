import { Navigate, Outlet } from "react-router";

const PublicRoute = () => {
  const auth = localStorage.getItem("auth");
  const user = auth ? JSON.parse(auth) : null;

  return !user?.token ? <Outlet /> : user ? <Navigate to="/" /> : null;
};

export default PublicRoute;
