"use client";
import React, { useEffect, useState } from "react";
import styles from "./singleClass.module.css";
import { CircularProgress, Divider, InputLabel, Select } from "@mui/material";
import Link from "next/link";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SchoolIcon from "@mui/icons-material/School";
import ClassesDate from "@/components/classesDate/ClassesDate";
import CustomSelect from "@/components/customSelect/CustomSelect";

import {
  getClasses,
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
import { useGetClasses } from "@/hooks/useClasses";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
  console.log(params.class);
  const { data: classes } = useGetClasses();
  const [singleClass, setSingleClass] = useState<Class>();
  useEffect(() => {
    if (classes) {
      setSingleClass(classes.filter((cls) => cls.id === params.class)[0]);
    }
  }, [classes]);

  useEffect(() => {
    console.log(singleClass);
  }, [singleClass]);

  // const [registeredClasses, setRegisteredClasses] = useState<
  //   UserClasses[] | undefined
  // >();
  const [loading, setLoading] = useState(false);

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
          {singleClass?.teacher ? (
            <h2 className={styles.title}>{`${singleClass?.title
              .split("-")
              .map(
                (word: string) => word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join(" ")} - ${singleClass?.teacher.fName} ${
              singleClass?.teacher.lName
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
        {singleClass?.type === "placement" && (
          <section className={styles.body}>
            <p className={styles.desc}>
              در این صفحه می‌توانید ساعت و روز کلاس‌های خود را مشاهده نموده و
              جلسه‌ای جدید رزرو کنید
            </p>
            <div className={styles.classDetailsContainer}>
              <div className={styles.nextClassContainer}></div>
              <div className={styles.accessContainer}>
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
                      {classTime ? (
                        classTime
                      ) : (
                        <span>زمانی انتخاب نشده است</span>
                      )}
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
        )}
        {singleClass?.type !== "placement" && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-10">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">Schedule</h2>
                    <div className="text-muted-foreground">
                      <p>
                        {`${singleClass?.days}`}, {`${singleClass?.times}`}
                      </p>
                      {singleClass?.type !== "group" && (
                        <p>
                          Start from{" "}
                          {`${singleClass?.date.getFullYear()} / ${singleClass?.date.getMonth()}`}
                        </p>
                      )}
                      {singleClass?.type === "group" && (
                        <p>
                          Duration: from {singleClass.duration[0]} to{" "}
                          {singleClass.duration[1]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Prerequisites</h2>
                    <div className="text-muted-foreground">
                      {singleClass?.prerequisites &&
                      singleClass?.prerequisites.length > 0 ? (
                        <ul>
                          {singleClass.prerequisites.map((item) => (
                            <li>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>No prior experience required. Beginner-friendly.</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Course Outline</h2>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      {singleClass?.outline.map((item) => (
                        <li>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Button className="mt-6 w-full">Join</Button>
              </div>
              <img
                src={singleClass?.imageLink}
                alt="class pic"
                className="w-full"
              />
            </div>
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default MyClass;
