"use client";
import { styled } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const HiddenInput = () => {
  return <VisuallyHiddenInput type="file" accept=".pdf" />;
};

export default HiddenInput;
