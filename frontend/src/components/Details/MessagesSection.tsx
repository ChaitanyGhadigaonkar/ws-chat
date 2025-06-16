import Grid from "../Grid";
import Message from "./Message";
import BackgroundImage from "../../assets/chat-background.png";

const MessagesSection = () => {
  const data = {
    username: "Harry Maguire",
    userImage: "https://picsum.photos/80/80",
    createdAt: "2023-10-27T10:00:00Z",
    id: "message-id",
    message: "this is just the random message from other side",
  };
  return (
    <Grid
      container
      flex={1}
      sx={{
        overflowY: "auto",
        paddingTop: { xs: "0.4rem", md: "1rem" },
        background: `url(${BackgroundImage}) no-repeat center center/cover`,
        padding: {
          xs: "0.6rem 0.8rem",
          md: "0.8rem 1rem",
        },
        gap: "1rem",
      }}
    >
      <Message {...data} />
      <Message {...data} />
      <Message {...data} />
      <Message {...data} />
      <Message {...data} />
      <Message {...data} />
      <Message {...data} />
    </Grid>
  );
};

export default MessagesSection;
