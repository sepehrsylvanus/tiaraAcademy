"use client";
import { Select, TextField, styled } from "@mui/material";

export const CustomClassTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#072d44",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: 7,

      color: "#072d44",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});
