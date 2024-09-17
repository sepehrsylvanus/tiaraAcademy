"use client";
import {
  CircularProgress,
  duration,
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
import DatePicker, { getAllDatesInRange } from "react-multi-date-picker";

import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import QuizIcon from "@mui/icons-material/Quiz";
import ClassIcon from "@mui/icons-material/Class";
import GroupIcon from "@mui/icons-material/Group";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Separator } from "../ui/separator";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarDaysIcon } from "lucide-react";
import { TagsInput } from "react-tag-input-component";
import { postClassImg } from "@/actions/actions";
import { useLocale, useTranslations } from "next-intl";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import moment from "jalali-moment";

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
const faDays = [
  {
    title: "شنبه",
    value: "saturday",
  },
  {
    title: "یکشنبه",
    value: "sunday",
  },
  {
    title: "دوشنبه",
    value: "monday",
  },
  {
    title: "سه‌شنبه",
    value: "tuesday",
  },
  {
    title: "چهارشنبه",
    value: "wednesday",
  },
  {
    title: "پنج‌شنبه",
    value: "thursday",
  },
  {
    title: "جمعه",
    value: "friday",
  },
];

const CreateClass = () => {
  const [sending, setSending] = useState(false);
  const [chosenType, setChosenType] = useState("placement");
  const [date, setDate] = useState<Date>();
  const [price, setPrice] = useState<{ price: string; index: number }>({
    price: "",
    index: 0,
  });
  const t = useTranslations("CreateClass");
  const locale = useLocale();
  const [capacity, setCapacity] = useState<{
    capacity: number;
    index: number;
  }>({ capacity: 0, index: 0 });
  const [prerequisites, setPrerequisites] = useState<string[]>([]);
  const [outline, setOutline] = useState<string[]>([]);
  const [classPic, setClassPic] = useState<File>();
  const givePrice = (index: number) => {
    if (index === price?.index) {
      return price?.price;
    }
  };
  const giveCapacity = (index: number) => {
    if (index === capacity?.index) {
      return capacity?.capacity;
    }
  };

  const formSchema = z.object({
    title: z.string().min(2),
    persianTitle: z.string().min(2),
    type: z.string(),
    days: z.array(z.string()),
    date: z.date().optional(),
    times: z.array(z.string()),
    duration: z.array(z.date()).optional(),
    price: z.string(),
    capacity: z.number(),
    link: z.string(),
    prerequisites: z.array(z.string()).optional(),
    outline: z.array(z.string()).optional(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      persianTitle: "",
      days: [],
      type: "",
      times: [],
      price: "",
      date: undefined,
      link: "",
    },
  });
  const {
    formState: { errors },
  } = form;
  const duration = form.watch("duration");
  const chosenDate = form.watch("date");

  console.log(errors);
  const classType = form.watch("type");
  useEffect(() => {
    form.setValue("duration", undefined);
    setDate(undefined);
    console.log(chosenDate, duration);
  }, [classType]);

  async function createClass(values: z.infer<typeof formSchema>) {
    setSending(true);
    const formData = new FormData();
    formData.set("classPic", classPic!);
    console.log(values);
    if (!values.duration && !values.date && values.type !== "placement") {
      toast.error("please choose your date or dates");
      setSending(false);
      return;
    }
    if (!classPic && values.type !== "placement") {
      toast.error("Please choose image for non placement classes");
      setSending(false);
      return;
    }
    if (values.outline?.length === 0 && values.type !== "placement") {
      toast.error("Please enter outline for non placement classes");
      setSending(false);
      return;
    }

    console.log(values);
    try {
      const res = await Axios.post("/classes", values);

      console.log(res);
      if (classPic) {
        console.log("here");
        await postClassImg(formData, res.data.classId);
      }
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
      form.reset();
      setPrice({ price: "", index: 0 });
      setCapacity({ capacity: 0, index: 0 });
      givePrice(0);
      giveCapacity(0);
      form.setValue("date", undefined);
      form.setValue("duration", undefined);
      setDate(undefined);
      setOutline([]);
      if (prerequisites) {
        setPrerequisites([]);
      }
      setClassPic(undefined);
      setSending(false);
    } catch (error: any) {
      setSending(false);
      console.log(error);
      toast.error(error.response.data.error, {
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
    }
  }
  useEffect(() => {
    console.log(chosenType);
    form.setValue("type", chosenType);
    if (price) {
      form.setValue("price", price?.price);
    }
    if (capacity) {
      form.setValue("capacity", capacity.capacity);
    }
    if (date) {
      form.setValue("date", date);
    }
    if (outline.length > 0) {
      form.setValue("outline", outline);
    }
    if (prerequisites.length > 0) {
      form.setValue("prerequisites", prerequisites);
    }
  }, [chosenType, price, capacity, date, outline, prerequisites]);
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
              placeholder={t("title")}
            />
          )}
        />
        <FormField
          name="persianTitle"
          control={form.control}
          render={({ field }) => (
            <input
              {...field}
              className="border p-4 rounded-md formInput w-full mb-6"
              type="text"
              name="title"
              placeholder={t("persianTitle")}
            />
          )}
        />
        <FormField
          name="link"
          control={form.control}
          render={({ field }) => (
            <input
              {...field}
              className="border p-4 rounded-md formInput w-full mb-6"
              type="text"
              name="title"
              placeholder={t("link")}
            />
          )}
        />
        <div className="mb-4">
          <TagsInput
            value={prerequisites}
            onChange={setPrerequisites}
            name="prerequisites"
            placeHolder={t("enterPreReq")}
          />
        </div>
        <TagsInput
          value={outline}
          onChange={setOutline}
          name="outline"
          placeHolder={t("enterOutline")}
        />
        <input
          className="formInput w-full my-4"
          type="file"
          name={"classPic"}
          accept={".jpg, .jpeg, .png"}
          onChange={(e) => setClassPic(e.target.files?.[0])}
        />
        <div className="grid grid-cols-2 gap-6 w-full">
          {classesType.map((type, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-between transition-all duration-500 transi p-4 cursor-pointer ${
                chosenType === type.type ? "shadow-inner-custom" : "shadow-xl"
              }`}
              style={{ boxSizing: "border-box" }}
              onClick={() => {
                setChosenType(type.type);
              }}
            >
              <div className="bg-extraBg p-3 rounded-xl">
                {renderIcon(index)}
              </div>
              <p className="text-lg font-semibold">{type.title}</p>

              <div className="w-full mt-4">
                <input
                  className="formInput mb-2 w-full"
                  placeholder={t("enterPrice")}
                  style={{ boxSizing: "border-box" }}
                  onChange={(e) => setPrice({ price: e.target.value, index })}
                  value={index === price.index ? price.price : ""}
                />
                <div className="flex gap-4 items-center">
                  <p className="flex-1">{t("capacity")}</p>
                  <input
                    type="text"
                    min={0}
                    className="formInput w-full flex-1"
                    onChange={(e) =>
                      setCapacity({ capacity: Number(e.target.value), index })
                    }
                    value={index === capacity.index ? capacity.capacity : ""}
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
                    {t("days")}
                  </InputLabel>
                  <Select
                    value={field.value}
                    onChange={field.onChange}
                    multiple
                    label="Select your days"
                    name="days"
                    sx={{ backgroundColor: "#c6d9e6", width: "100%" }}
                  >
                    {locale === "en" &&
                      days.map((day) => (
                        <MenuItem key={day.value} value={day.value}>
                          {day.title}
                        </MenuItem>
                      ))}
                    {locale === "fa" &&
                      faDays.map((day) => (
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
                chosenType === "group" || chosenType === "workshop"
                  ? ""
                  : "opacity-50"
              }`}
            >
              <Controller
                name="duration"
                control={form.control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger
                      asChild
                      className={`bg-[#c6d9e6] text-lightText px-2 py-2 rounded-md outline-none hover:bg-[#c6d9e6] flex items-center ${
                        (classType === "placement" || classType === "1v1") &&
                        "pointer-events-none"
                      }`}
                    >
                      <Button
                        variant="outline"
                        className="w-full text-left font-normal formInput"
                      >
                        {duration && duration.length === 2 ? (
                          <p>
                            {moment(duration[0]?.toLocaleDateString())
                              .locale("fa")
                              .format("YYYY/MM/DD")}{" "}
                            -{" "}
                            {moment(duration[1]?.toLocaleDateString())
                              .locale("fa")
                              .format("YYYY/MM/DD")}
                          </p>
                        ) : (
                          <div className="flex gap-4">
                            <CalendarDaysIcon className="mr-2 h-4 w-4" />
                            {duration ? (
                              <p>{`${moment(duration[0]?.toLocaleDateString())
                                .locale("fa")
                                .format("YYYY/MM/DD")} - ${moment(
                                duration[1]?.toLocaleDateString()
                              )
                                .locale("fa")
                                .format("YYYY/MM/DD")}`}</p>
                            ) : chosenType == "workshop" ||
                              chosenType === "group" ? (
                              <p> {t("pickDate")}</p>
                            ) : (
                              <p>{t("deactive")}</p>
                            )}
                          </div>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      {locale === "en" ? (
                        <Calendar
                          range
                          disabled={chosenType !== "group"}
                          weekStartDayIndex={6}
                          minDate={new Date()}
                          onChange={(e) => {
                            const firstDate = e[0]?.toDate();
                            const secondDate = e[1]?.toDate();

                            field.onChange([firstDate, secondDate]);
                          }}
                        />
                      ) : (
                        <Calendar
                          range
                          onChange={(e) => {
                            console.log(getAllDatesInRange(e));
                            const firstDate = e[0]?.toDate();
                            const secondDate = e[1]?.toDate();

                            field.onChange([firstDate, secondDate]);
                          }}
                          locale={persian_fa}
                          calendar={persian}
                        />
                      )}
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
            <div
              className={
                chosenType === "group" ||
                chosenType === "placement" ||
                chosenType === "workshop"
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            >
              <Popover>
                <PopoverTrigger
                  asChild
                  className={`bg-[#c6d9e6] text-lightText px-2 py-2 rounded-md outline-none hover:bg-[#c6d9e6] flex items-center `}
                >
                  <Button
                    variant="outline"
                    className="w-full text-left font-normal formInput"
                  >
                    {date ? (
                      <p>
                        {moment(date.toLocaleDateString())
                          .locale("fa")
                          .format("YYYY/MM/DD")}
                      </p>
                    ) : (
                      <div className="flex gap-4">
                        <CalendarDaysIcon className="mr-2 h-4 w-4" />
                        {chosenType !== "1v1" ? (
                          <p>{t("deactive")}</p>
                        ) : (
                          <p> {t("pickDate")}</p>
                        )}
                      </div>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  {locale === "en" ? (
                    <Calendar
                      value={date}
                      onChange={(e) => setDate(e?.toDate())}
                    />
                  ) : (
                    <Calendar
                      locale={persian_fa}
                      calendar={persian}
                      value={date}
                      onChange={(e) => setDate(e?.toDate())}
                    />
                  )}
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
                {t("times")}
              </InputLabel>
              <Controller
                name="times"
                control={form.control}
                render={({ field }) => (
                  <Select
                    onChange={field.onChange}
                    name="time"
                    value={field.value}
                    multiple
                    sx={{ backgroundColor: "#c6d9e6", width: "100%" }}
                  >
                    {(chosenType === "1v1" || chosenType === "group") &&
                      publicTimes.map((time) => (
                        <MenuItem key={time} value={time}>
                          {time}
                        </MenuItem>
                      ))}
                    {(chosenType === "workshop" ||
                      chosenType === "placement") &&
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
              t("create")
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateClass;
