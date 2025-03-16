import {
  Alert,
  Slide,
  SlideProps,
  Snackbar,
  SnackbarCloseReason,
} from "@mui/material";
import {
  createContext,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useContext,
  useState,
  ComponentType,
  ReactElement,
} from "react";
import { SERVER_RESPONSE_STATUS } from "../types/base";
import { TransitionProps } from "@mui/material/transitions";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

const SnackbarContext = createContext({
  openSnackbar: (_type: SERVER_RESPONSE_STATUS, _message: string) => {},
});

const SnackbarContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{
    open: boolean;
    Transition: ComponentType<
      TransitionProps & {
        children: ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    Transition: Slide,
  });
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SERVER_RESPONSE_STATUS>("success");

  const openSnackbar = useCallback(
    (type: SERVER_RESPONSE_STATUS, message: string) => {
      setMessage(message);
      setType(type);
      setState({ Transition: SlideTransition, open: true });
    },
    []
  );

  const handleClose = (
    _event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setState((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={state.open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

const useSnackbarContext = () => {
  return useContext(SnackbarContext);
};

export { SnackbarContextProvider, useSnackbarContext };
