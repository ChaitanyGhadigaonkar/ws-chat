import Grid from "../Grid";
import ChatTabs from "./ChatTabs";
import ChatCard from "./ChatCard";
import MyProfile from "./MyProfile";

const ChatList = () => {
  return (
    <Grid
      container
      direction={"column"}
      gap={{ xs: "1rem", md: "1.5rem" }}
      sx={{
        backgroundColor: "#FFF",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        borderRadius: "0.5rem",
        padding: {
          xs: "1rem 0.8rem",
          md: "1rem 2rem",
        },
      }}
    >
      <MyProfile />
      <ChatTabs />

      <ChatCard />
      <ChatCard />
    </Grid>
  );
};

export default ChatList;
