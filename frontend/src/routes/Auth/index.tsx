import Grid from "../../components/Grid";
import { Navigate, Outlet } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";

const AuthLayout = () => {
  const { user } = useAuthentication();

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <Grid container size={12}>
      <Outlet />
    </Grid>
  );
};
export default AuthLayout;
