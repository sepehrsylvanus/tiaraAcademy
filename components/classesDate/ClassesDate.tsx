"use client";
import React, { useState } from "react";
import styles from "./classesDate.module.css";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { format } from "date-fns-jalali";
import { Badge, styled } from "@mui/material";
import AccessibleIcon from "@mui/icons-material/Accessible";

const ClassesDate = ({ classDates }: { classDates: string[] | undefined }) => {
  const [value, setValue] = useState<Date | null>(null);

  // ALREADY SCHEDULED

  const handleDateChange = (dateValue: Date | null) => {
    setValue(dateValue);
  };

  const disableSpecificDate = (date: Date) => {
    const jalaliDate = format(date, "yyyy/MM/dd");
    if (classDates) {
      return classDates.some((classDate) => classDate === jalaliDate);
    } else {
      return false;
    }
  };

  return (
    <div className={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
        <DatePicker
          label="انتخاب تاریخ"
          value={value}
          onChange={handleDateChange}
          shouldDisableDate={disableSpecificDate}
        />
        <DateCalendar shouldDisableDate={disableSpecificDate} />
      </LocalizationProvider>
    </div>
  );
};

export default ClassesDate;
