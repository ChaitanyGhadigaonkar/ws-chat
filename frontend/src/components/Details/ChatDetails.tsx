import { IconButton } from "@mui/material";
import Grid from "../Grid";
import { MoreVert } from "@mui/icons-material";

const ChatDetails = () => {
  return (
    <Grid
      size="grow"
      direction={"column"}
      container
      sx={{
        backgroundColor: "#FFF",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        borderRadius: "0.5rem",
        height: "100%",
      }}
    >
      <Grid
        sx={{
          position: "sticky",
          top: 0,
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
          borderTopLeftRadius: "0.5rem",
          borderToRightRadius: "0.5rem",
        }}
      >
        <Grid
          container
          direction={"row"}
          alignItems={"center"}
          gap={"1rem"}
          sx={{
            padding: {
              xs: "0.6rem 0.8rem",
              md: "0.8rem 1rem",
            },
          }}
        >
          <Grid
            sx={{
              width: "3rem",
              height: "3rem",
            }}
          >
            <img
              src="https://picsum.photos/80/80"
              alt="profile"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </Grid>

          <Grid container direction={"column"} gap={"0.2rem"}>
            <Grid
              container
              size={12}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Grid>
                <Grid
                  sx={{
                    typography: "subtitle1",
                    fontWeight: "600",
                  }}
                >
                  John Doe
                </Grid>
                <Grid
                  sx={{
                    typography: "body2",
                    color: "success.main",
                  }}
                >
                  John is typing...
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container marginLeft={"auto"}>
            <Grid>
              <IconButton>
                <MoreVert />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        flex={1}
        sx={{ overflowY: "auto", paddingTop: { xs: "0.4rem", md: "1rem" } }}
      >
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
        <p>Scrollable Middle view</p>
      </Grid>
      <Grid
        sx={{
          position: "sticky",
          bottom: 0,
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px -1.95px 2.6px",
          borderBottomLeftRadius: "0.5rem",
          borderBottomRightRadius: "0.5rem",
          padding: {
            xs: "0.6rem 0.8rem",
            md: "0.8rem 1rem",
          },
        }}
      >
        Fixed chat input
      </Grid>
    </Grid>
  );
};

export default ChatDetails;
