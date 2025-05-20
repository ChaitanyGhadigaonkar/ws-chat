import Grid from "../../components/Grid";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Grid container size={12}>
      <Outlet />
    </Grid>
  );
};
export default AuthLayout;
