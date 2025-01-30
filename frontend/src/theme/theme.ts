import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6e00ff",
      light: "#dab9f6",
    },
    secondary: {
      main: "#eff6fc",
    },
    error: {
      main: "#f24e1e",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 425,
      md: 768,
      lg: 1024,
      xl: 1200,
    },
  },
});

export default theme;
