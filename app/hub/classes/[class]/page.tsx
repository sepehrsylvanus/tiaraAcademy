"use client";
import React, { useEffect, useState } from "react";
import styles from "./singleClass.module.css";
import {
  Button,
  CircularProgress,
  Divider,
  InputLabel,
  Select,
} from "@mui/material";
import Link from "next/link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SchoolIcon from "@mui/icons-material/School";
import ClassesDate from "@/components/classesDate/ClassesDate";
import CustomSelect from "@/components/customSelect/CustomSelect";

import { getSingleClass } from "@/actions/actions";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Class } from "@/utils/types";
import { Axios } from "@/utils/axiosIn";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { privateTimes, publicTimes } from "@/constants";

type DetailsProps = {
  params: {
    class: string;
  };
  searchParams: {};
};
const classValidation = z.object({
  date: z.date(),

  time: z.string(),
});
const MyClass = (details: DetailsProps) => {
  const { params } = details;
  const [singleClass, setSingleClass] = useState<Class>();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchClassData = async () => {
      const singleClass = await getSingleClass(params.class);
      if (singleClass) {
        setSingleClass(singleClass);
      }
    };
    fetchClassData();
  }, []);

  // FORM OPERATIONS

  const registerForm = useForm<z.infer<typeof classValidation>>({
    resolver: zodResolver(classValidation),
  });
  const classTime = registerForm.watch("time");
  const selectedDate = registerForm.watch("date");
  const onSubmit = (values: z.infer<typeof classValidation>) => {
    setLoading(true);
    console.log(values);

    Axios.post("/registerClass", { ...values, classId: params.class })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };

  return (
    <FormProvider {...registerForm}>
      <form
        className={styles.container}
        onSubmit={registerForm.handleSubmit(onSubmit)}
      >
        <section className={styles.header}>
          <div className={styles.navbar}>
            <h1 className="font-bold text-2xl md:h1">English Lessons</h1>
            <Link className="brownLink" href={"#"}>
              تغییر کلاس جاری
            </Link>
          </div>
          {singleClass?.creator ? (
            <h2 className={styles.title}>{`${singleClass?.title
              .split("-")
              .map(
                (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join(" ")} - ${singleClass?.creator.fName} ${
              singleClass?.creator.lName
            }`}</h2>
          ) : (
            <div className="flex justify-center">
              <CircularProgress
                sx={{ color: "#072d44", transform: "scale(.7)" }}
              />
            </div>
          )}
        </section>
        <Divider sx={{ marginTop: "1em" }} />
        <section className={styles.body}>
          <p className={styles.desc}>
            در این صفحه می‌توانید ساعت و روز کلاس‌های خود را مشاهده نموده و
            جلسه‌ای جدید رزرو کنید
          </p>
          <div className={styles.classDetailsContainer}>
            <div className={styles.nextClassContainer}>
              {/* EACH DETAIL */}
              <div className={styles.eachClassDetailsContiner}>
                <CalendarTodayIcon />
                <span>4 May</span>
              </div>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ height: 30 }}
              />
              {/* EACH DETAIL */}
              <div className={styles.eachClassDetailsContiner}>
                <EmojiPeopleIcon />
                <span>2</span>
              </div>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ height: 30 }}
              />
              {/* EACH DETAIL */}
              <div className={styles.eachClassDetailsContiner}>
                <AccessTimeIcon />
                <span>
                  ساعت <span>4</span>
                </span>
              </div>
            </div>
            <div className={styles.accessContainer}>
              <div className={styles.sessionLinkOrPlaceTitle}>
                <MeetingRoomIcon /> / <SchoolIcon />
              </div>
              <Link
                className={styles.accessToClass}
                style={{ textDecoration: "underline" }}
                href={"#"}
              >
                Meeting Link (click here!)
              </Link>
              {singleClass && (
                <ClassesDate
                  selectedDate={selectedDate?.toISOString()}
                  classId={params.class}
                  classDates={singleClass?.days}
                  singleClass={singleClass}
                />
              )}
              <div className={styles.chooseClassTime}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1em" }}
                >
                  <AccessTimeIcon />
                  {classTime ? classTime : <span>زمانی انتخاب نشده است</span>}
                </div>
                <div>
                  {selectedDate && singleClass && (
                    <CustomSelect
                      classId={params.class}
                      selectedDate={selectedDate?.toISOString()}
                      times={singleClass.time}
                    />
                  )}
                </div>
              </div>
              {loading ? (
                <Button disabled className="w-fit">
                  <CircularProgress
                    sx={{ color: "white", transform: "scale(.7)" }}
                  />
                </Button>
              ) : (
                <Button
                  style={{ marginBottom: "1em" }}
                  className="brownLink"
                  type="submit"
                >
                  رزرو کلاس
                </Button>
              )}
            </div>
          </div>
        </section>
      </form>
    </FormProvider>
  );
};

export default MyClass;
