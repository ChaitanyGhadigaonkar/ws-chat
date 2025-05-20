import { Outlet } from "react-router-dom";
import Grid from "../../components/Grid";

const UnAuthLayout = () => {
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
