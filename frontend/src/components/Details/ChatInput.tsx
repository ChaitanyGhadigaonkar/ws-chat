import { IconButton, InputAdornment, TextField } from "@mui/material";
import Grid from "../Grid";
import { Add, EmojiEmotionsOutlined, Send } from "@mui/icons-material";
import { FormEvent, useCallback } from "react";

const ChatInput = () => {
  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(e.target.message.value);
  }, []);
  return (
    <Grid container>
      <Grid
        container
        size="grow"
        component={"form"}
        direction={"row"}
        alignItems={"center"}
        gap={"1rem"}
        onSubmit={handleSubmit}
      >
        <Grid container size="grow">
          <TextField
            fullWidth
            name="message"
            placeholder="Enter a message..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton>
                      <EmojiEmotionsOutlined fontSize="medium" />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "2rem",
              },
            }}
          />
        </Grid>

        <Grid>
          <IconButton
            size="large"
            color="primary"
            sx={{
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Add fontSize="inherit" />
          </IconButton>
        </Grid>
        <Grid>
          <IconButton
            type="submit"
            size="large"
            sx={{
              border: "1px solid",
              backgroundColor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            <Send fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatInput;
