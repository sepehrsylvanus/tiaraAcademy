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
  const [opccupiedTimes, setOpccupiedTimes] = useState<string[]>();
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
        const occupiedDates = justClasses.map((item) => item.date);
        console.log(occupiedDates);
        const opccupiedTimes = justClasses.map((item) => item.time);
        setOpccupiedTimes(opccupiedTimes);
        setOccupiedDates(occupiedDates);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(occupiedDates);
  }, [occupiedDates]);
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
              <MenuItem
                disabled={
                  opccupiedTimes?.includes(item) &&
                  occupiedDates?.includes(props.selectedDate!)
                }
                key={item}
                value={item}
              >
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
