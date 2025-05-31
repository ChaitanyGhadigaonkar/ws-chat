import { Tab, Tabs } from "@mui/material";
import { CHAT_TABS } from "../../utils/constants";
import Grid from "../Grid";
import { useSearchParams } from "react-router-dom";
import { SyntheticEvent, useCallback, useMemo } from "react";

const tabOptions = Object.values(CHAT_TABS);

const ChatTabs = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentTab = useMemo(() => {
    return searchParams.get("tab") ?? CHAT_TABS.ALL;
  }, [searchParams]);

  const handleTabChange = useCallback(
    (_: SyntheticEvent, value: CHAT_TABS) => {
      setSearchParams((prev) => {
        prev.set("tab", value);
        return prev;
      });
    },
    [setSearchParams]
  );

  return (
    <Grid container justifyContent={"center"}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        variant="fullWidth"
        slotProps={{
          indicator: {
            sx: {
              display: "none",
            },
          },
          list: {
            sx: {
              gap: "0.6rem",
              background: "#f9f8fd",
              padding: "0.4rem 0.8rem",
              borderRadius: "1.4rem",
            },
          },
        }}
        sx={{
          "& .MuiButtonBase-root": {
            minHeight: "0",
            minWidth: "fit-content",
            padding: {
              xs: "0.4rem 1rem",
              md: "0.8rem 2rem",
            },
          },
        }}
      >
        {tabOptions.map((tab) => (
          <Tab
            key={tab}
            value={tab}
            label={tab}
            disableRipple
            sx={{
              textTransform: "none",
              borderRadius: "1.2rem",
              "&.Mui-selected": {
                backgroundColor: "#FFF",
                boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",
              },
            }}
          />
        ))}
      </Tabs>
    </Grid>
  );
};

export default ChatTabs;
