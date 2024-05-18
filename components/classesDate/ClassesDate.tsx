"use client";
import React, { useState } from "react";
import styles from "./classesDate.module.css";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";

import { Controller, useFormContext } from "react-hook-form";
type DatePickersProps = {
  classDates: string[] | undefined;
};
const ClassesDate = ({}: DatePickersProps) => {
  const [value, setValue] = useState<Date | null>(null);

  // ALREADY SCHEDULED

  const disableDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return true;

    if (date.getDay() === 3) return true;

    return false;
  };
  const form = useFormContext();
  const { errors } = form.formState;
  console.log(errors);
  const dateError = errors.date?.message;
  return (
    <div className={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar shouldDisableDate={disableDates} />
        <Controller
          name="date"
          control={form.control}
          render={({ field }) => (
            <DatePicker
              value={field.value}
              onChange={field.onChange}
              shouldDisableDate={disableDates}
            />
          )}
        />
        {errors.date && (
          <p className="font-bold text-red-500">{dateError?.toString()}</p>
        )}
      </LocalizationProvider>
    </div>
  );
};

export default ClassesDate;
