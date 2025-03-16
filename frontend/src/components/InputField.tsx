import {
  FormControl,
  FormHelperText,
  TextField,
  TextFieldProps,
  Typography,
  Box,
} from "@mui/material";
import { FC } from "react";

type InputFieldProps = TextFieldProps & {
  name: string;
  id: string;
  errorText?: string;
};

const InputField: FC<InputFieldProps> = ({
  name,
  id,
  errorText,
  value,
  label,
  onChange,
  ...props
}) => {
  return (
    <FormControl
      fullWidth={props.fullWidth}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      {label && (
        <Box
          component="label"
          htmlFor={id}
          sx={{
            display: "block",
            mb: 0.5,
            ml: 0.5,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 500,
              color: errorText ? "error.main" : "text.primary",
            }}
          >
            {label}
          </Typography>
        </Box>
      )}
      <TextField
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        error={!!errorText}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 1.5,
          },
          ...props.sx,
        }}
        slotProps={{
          inputLabel: {
            shrink: false,
          },
          ...props.slotProps,
        }}
        {...props}
      />
      {errorText && (
        <FormHelperText sx={{ color: "error.main", marginX: 0.5, mt: 0.5 }}>
          {errorText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default InputField;
