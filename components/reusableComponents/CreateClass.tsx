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
import axios from "axios";
import { toast } from "react-toastify";
const formSchema = z.object({
  title: z.string().min(5),
  days: z.array(z.string()),
  price: z.string().min(1, { message: "Free?! So write 0 :>" }),
  type: z.string(),
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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      days: [],

      type: "public",
    },
  });

  async function createClass(values: z.infer<typeof formSchema>) {
    setSending(true);
    axios
      .post("/api/classes", values, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
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
        form.setValue("title", "");
        form.setValue("days", []);
        form.setValue("price", "");
        form.setValue("type", "public");
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
      className="grid items-center grid-cols-2 gap-4 grid-rows-2"
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
        <InputLabel id="days">Days</InputLabel>
        <Controller
          name="days"
          control={form.control}
          render={({ field }) => (
            <Select
              defaultValue={field.value}
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
