import { Badge } from "@mui/material";
import Grid from "../Grid";
import { DoneAll, PushPinOutlined } from "@mui/icons-material";
import { format } from "date-fns";

const ChatCard = () => {
  const hasUnreadMessages = true;
  return (
    <Grid container direction={"row"} alignItems={"center"} gap={"1rem"}>
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

      <Grid container direction={"column"} size="grow" gap={"0.2rem"}>
        <Grid
          container
          size={12}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Grid
            sx={{
              typography: "subtitle1",
              fontWeight: "500",
            }}
          >
            John Doe
          </Grid>
          <Grid
            container
            alignItems={"center"}
            sx={{
              typography: "body2",
              color: "text.secondary",
              gap: "0.2rem",
            }}
          >
            <PushPinOutlined fontSize="small" />
            {format(new Date(), "hh:mmm aa")}
          </Grid>
        </Grid>

        <Grid
          container
          size="grow"
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Grid sx={{ typography: "body2", color: "text.secondary" }}>
            {"You need to improve now"}
          </Grid>
          <Grid>
            {hasUnreadMessages ? (
              <Badge
                color="error"
                badgeContent="5"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                sx={{
                  typography: "body2",
                }}
              >
                <Grid />
              </Badge>
            ) : (
              <DoneAll sx={{ color: "success.main" }} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatCard;
