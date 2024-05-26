"use client";
import React, { useEffect, useState } from "react";
import styles from "./classesDate.module.css";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";

import { Controller, useFormContext } from "react-hook-form";
import { Axios } from "@/utils/axiosIn";
import { Class, UserClasses } from "@/utils/types";
import { selectClasses } from "@mui/material";
type DatePickersProps = {
  classDates: string[] | undefined;
  classId: string;
  selectedDate: string;
  singleClass: Class;
};
const ClassesDate = ({
  classDates,
  classId,
  singleClass,
}: DatePickersProps) => {
  const [times, setTimes] = useState<string[]>();
  const [justThisClass, setJustThisClass] = useState<UserClasses[]>();
  const [cls, setCls] = useState();
  useEffect(() => {
    Axios.get("/registerClass")
      .then((res) => {
        const data: UserClasses[] = res.data;

        const justThisClass = data.filter((item) => item.classId === classId);
        console.log(justThisClass);
        setJustThisClass(justThisClass);
      })
      .catch((e) => console.log(e));
  }, []);

  // ALREADY SCHEDULED

  const dayValues = classDates?.map((date) => {
    switch (date) {
      case "sunday":
        return 0;
      case "monday":
        return 1;
      case "tuesday":
        return 2;
      case "wednesday":
        return 3;
      case "thursday":
        return 4;
      case "friday":
        return 5;
      case "saturday":
        return 6;
    }
  });

  const disableDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return true;

    if (!dayValues?.includes(date.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6))
      return true;

    const isRunOut = justThisClass?.filter(
      (item) => item.capacity === 0 && item.date === date.toISOString()
    );

    if (isRunOut?.length === singleClass.time.length) return true;

    return false;
  };
  const form = useFormContext();
  const { errors } = form.formState;

  const dateError = errors.date?.message;
  return (
    <div className={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <p className="my-4">
          Choose your desired day in order to choose your time ⬇️
        </p>
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
