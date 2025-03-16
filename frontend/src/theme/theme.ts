import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0147ff",
      light:"#6d8cda"
    },
    secondary: {
      main: "#f6f8fc",
    },
    error: {
      main: "#c13d3c",
    },
    text: {
      primary: "#212121",
      secondary: "#333333", // "#333333",
    },
    success: {
      main: "#47ac71"
    },
  },
  typography:{
    allVariants:{
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      color :"text.primary"
    },
    h3: {
      fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)"
    },
    h5: {
      fontSize: "clamp(1rem, 2.5vw, 1.3rem)"
    },
    subtitle2: {
       fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)"
    }
  },
  components:{
    MuiButton: {
      styleOverrides:{
        root:{
          textTransform: "none"
        }
      }
    },
    MuiInputBase:{
      styleOverrides:{
        root : {
          fontSize: "clamp(0.8rem, 2.5vw, 0.9rem)"
        }
      }
    }
  }
});

export default theme;
