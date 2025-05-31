import ChatList from "../../components/List/ChatList";
import Grid from "../../components/Grid";
import ChatDetails from "../../components/Details/ChatDetails";

const Dashboard = () => {
  return (
    <Grid
      container
      size={12}
      gap={{ xs: "1rem" }}
      sx={{
        backgroundColor: "#f9f8fd",
        minHeight: "100dvh",
        padding: {
          xs: "1rem 0.8rem",
          md: "1rem 2rem",
        },
      }}
    >
      <ChatList />
      <ChatDetails />
    </Grid>
  );
};

export default Dashboard;
