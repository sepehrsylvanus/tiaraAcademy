"use client";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const days = [
  {
    title: "Saturday",
    value: "saturday",
  },
  {
    title: "Sunday",
    value: "sunday",
  },
  {
    title: "Monday",
    value: "monday",
  },
  {
    title: "Tuesday",
    value: "tuesday",
  },
  {
    title: "Wednesday",
    value: "wednesday",
  },
  {
    title: "Thursday",
    value: "thursday",
  },
  {
    title: "Friday",
    value: "friday",
  },
];

const CreateClass = () => {
  const [dayValue, setDayValue] = useState<String | String[]>([]);
  const [classType, setClassType] = useState("public");
  useEffect(() => {
    console.log(dayValue);
  }, [dayValue]);

  return (
    <form action="" className="grid items-center grid-cols-2 gap-4 grid-rows-2">
      <input
        className="border p-4 rounded-md"
        type="text"
        name="title"
        placeholder="Title"
      />
      <FormControl>
        <InputLabel id="days">Days</InputLabel>
        <Select
          value={dayValue}
          onChange={(e) => setDayValue(e.target.value)}
          multiple
          label="Select your days"
          name="days"
        >
          {days.map((day) => (
            <MenuItem key={day.value} value={day.value}>
              {day.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <input
        className="border p-4 rounded-md"
        type="text"
        name=""
        id=""
        placeholder="Price"
      />

      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={classType}
          onChange={(e) => setClassType(e.target.value)}
          row
        >
          <FormControlLabel value="public" control={<Radio />} label="Public" />
          <FormControlLabel
            value="private"
            control={<Radio />}
            label="Private"
          />
        </RadioGroup>
      </FormControl>
      <Button className="col-span-2">Submit</Button>
    </form>
  );
};

export default CreateClass;
