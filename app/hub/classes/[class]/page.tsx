import React from "react";
import styles from "./singleClass.module.css";
import { Button, Divider, InputLabel, Select } from "@mui/material";
import Link from "next/link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SchoolIcon from "@mui/icons-material/School";
import ClassesDate from "@/components/classesDate/ClassesDate";
import CustomSelect from "@/components/customSelect/CustomSelect";
import { ClassProps } from "@/utils/types";
import { getSingleClass } from "@/actions/actions";
import { clerkClient } from "@clerk/nextjs";

const privateTimes = [
  "9",
  "10",
  "11",
  "12",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
];

const publicTimes = ["9", "10:45", "14", "15:45", "17:30", "19:15"];

const MyClass = async (details: ClassProps) => {
  const { params, searchParams } = details;
  const singleClass = await getSingleClass(searchParams.id);
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <div className={styles.navbar}>
          <h1 className="font-bold text-2xl md:h1">English Lessons</h1>
          <Link className="brownLink" href={"#"}>
            تغییر کلاس جاری
          </Link>
        </div>
        <h2 className={styles.title}>{`${params.class
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")} - ${searchParams.teacher
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}`}</h2>
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
            <ClassesDate classDates={singleClass?.dates} />
            <div className={styles.chooseClassTime}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1em" }}
              >
                <AccessTimeIcon />
                <span>زمانی انتخاب نشده است</span>
              </div>
              <div>
                <CustomSelect
                  times={singleClass?.isPrivate ? privateTimes : publicTimes}
                />
              </div>
            </div>
            <Link
              style={{ marginBottom: "1em" }}
              className="brownLink"
              href={"#"}
            >
              رزرو کلاس
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyClass;
