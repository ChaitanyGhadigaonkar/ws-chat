import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0147ff",
      light: "#6d8cda",
    },
    secondary: {
      main: "#f6f8fc",
    },
    error: {
      main: "#c13d3c",
    },
    text: {
      primary: "#313131",
      secondary: "#616161",
    },
  },
  typography: {
    allVariants: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      color: "text.primary",
    },
    h3: {
      fontSize: "clamp(1.6rem, 1.5vw + 0.5rem, 2.4rem)",
    },
    h5: {
      fontSize: "clamp(1rem, 1.5vw + 0.5rem, 1.3rem)",
    },
    subtitle1: {
      fontSize: "clamp(0.9rem, 1.5vw + 0.5rem, 1rem)",
    },
    subtitle2: {
      fontSize: "clamp(0.8rem, 1.5vw + 0.5rem, 0.9rem)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "clamp(0.8rem, 1.5vw + 0.5rem, 0.9rem)",
        },
      },
    },
  },
});

export default theme;
