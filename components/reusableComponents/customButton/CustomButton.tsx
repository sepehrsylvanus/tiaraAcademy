import { Button } from "@mui/material";
import React from "react";
const defautStyles = {
  backgroundColor: "#81403e",
  "&:hover": { backgroundColor: "#915e5c" },

}
const CustomButton = ({
  name,
  handleClick,
  href,
  variant='contained',
  styles=defautStyles
}: {
  name: string;
  handleClick?: () => void;
  href?: string;
  variant?:'contained' | 'outlined' | 'text'
  styles: {[key: string]: string | number | {[key: string]: string}}
}) => {
  return (
    <Button
      variant={variant}
      sx={styles}
      onClick={handleClick}
      href={href}
    >
      {name}
    </Button>
  );
};

export default CustomButton;
