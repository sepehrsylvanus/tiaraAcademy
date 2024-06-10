"use client";
import {
  CircularProgress,
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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { toast } from "react-toastify";
import styles from "@/components/reusableComponents/components.module.css";
import { Axios } from "@/utils/axiosIn";
import { privateTimes, publicTimes } from "@/constants";
import { Switch } from "@/components/ui/switch";
import { TimePicker } from "@mui/x-date-pickers";
import DatePicker, {
  DateObject,
  getAllDatesInRange,
} from "react-multi-date-picker";
const transition = require("react-element-popper/animations/transition");
const formSchema = z.object({
  title: z.string().min(2),
  days: z.array(z.string()),
  price: z.string().min(1, { message: "Free?! So write 0 :>" }),
  type: z.string(),
  capacity: z.number(),
  times: z.array(z.string()),
  duration: z.array(z.string()).optional(),
  fix: z.boolean().optional(),
});

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
  const [sending, setSending] = useState(false);
  const [dateRange, setDateRange] = useState<DateObject>();
  useEffect(() => {
    console.log(dateRange?.format());
  }, [dateRange]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      days: [],
      capacity: 0,
      type: "public",
      times: [],
    },
  });
  const {
    formState: { errors },
  } = form;
  console.log(errors);
  const classType = form.watch("type");
  const myDays = form.watch("days");
  console.log(myDays);
  const toggleFix = form.watch("fix");
  async function createClass(values: z.infer<typeof formSchema>) {
    setSending(true);
    console.log(values);
    Axios.post("/classes", values)
      .then((res) => {
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        form.reset({
          title: "",
          days: [],
          price: "",
          type: "public",
          times: [],
          capacity: 0,
        });
        setSending(false);
      })
      .catch((e) => {
        toast.error(e.response.data.error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSending(false);
      });
  }

  return (
    <form
      onSubmit={form.handleSubmit(createClass)}
      action=""
      className="grid items-center grid-cols-2 gap-4 grid-rows-3"
    >
      <Controller
        name="title"
        control={form.control}
        render={({ field }) => (
          <input
            {...field}
            className="border p-4 rounded-md formInput"
            type="text"
            name="title"
            placeholder="Title"
          />
        )}
      />
      <FormControl>
        <InputLabel
          classes={{
            focused: styles.selectLabel,
          }}
          id="days"
        >
          Days
        </InputLabel>
        <Controller
          name="days"
          control={form.control}
          render={({ field }) => (
            <Select
              value={field.value}
              onChange={field.onChange}
              multiple
              label="Select your days"
              name="days"
              sx={{ backgroundColor: "#c6d9e6" }}
            >
              {days.map((day) => (
                <MenuItem key={day.value} value={day.value}>
                  {day.title}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <Controller
        name="price"
        control={form.control}
        render={({ field }) => (
          <input
            {...field}
            className="border p-4 rounded-md formInput"
            type="text"
            name=""
            id=""
            placeholder="Price"
          />
        )}
      />

      <FormControl>
        <Controller
          name="type"
          control={form.control}
          render={({ field }) => (
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              defaultValue={field.value}
              onChange={field.onChange}
              row
            >
              <FormControlLabel
                value="public"
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value="private"
                control={<Radio />}
                label="Private"
              />
            </RadioGroup>
          )}
        />
      </FormControl>
      <Controller
        name="capacity"
        control={form.control}
        render={({ field }) => (
          <input
            {...field}
            className="border p-4 rounded-md formInput"
            type="number"
            name=""
            id=""
            placeholder="Capacity"
            onChange={(e) => {
              const inputValue = parseInt(e.target.value);
              const positiveValue = Math.max(0, inputValue); // Ensure positive value
              field.onChange(positiveValue);
            }}
          />
        )}
      />
      <FormControl>
        <InputLabel
          classes={{
            focused: styles.selectLabel,
          }}
          id="times"
        >
          Times
        </InputLabel>
        <Controller
          name="times"
          control={form.control}
          render={({ field }) => (
            <Select
              onChange={field.onChange}
              label="Select your time"
              name="time"
              value={field.value}
              multiple
              sx={{ backgroundColor: "#c6d9e6" }}
            >
              {classType === "public" &&
                publicTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
              {classType === "private" &&
                privateTimes.map((time) => (
                  <MenuItem key={time} value={time}>
                    {time}
                  </MenuItem>
                ))}
            </Select>
          )}
        />
      </FormControl>
      <div className="flex gap-2 col-span-2">
        <Controller
          name="fix"
          control={form.control}
          render={({ field }) => (
            <Switch onCheckedChange={field.onChange} checked={field.value} />
          )}
        />
        <p>Make a fix class</p>
      </div>

      <div className="  col-span-2 ">
        <Controller
          name="duration"
          control={form.control}
          render={({ field }) => (
            <DatePicker
              range
              disabled={!toggleFix}
              weekStartDayIndex={6}
              dateSeparator="|"
              minDate={new Date()}
              placeholder={
                !toggleFix ? "Deactive" : "Choose your class duration"
              }
              animations={[transition()]}
              onChange={(e) => {
                const firstDate = e[0]?.format();
                const secondDate = e[1]?.format();

                field.onChange([firstDate, secondDate]);
              }}
            />
          )}
        />
      </div>

      <Button type="submit" className="col-span-2">
        {sending ? (
          <div style={{ transform: "scale(.7)" }}>
            <CircularProgress sx={{ color: "white" }} />
          </div>
        ) : (
          "Create"
        )}
      </Button>
    </form>
  );
};

export default CreateClass;
