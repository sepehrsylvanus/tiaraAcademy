import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({
  name,
  handleClick,
  href,
}: {
  name: string;
  handleClick?: () => void;
  href?: string;
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#81403e",
        "&:hover": { backgroundColor: "#915e5c" },
      }}
      onClick={handleClick}
      href={href}
    >
      {name}
    </Button>
  );
};

export default CustomButton;
