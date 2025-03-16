import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";

import router from "./routes/routes";
import theme from "./theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarContextProvider } from "./context/SnackbarContext";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarContextProvider>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </SnackbarContextProvider>
    </QueryClientProvider>
  );
}

export default App;
