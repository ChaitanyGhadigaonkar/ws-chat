import { Outlet } from "react-router-dom";
import Grid from "../../components/Grid";
import useAuthentication from "../../hooks/useAuthentication";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

const UnAuthLayout = () => {
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
  if (user) {
    return <Navigate to={"/main/chats"} />;
  }
  return (
    <Grid
      container
      alignItems={"center"}
      justifyContent="center"
      minHeight={"100dvh"}
      width={{ xs: "95%", sm: "100%" }}
      maxWidth={"1440px"}
      marginX="auto"
    >
      <Outlet />
    </Grid>
  );
};

export default UnAuthLayout;
