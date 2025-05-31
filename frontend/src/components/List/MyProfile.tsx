import { Badge, IconButton, Typography } from "@mui/material";
import Grid from "../Grid";
import { SearchOutlined } from "@mui/icons-material";

const MyProfile = () => {
  return (
    <Grid
      container
      size={12}
      height={"fit-content"}
      alignItems={"center"}
      gap={"1rem"}
    >
      <Badge
        badgeContent={""}
        color="success"
        variant="dot"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        overlap="circular"
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
      </Badge>

      <Grid
        container
        size="grow"
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Grid size="grow">
          <Typography
            variant="subtitle1"
            fontWeight={"500"}
            color="text.primary"
          >
            Chinmay Ghadigaonkar
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight={"normal"}
            color="text.secondary"
          >
            Info account
          </Typography>
        </Grid>
        <Grid>
          <IconButton size="large">
            <SearchOutlined fontSize="medium" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MyProfile;
