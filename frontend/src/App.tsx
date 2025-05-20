import { ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import theme from "./theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarContextProvider } from "./context/SnackbarContext";
import { AuthContextProvider } from "./context/AuthContext";
import UnAuthLayout from "./routes/UnAuth";
import Login from "./routes/UnAuth/Login";
import SignUp from "./routes/UnAuth/SignUp";
import Dashboard from "./routes/Auth/Dashboard";
import AuthLayout from "./routes/Auth";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const router = createBrowserRouter([
    {
      element: <UnAuthLayout />,
      children: [
        {
          path: "/",
          element: (
            <PublicRoute>
              <>Home Page</>
            </PublicRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          ),
        },
        {
          path: "/sign-up",
          element: (
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          ),
        },
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/main/chats",
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SnackbarContextProvider>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </SnackbarContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
