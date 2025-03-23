import { ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import theme from "./theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarContextProvider } from "./context/SnackbarContext";
import { AuthContextProvider } from "./context/AuthContext";
import UnAuthLayout from "./routes/UnAuth";
import Login from "./routes/UnAuth/Login";
import SignUp from "./routes/UnAuth/SignUp";
import Dashboard from "./routes/Auth/Dashboard";
import AuthLayout from "./routes/Auth";
import Layout from "./routes/Layout";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRouter>
          <SnackbarContextProvider>
            <ThemeProvider theme={theme}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="" element={<UnAuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="sign-up" element={<SignUp />} />
                  </Route>
                  <Route path="/main" element={<AuthLayout />}>
                    <Route path="chats" element={<Dashboard />} />
                  </Route>
                </Route>
              </Routes>
            </ThemeProvider>
          </SnackbarContextProvider>
        </BrowserRouter>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
