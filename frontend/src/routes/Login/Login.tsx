import { Box } from "@mui/material";
import { Logo } from "../../assets/images";

export default function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100dvh",
      }}
    >
      <Box
        sx={{
          height: { xs: "80%", md: "26rem" },
          width: { xs: "90%", md: "20rem" },
          backgroundColor: "#FFF",
          borderRadius: 2,
          paddingX: { xs: ".8rem", md: 0 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Box
            sx={{
              aspectRatio: 1,
              width: "6rem",
              height: "3.2rem",
            }}
          >
            <img src={Logo} alt="logo" width={"100%"} height={"100%"} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
