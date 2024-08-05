"use client";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
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
import { classesType, privateTimes, publicTimes } from "@/constants";
import { Switch } from "@/components/ui/switch";
import { TimePicker } from "@mui/x-date-pickers";
import DatePicker, {
  DateObject,
  getAllDatesInRange,
} from "react-multi-date-picker";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import QuizIcon from "@mui/icons-material/Quiz";
import ClassIcon from "@mui/icons-material/Class";
import GroupIcon from "@mui/icons-material/Group";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
const transition = require("react-element-popper/animations/transition");

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
  const [chosenType, setChosenType] = useState("placement");
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    console.log(chosenType);
  }, [chosenType]);

  useEffect(() => {
    console.log(dateRange?.format());
  }, [dateRange]);
  const formSchema = z.object({
    title: z.string().min(2),
    type: z.string(),
    days: z.array(z.string()),
    date: z.date().optional(),
    times: z.array(z.string()),
    duration: z.array(z.string()).optional(),
    price: z.string(),
    capacity: z.number(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      days: [],
      type: "",
      times: [],
      price: "",
    },
  });
  const {
    formState: { errors },
  } = form;
  console.log(errors);
  const classType = form.watch("type");
  useEffect(() => {
    console.log(chosenType);
    form.setValue("type", chosenType);
  }, [chosenType]);

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

        form.reset({});
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

  const renderIcon = (index: number) => {
    switch (index) {
      case 0:
        return <QuizIcon />;
        break;
      case 1:
        return <ClassIcon />;
        break;
      case 2:
        return <GroupIcon />;
        break;
      case 3:
        return <VpnKeyIcon />;
        break;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createClass)} action="">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <input
              {...field}
              className="border p-4 rounded-md formInput w-full mb-6"
              type="text"
              name="title"
              placeholder="Title"
            />
          )}
        />
        <div className="grid grid-cols-2 gap-6 w-full">
          {classesType.map((type, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-between transition-all duration-500 transi p-4 cursor-pointer ${
                chosenType === type.type ? "shadow-inner-custom" : "shadow-xl"
              }`}
              style={{ boxSizing: "border-box" }}
              onClick={() => setChosenType(type.type)}
            >
              <div className="bg-extraBg p-3 rounded-xl">
                {renderIcon(index)}
              </div>
              <p className="text-lg font-semibold">{type.title}</p>

              <div className="w-full mt-4">
                <Controller
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="formInput mb-2 w-full"
                      placeholder="Enter price"
                      style={{ boxSizing: "border-box" }}
                    />
                  )}
                />
                <div className="flex gap-4 items-center">
                  <p className="flex-1">Capacity</p>
                  <Controller
                    name="capacity"
                    control={form.control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        min={0}
                        className="formInput w-full flex-1"
                        onChange={(e) => {
                          const numericValue = parseInt(e.target.value, 10);
                          field.onChange(numericValue);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <Separator className="my-4" />

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <Controller
              name="days"
              control={form.control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel
                    classes={{
                      focused: styles.selectLabel,
                    }}
                    id="days"
                  >
                    Days
                  </InputLabel>
                  <Select
                    value={field.value}
                    onChange={field.onChange}
                    multiple
                    label="Select your days"
                    name="days"
                    sx={{ backgroundColor: "#c6d9e6", width: "100%" }}
                  >
                    {days.map((day) => (
                      <MenuItem key={day.value} value={day.value}>
                        {day.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            <div
              className={`  col-span-2 ${
                chosenType === "workshop" ? "" : "opacity-50"
              }`}
            >
              <Controller
                name="duration"
                control={form.control}
                render={({ field }) => (
                  <DatePicker
                    range
                    disabled={chosenType !== "workshop"}
                    weekStartDayIndex={6}
                    dateSeparator="|"
                    minDate={new Date()}
                    placeholder={
                      chosenType !== "workshop"
                        ? "Deactive"
                        : "Choose your class duration"
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
            <div
              className={
                chosenType === "workshop"
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            >
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger
                  asChild
                  className="bg-[#c6d9e6] text-lightText px-2 py-2 rounded-md outline-none hover:bg-[#c6d9e6]"
                >
                  <Button
                    variant="outline"
                    className="w-full text-left font-normal formInput"
                  >
                    {date ? (
                      <p>{`${date.getFullYear()} / ${date.getMonth()} / ${date.getDay()}`}</p>
                    ) : (
                      <div className="flex gap-4">
                        <CalendarDaysIcon className="mr-2 h-4 w-4" />
                        {chosenType !== "workshop" ? (
                          <p> Pick a date</p>
                        ) : (
                          <p>Disabled</p>
                        )}
                      </div>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div>
            <FormControl sx={{ width: "100%" }}>
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
                    sx={{ backgroundColor: "#c6d9e6", width: "100%" }}
                    disabled={chosenType === "placement"}
                  >
                    {(chosenType === "workshop" || chosenType === "group") &&
                      publicTimes.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    {chosenType === "1v1" &&
                      privateTimes.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
        </div>

        <div className="flex justify-center mt-4 w-full">
          <Button
            onClick={() => form.handleSubmit(createClass)}
            className="w-full"
          >
            {sending ? (
              <div style={{ transform: "scale(.7)" }}>
                <CircularProgress sx={{ color: "white" }} />
              </div>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateClass;
