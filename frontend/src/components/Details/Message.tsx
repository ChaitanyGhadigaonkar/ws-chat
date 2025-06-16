import { FC } from "react";
import Grid from "../Grid";
import { format } from "date-fns";
import { IconButton } from "@mui/material";
import { DoneAll, MoreVert } from "@mui/icons-material";

type Props = {
  username: string;
  userImage: string;
  createdAt: string;
  id: string;
  message: string;
};

const Message: FC<Props> = ({ username, userImage, createdAt, message }) => {
  const currentUser = Math.random() < 0.5;
  return (
    <Grid
      container
      size={8}
      direction={"row"}
      gap={"0.2rem"}
      sx={{
        ...(currentUser && {
          marginLeft: "auto",
        }),
      }}
    >
      <Grid
        container
        size={12}
        alignItems={"flex-start"}
        gap={"0.5rem"}
        justifyContent={currentUser ? "end" : "start"}
      >
        {!currentUser && (
          <Grid
            sx={{
              width: "2.4rem",
              height: "2.4rem",
              aspectRatio: "1/1",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <img
              src={userImage}
              alt="user_image"
              style={{ width: "100%", height: "100%" }}
            />
          </Grid>
        )}
        <Grid container alignItems={"center"} gap={"0.5rem"}>
          <Grid
            sx={{
              typography: "subtitle1",
              fontWeight: "500",
              color: "text.primary",
            }}
          >
            {!currentUser ? username : "You"}
          </Grid>
          <Grid container alignItems={"center"}>
            {/* <span style={{ fontSize: "2rem" }}>.</span> */}
            <Grid
              sx={{
                typography: "body2",
                color: "text.secondary",
              }}
            >
              {format(new Date(createdAt), "hh:mm aa")}
            </Grid>
          </Grid>
          {currentUser && (
            <Grid>
              <DoneAll color="primary" />
            </Grid>
          )}
        </Grid>
      </Grid>

      <Grid
        container
        size={11}
        direction={currentUser ? "row-reverse" : "row"}
        alignItems={"center"}
        gap={"0.5rem"}
        width={!currentUser ? "fit-content" : "100%"}
        justifyContent={currentUser ? "end" : "start"}
      >
        <Grid container direction={"column"} gap={"1rem"}>
          <Grid
            sx={{
              padding: "0.5rem 1rem",
              border: "1px solid #616161",
              background: "#fff",
              borderRadius: "0.5rem",
              typography: "body2",
            }}
          >
            {message}
          </Grid>

          <Grid container gap={"1rem"}>
            {Array.from({ length: 2 }).map((_, index) => (
              <Grid
                key={index}
                size={"grow"}
                sx={{
                  height: "12rem",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  objectFit: "contain",
                }}
              >
                <img
                  src="https://picsum.photos/80/80"
                  alt="image_name"
                  style={{ width: "100%", height: "100%" }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid marginBottom={"auto"}>
          <IconButton>
            <MoreVert />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Message;
