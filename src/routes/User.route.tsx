import { Navigate, Outlet } from "react-router";

const UserRoute = () => {
  const auth = localStorage.getItem("auth");
  const user = auth ? JSON.parse(auth) : null;

  return user ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default UserRoute;
