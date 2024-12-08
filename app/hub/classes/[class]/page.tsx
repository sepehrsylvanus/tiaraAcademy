"use client";
import React, { useEffect, useState } from "react";
import styles from "./singleClass.module.css";
import { CircularProgress, Divider } from "@mui/material";
import Link from "next/link";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import ClassesDate from "@/components/classesDate/ClassesDate";
import CustomSelect from "@/components/customSelect/CustomSelect";

import {
  getRegisterdClasses,
  getToken,
  reserveFreePlacement,
} from "@/actions/actions";
import { FormProvider, useForm } from "react-hook-form";
import { Class } from "@/utils/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useGetClasses } from "@/hooks/useClasses";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { createNewPayment } from "@/actions/payment";
import { useGetUser } from "@/hooks/useUsers";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClassUsers } from "@prisma/client";
import moment from "jalali-moment";
import { makeEnglishDaysUppercase } from "@/utils/helperFunctions";

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
  const [chosenTime, setChosenTime] = useState("");
  const [registeredClasses, setRegisteredClasses] = useState<ClassUsers[]>();
  const [allRegistered, setAllRegistered] = useState<ClassUsers[]>();
  const [timeError, setTimeError] = useState("");
  const t = useTranslations("SingleClass");
  const locale = useLocale();
  const { params } = details;

  const { data: classes } = useGetClasses();
  const [singleClass, setSingleClass] = useState<Class>();
  const router = useRouter();

  useEffect(() => {
    if (classes) {
      setSingleClass(classes.filter((cls) => cls.id === params.class)[0]);
    }
  }, [classes]);

  const [loading, setLoading] = useState(false);

  const { data: token } = useQuery({
    queryKey: ["getToken"],
    queryFn: async () => await getToken(),
  });
  const { data: currentUser, isLoading: currentUserLoading } = useGetUser();
  console.log(currentUser, currentUserLoading);
  useEffect(() => {
    const fetchRegisteredClasses = async () => {
      const classes = await getRegisterdClasses(params.class, currentUser?.id!);
      if (currentUser) {
        setRegisteredClasses(classes.result);
        setAllRegistered(classes.registeredClass);
      }
    };
    fetchRegisteredClasses();
  }, [currentUser]);
  console.log(registeredClasses);
  // FORM OPERATIONS
  console.log(token);
  console.log(currentUser);
  console.log(singleClass?.duration[0]);
  const registerForm = useForm<z.infer<typeof classValidation>>({
    resolver: zodResolver(classValidation),
  });
  const classTime = registerForm.watch("time");
  const selectedDate = registerForm.watch("date");
  const renderAppointementDate = () => {
    if (registeredClasses!.length > 0 && singleClass?.type === "placement") {
      if (locale === "en") {
        return `${new Date(registeredClasses![0].date).toLocaleDateString()}`;
      } else {
        return `${moment(
          new Date(registeredClasses![0].date).toLocaleDateString()
        )
          .locale("fa")
          .format("YYYY/MM/DD")}`;
      }
    }
  };
  const onSubmit = async (values: z.infer<typeof classValidation>) => {
    console.log("here");
    console.log(singleClass?.price);
    setLoading(true);
    console.log(values.time);
    console.log(values.date);
    console.log(singleClass?.price);
    if (singleClass?.price) {
      console.log(singleClass?.price);
      console.log("here");
      const placementPayment = await createNewPayment(
        Number(singleClass?.price),
        currentUser!,
        "placement",
        classTime,
        selectedDate,
        singleClass?.id,

        singleClass?.title
      );
      router.push(placementPayment!);
    } else {
      const registerFree = await reserveFreePlacement(
        singleClass?.id!,
        currentUser?.id!,
        selectedDate.toString(),
        classTime
      );
      if (registerFree) {
        router.push(registerFree);
      }
    }
  };

  const handleRegister = async () => {
    if (!chosenTime) {
      setTimeError(t("timeRequired"));
      return;
    }
    console.log(singleClass);
    const makePayment = await createNewPayment(
      Number(singleClass?.price),
      currentUser!,
      "class",
      chosenTime,
      singleClass?.date! ?? singleClass?.duration[0],
      params.class,

      singleClass?.title
    );
    if (makePayment?.startsWith("https")) {
      router.push(makePayment);
    } else {
      window.location.reload();
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
            <h2 className={`${styles.title} `}>
              {locale === "en"
                ? `${singleClass?.title
                    .split("-")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")} - ${singleClass?.teacher.fName} ${
                    singleClass?.teacher.lName
                  }`
                : `${singleClass?.persianTitle
                    .split("-")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(" ")} - ${singleClass?.teacher.fName} ${
                    singleClass?.teacher.lName
                  }`}
            </h2>
          ) : (
            <div className="flex justify-center">
              <CircularProgress
                sx={{ color: "#072d44", transform: "scale(.7)" }}
              />
            </div>
          )}
        </section>
        <Divider sx={{ marginTop: "1em" }} />
        {singleClass?.type === "placement" &&
          registeredClasses &&
          registeredClasses?.length > 0 && (
            <p className="text-center text-xl mt-4 border p-4  border-green-500">
              {t("alreadyPlacement")} {renderAppointementDate()} {t("at")}{" "}
              {registeredClasses[0].time}
              <p className="font-bold">
                <Link href={singleClass.link}>{t("clickToEnter")}</Link>
              </p>
            </p>
          )}

        {singleClass?.type === "placement" &&
          registeredClasses &&
          registeredClasses.length === 0 && (
            <section className={styles.body}>
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
                          setChosenTime={setChosenTime}
                          classId={params.class}
                          selectedDate={selectedDate?.toISOString()}
                          times={singleClass.times}
                        />
                      </div>
                    </div>
                  )}
                  {classTime &&
                    selectedDate &&
                    registeredClasses.length === 0 && (
                      <Button
                        onClick={registerForm.handleSubmit(onSubmit)}
                        className={`mt-6 w-fit ${
                          registeredClasses.length > 0 &&
                          "bg-green-500 pointer-events-none"
                        }`}
                      >
                        {t("reserve")}
                      </Button>
                    )}
                </div>
              </div>
            </section>
          )}
        {currentUser &&
          registeredClasses &&
          singleClass?.type !== "placement" && (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold">{t("schedule")}</h2>
                      <div className="text-muted-foreground">
                        <p>
                          {`${makeEnglishDaysUppercase(singleClass?.days!)}`} -{" "}
                          {`${singleClass?.times}`}
                        </p>
                        {singleClass?.type !== "group" &&
                          singleClass?.type !== "workshop" && (
                            <p>
                              {t("startFrom")}{" "}
                              {locale === "en"
                                ? `${singleClass?.date.getFullYear()} / ${
                                    singleClass?.date.getMonth()! + 1
                                  } / ${singleClass?.date.getDate()}`
                                : moment(singleClass?.date)
                                    .locale("fa")
                                    .format("YYYY/MM/DD")}
                            </p>
                          )}
                        {(singleClass?.type === "group" ||
                          singleClass?.type === "workshop") && (
                          <p>
                            {t("durationFrom")}{" "}
                            {new Date(
                              singleClass.duration[0]
                            ).toLocaleDateString()}{" "}
                            {t("to")}{" "}
                            {new Date(
                              singleClass.duration[1]
                            ).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">
                        {t("prerequisites")}
                      </h2>
                      <div className="text-muted-foreground">
                        {singleClass?.prerequisites &&
                        singleClass?.prerequisites.length > 0 ? (
                          <ul>
                            {singleClass.prerequisites.map((item) => (
                              <li>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{t("beginnerFriendly")}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{t("outline")}</h2>
                      <ul className="list-disc pl-6 text-muted-foreground">
                        {singleClass?.outline.map((item) => (
                          <li>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col">
                      <p className="h3 mb-0">{t("price")}</p>
                      <p>
                        {t("toman")}{" "}
                        {Number(singleClass?.price).toLocaleString()}{" "}
                      </p>
                      {registeredClasses.length > 0 && (
                        <>
                          <h2 className="text-xl font-semibold mt-4">
                            {t("yourTime")}
                          </h2>
                          <p> {registeredClasses[0].time}</p>
                        </>
                      )}
                      {registeredClasses.length === 0 && (
                        <Select onValueChange={setChosenTime}>
                          <SelectTrigger className="w-fit mt-6">
                            <SelectValue placeholder={t("chooseTime")} />
                          </SelectTrigger>
                          <SelectContent className="bg-lightPrime">
                            {singleClass?.times.map((time, index) => (
                              <SelectItem
                                disabled={allRegistered?.some(
                                  (item) =>
                                    item.capacity === 0 && item.time === time
                                )}
                                value={time}
                                key={index}
                              >
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {registeredClasses.length > 0 && (
                        <div>
                          <p className="h3 mb-0">{t("classLink")}</p>
                          <Link className="underline" href={singleClass?.link!}>
                            {singleClass?.link}
                          </Link>
                        </div>
                      )}
                      <p className="mt-3 text-red-500">
                        {timeError ? timeError : ""}
                      </p>
                      {!timeError && (
                        <p className="invisible">Error placehoder</p>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={handleRegister}
                    className={`mt-6 w-full ${
                      registeredClasses.length > 0 &&
                      "bg-green-500 pointer-events-none"
                    }`}
                  >
                    {registeredClasses.length > 0
                      ? t("alreadyRegister")
                      : t("join")}
                  </Button>
                </div>
                <img
                  src={singleClass?.imageLink}
                  alt="class pic"
                  className="w-full"
                />
              </div>
            </div>
          )}
        {currentUserLoading && (
          <div className="w-full h-full grid place-content-center">
            <CircularProgress sx={{ color: "#072d44" }} />
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default MyClass;
