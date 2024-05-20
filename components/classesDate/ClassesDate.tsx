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
import { UserClasses } from "@/utils/types";
import { selectClasses } from "@mui/material";
type DatePickersProps = {
  classDates: string[] | undefined;
  classId: string;
  selectedDate: string;
  publicTimes: string[];
  privateTimes: string[];
};
const ClassesDate = ({
  classDates,
  classId,

  publicTimes,
  privateTimes,
}: DatePickersProps) => {
  const [times, setTimes] = useState<string[]>();
  const [justThisClass, setJustThisClass] = useState<UserClasses[]>();
  useEffect(() => {
    Axios.get("/registerClass")
      .then((res) => {
        const data: UserClasses[] = res.data;
        console.log(res.data);

        const justThisClass = data.filter(
          (thisCls) => thisCls.classId === classId
        );
        console.log(justThisClass);
        setTimes(justThisClass.map((item) => item.time));
        setJustThisClass(justThisClass);
      })
      .catch((e) => console.log(e));
  }, []);

  // ALREADY SCHEDULED
  console.log(classDates);
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

  console.log(dayValues);
  const disableDates = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return true;

    // if (!dayValues?.includes(date.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6))
    //   return true;

    // const timesForDate = justThisClass?.filter(
    //   (item) => item.date === date.toISOString()
    // );

    // HERE
    // if (
    //   timesForDate?.every((item) => publicTimes.includes(item)) ||
    //   timesForDate?.every((item) => privateTimes.includes(item))
    // )
    //   return true;

const times = justThisClass?.map



    console.log(date.toISOString());
    

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
