import { Button, Typography, IconButton, Divider } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import Grid from "../../components/Grid";
import { FormEvent, useCallback, useState } from "react";
import InputField from "../../components/InputField";
import { LOGIN_SCHEMA } from "../../schema/auth";
import { Link } from "react-router-dom";
import { useSnackbarContext } from "../../context/SnackbarContext";
import useAuthentication from "../../hooks/useAuthentication";

type LoginState = {
  email: string;
  password: string;
};
export default function Login() {
  const [loginState, setLoginState] = useState<LoginState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginState>>({});
  const { openSnackbar } = useSnackbarContext();
  const { loginUserPending, loginUser } = useAuthentication();

  const handleChange = useCallback(
    (field: keyof LoginState, value: LoginState[keyof LoginState]) => {
      setLoginState((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleErrors = useCallback(
    (field: keyof LoginState, value: LoginState[keyof LoginState]) => {
      setErrors((prev) => ({ ...prev, [field]: value }));
    },
    []
  );
  const handleLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setErrors({});
      const validate = LOGIN_SCHEMA.validate(loginState);
      if (validate.error) {
        handleErrors(
          validate.error.details[0].path[0] as keyof LoginState,
          validate.error.details[0].message
        );
      } else {
        try {
          await loginUser(validate.value);
        } catch (error: unknown) {
          if (error instanceof Error) {
            openSnackbar("failed", error.message);
          }
        }
      }
    },
    [loginState, handleErrors]
  );

  return (
    <Grid
      container
      size={12}
      sx={{
        maxWidth: "36rem",
        minHeight: "28rem",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        backgroundColor: "#ffffff",
      }}
    >
      <Grid size={12} sx={{ padding: "2rem 1.5rem 1rem" }}>
        <Typography
          variant="h4"
          fontWeight="600"
          textAlign="center"
          sx={{ mb: 1 }}
        >
          Welcome to{" "}
          <span style={{ color: "#0147ff", fontWeight: 700 }}>WS-Chat</span>
        </Typography>
        <Typography
          variant="subtitle1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Login to continue your conversations
        </Typography>
      </Grid>

      <Grid
        container
        size={12}
        gap={{ sm: "1.5rem" }}
        sx={{ padding: { xs: "0 1.5rem 1.5rem", sm: "0 2.5rem 2rem" } }}
      >
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <Grid container size={12} gap="1.25rem">
            <Grid size={12}>
              <InputField
                name="email"
                id="email"
                type="email"
                label="Email"
                placeholder="Enter your email address"
                fullWidth
                size="medium"
                value={loginState.email}
                onChange={(e) => handleChange("email", e.target.value)}
                errorText={errors.email}
              />
            </Grid>

            <Grid size={12}>
              <InputField
                name="password"
                id="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                fullWidth
                size="medium"
                value={loginState.password}
                onChange={(e) => handleChange("password", e.target.value)}
                errorText={errors.password}
              />
            </Grid>

            <Grid size={12}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disableElevation
                disabled={loginUserPending}
                loading={loginUserPending}
                sx={{
                  py: 1.25,
                  borderRadius: 1.5,
                  backgroundColor: "#0147ff",
                  "&:hover": {
                    backgroundColor: "#0039e0",
                  },
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>

        <Grid
          container
          size={12}
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 1 }}
        >
          <Grid>
            <Link
              to={"/forgot-password"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="subtitle2">Forgot password?</Typography>
            </Link>
          </Grid>
          <Grid>
            <Link
              to={"/sign-up"}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="subtitle2">Create an account</Typography>
            </Link>
          </Grid>
        </Grid>

        <Grid container size={12} sx={{ mt: 2 }}>
          <Divider sx={{ width: "100%", my: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
              OR
            </Typography>
          </Divider>

          <Grid
            container
            size={12}
            justifyContent="center"
            gap={1}
            sx={{ mt: 1 }}
          >
            <IconButton
              onClick={() => {}}
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: 1.5,
                p: 1.25,
              }}
            >
              <GitHub />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
