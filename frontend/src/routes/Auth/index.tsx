import Grid from "../../components/Grid";
import { Navigate, Outlet } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";
import { Box, CircularProgress } from "@mui/material";

const AuthLayout = () => {
  const { fetchUserDetailsLoading, user } = useAuthentication();
  if (fetchUserDetailsLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100dvh",
        }}
      >
        <CircularProgress sx={{ fontSize: { md: "6rem" } }} />
      </Box>
    );
  }
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
