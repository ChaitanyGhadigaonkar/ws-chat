import { useEffect } from "react";
import API_INSTANCE from "../../api/api";
import Grid from "../../components/Grid";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  useEffect(() => {
    (async () => {
      console.log(
        await API_INSTANCE.get("/api/auth/profile", { withCredentials: true })
      );
    })();
  }, []);
  return (
    <Grid container size={12}>
      <Outlet />
    </Grid>
  );
};
export default AuthLayout;
