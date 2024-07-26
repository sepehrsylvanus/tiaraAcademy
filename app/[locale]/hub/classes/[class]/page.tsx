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

import {
  getRegisterdClasses,
  getSingleClass,
  getToken,
} from "@/actions/actions";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Class, UserClasses } from "@/utils/types";
import { Axios } from "@/utils/axiosIn";
import { toast } from "react-toastify";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { privateTimes, publicTimes } from "@/constants";
import { useGetRegisteredClasses } from "@/hooks/useGetRegisteredClasses";
import { useQuery } from "@tanstack/react-query";
import { getSingleUser } from "@/actions/userActions";
import prisma from "@/utils/db";

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
  // const [registeredClasses, setRegisteredClasses] = useState<
  //   UserClasses[] | undefined
  // >();
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
  const { data: token } = useQuery({
    queryKey: ["getToken"],
    queryFn: async () => await getToken(),
  });
  const { data: currentUser } = useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: async () => await getSingleUser(token?.value!),
  });
  const { data: registeredClasses, isLoading } = useGetRegisteredClasses(
    params.class,
    currentUser?.id!
  );
  console.log(registeredClasses);
  // FORM OPERATIONS
  console.log(token);
  console.log(currentUser);
  // useEffect(() => {
  //   const fetchRegisteredClasses = async () => {
  //     if (currentUser) {
  //       const myRegistered = await getRegisterdClasses(
  //         params.class,
  //         currentUser?.id
  //       );
  //       setRegisteredClasses(myRegistered);
  //     }
  //   };
  //   fetchRegisteredClasses();
  // }, [currentUser]);

  const registerForm = useForm<z.infer<typeof classValidation>>({
    resolver: zodResolver(classValidation),
  });
  const classTime = registerForm.watch("time");
  const selectedDate = registerForm.watch("date");
  const onSubmit = (values: z.infer<typeof classValidation>) => {
    setLoading(true);
    console.log(values.time);
    console.log(values.date);

    if (
      registeredClasses?.find(
        (item) =>
          item.userId === currentUser?.id &&
          item.date === values.date.toISOString() &&
          item.time === values.time
      )
    ) {
      toast.error("You already registered in this class");
      setLoading(false);
    } else {
      Axios.post("/registerClass", { ...values, classId: params.class })
        .then((res) => {
          toast.success(res.data.message);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err);
          setLoading(false);
        });
    }
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
            <Link className="brownLink" href={"/hub/classes"}>
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
              {/* <div className={styles.eachClassDetailsContiner}>
                <CalendarTodayIcon />
                <span>4 May</span>
              </div>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ height: 30 }}
              /> */}
              {/* EACH DETAIL */}
              {/* <div className={styles.eachClassDetailsContiner}>
                <EmojiPeopleIcon />
                <span>2</span>
              </div> */}
              {/* <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ height: 30 }}
              /> */}
              {/* EACH DETAIL */}
              {/* <div className={styles.eachClassDetailsContiner}>
                <AccessTimeIcon />
                <span>
                  ساعت <span>4</span>
                </span>
              </div> */}
            </div>
            <div className={styles.accessContainer}>
              {/* <div className={styles.sessionLinkOrPlaceTitle}>
                <MeetingRoomIcon /> / <SchoolIcon />
              </div>
              <Link
                className={styles.accessToClass}
                style={{ textDecoration: "underline" }}
                href={"#"}
              >
                Meeting Link (click here!)
              </Link> */}
              {singleClass && (
                <div className=" scale-125 md:scale-150 my-[4em]">
                  <ClassesDate
                    selectedDate={selectedDate?.toISOString()}
                    classId={params.class}
                    classDates={singleClass?.days}
                    singleClass={singleClass}
                  />
                </div>
              )}
              {selectedDate && singleClass && (
                <div className={styles.chooseClassTime}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                    }}
                  >
                    <AccessTimeIcon />
                    {classTime ? classTime : <span>زمانی انتخاب نشده است</span>}
                  </div>
                  <div>
                    <CustomSelect
                      classId={params.class}
                      selectedDate={selectedDate?.toISOString()}
                      times={singleClass.times}
                    />
                  </div>
                </div>
              )}
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
