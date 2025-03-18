import { Outlet } from "react-router-dom";
import Grid from "../../components/Grid";
import useAuthentication from "../../hooks/useAuthentication";
import { Navigate } from "react-router-dom";

const UnAuthLayout = () => {
  const { user } = useAuthentication();

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
