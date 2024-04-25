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

import { getSingleClass } from "@/actions/actions";
import CustomHamburger from "@/components/hamburger/CustomHamburger";

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
type DetailsProps = {
  params: {
    class: string;
  };
  searchParams: {};
};
const MyClass = async (details: DetailsProps) => {
  const { params } = details;
  console.log(details);
  console.log(params);
  const singleClass = await getSingleClass(params.class);
  console.log(singleClass);
  return (
    <div className={styles.container}>
      <div className="ml-auto z-10 fixed top-0  right-0 md:hidden bg-white  rounded-md m-2">
        <CustomHamburger navbar={false} sidebar={true} />
      </div>
      <section className={styles.header}>
        <div className={styles.navbar}>
          <h1 className="font-bold text-2xl md:h1">English Lessons</h1>
          <Link className="brownLink" href={"#"}>
            تغییر کلاس جاری
          </Link>
        </div>
        <h2 className={styles.title}>{`${singleClass?.title
          .split("-")
          .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")} - ${singleClass?.creator.fName} ${
          singleClass?.creator.lName
        }`}</h2>
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
            <ClassesDate classDates={singleClass?.days} />
            <div className={styles.chooseClassTime}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1em" }}
              >
                <AccessTimeIcon />
                <span>زمانی انتخاب نشده است</span>
              </div>
              <div>
                <CustomSelect
                  times={
                    singleClass?.type === "private" ? privateTimes : publicTimes
                  }
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
