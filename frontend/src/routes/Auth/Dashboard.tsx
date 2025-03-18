import { Button } from "@mui/material";
import Grid from "../../components/Grid";
import { useCallback } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import { useSnackbarContext } from "../../context/SnackbarContext";

const Dashboard = () => {
  const { openSnackbar } = useSnackbarContext();
  const { logoutUser } = useAuthentication();

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (error: unknown) {
      if (error instanceof Error) {
        openSnackbar("failed", error.message);
      }
    }
  }, [logoutUser, openSnackbar]);

  return (
    <Grid container size={12}>
      Chat Screen
      <Button onClick={handleLogout}>Logout</Button>
    </Grid>
  );
};

export default Dashboard;
