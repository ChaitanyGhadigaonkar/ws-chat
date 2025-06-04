import Grid from "../Grid";
import ChatTabs from "./ChatTabs";
import ChatCard from "./ChatCard";
import MyProfile from "./MyProfile";
import { MessageOutlined } from "@mui/icons-material";

const ChatList = () => {
  return (
    <Grid
      container
      direction={"column"}
      gap={{ xs: "1rem", md: "1rem" }}
      sx={{
        backgroundColor: "#FFF",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        borderRadius: "0.5rem",
      }}
    >
      <MyProfile />
      <ChatTabs />

      <Grid container direction={"column"} size={12} gap={"0.5rem"}>
        <Grid
          container
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            paddingX: {
              xs: "0.8rem",
              md: "2rem",
            },
          }}
        >
          <Grid sx={{ typography: "subtitle2" }}>Messages</Grid>
          <Grid>
            <MessageOutlined />
          </Grid>
        </Grid>
        <ChatCard />
        <ChatCard />
      </Grid>
    </Grid>
  );
};

export default ChatList;
