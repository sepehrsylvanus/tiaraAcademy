"use client";
import React from "react";
import styles from "./customSelect.module.css";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const CustomSelect = (props: { times: string[] }) => {
  const form = useFormContext();
  const { errors } = form.formState;
  const timeError = errors.time?.message;
  const { times } = props;
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
              <MenuItem key={item} value={item}>
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
