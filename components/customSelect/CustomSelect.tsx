"use client";
import React, { useEffect, useState } from "react";
import styles from "./customSelect.module.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { Class, UserClasses } from "@/utils/types";
import { Axios } from "@/utils/axiosIn";

const CustomSelect = (props: {
  times: string[];
  classId: string;
  selectedDate: string;
}) => {
  const [justClasses, setJustClasses] = useState<UserClasses[]>();
  const [occupiedDates, setOccupiedDates] = useState<string[]>();

  const form = useFormContext();
  const { errors } = form.formState;
  const timeError = errors.time?.message;
  const { times } = props;
  useEffect(() => {
    Axios.get("/registerClass")
      .then((res) => {
        const registerClasses: UserClasses[] = res.data;
        console.log(registerClasses);
        console.log(props.classId);
        const justClasses = registerClasses.filter(
          (registerClass) => registerClass.class.id === props.classId
        );
        console.log(justClasses);
        setJustClasses(justClasses);
        const selectedDateClass = justClasses?.filter(
          (item) => item.date === props.selectedDate
        );
        console.log(selectedDateClass);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    console.log(justClasses);
  }, [justClasses]);

  const makeDisable = (time: string) => {
    const isRunOut = justClasses?.filter(
      (item) => item.capacity === 0 && item.time === time
    )!;
    if (isRunOut?.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  console.log(props.selectedDate);
  console.log(occupiedDates?.includes(props.selectedDate!));
  return (
    <FormControl sx={{ width: 200, marginTop: "1em" }}>
      <InputLabel id="customSelectLabel">زمان کلاس را انتخاب کنید</InputLabel>
      <Controller
        name="time"
        control={form.control}
        render={({ field }) => (
          <Select
            labelId="customSelectLabel"
            value={field.value}
            label="زمان کلاس را انتخاب کنید"
            onChange={field.onChange}
          >
            {times.map((item) => (
              <MenuItem disabled={makeDisable(item)} key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      {errors.time && (
        <p className="font-bold text-red-500">{timeError?.toString()}</p>
      )}
    </FormControl>
  );
};

export default CustomSelect;
