import { FC, ReactNode } from "react";
import useAuthentication from "../hooks/useAuthentication";
import { Box, CircularProgress } from "@mui/material";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const PrivateRoute: FC<Props> = ({ children }) => {
  const { user, fetchUserDetailsLoading } = useAuthentication();

  if (fetchUserDetailsLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress sx={{ fontSize: { md: "6rem" } }} />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default PrivateRoute;
