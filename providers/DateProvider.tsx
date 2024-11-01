"use client";
import React from "react";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

import { LocalizationProvider } from "@mui/x-date-pickers";
const DateProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
      {children}
    </LocalizationProvider>
  );
};

export default DateProvider;
