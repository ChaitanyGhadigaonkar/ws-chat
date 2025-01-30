import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";

import router from "./routes/routes";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
