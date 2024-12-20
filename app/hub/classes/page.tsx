"use client";
import React, { useEffect, useState } from "react";
import styles from "./classes.module.css";
import {
  Chip,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
} from "@mui/material";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import { CustomClassTextField } from "./styledComponents";

import { User } from "@/utils/types";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Meteors } from "@/components/ui/meteors";
import { toast } from "react-toastify";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import { useGetClasses } from "@/hooks/useClasses";
import { useGetTeacherNames } from "@/hooks/useUsers";
import { useLocale, useTranslations } from "next-intl";
import {
  convertDaysToPersian,
  makeEnglishDaysUppercase,
} from "@/utils/helperFunctions";
import moment from "jalali-moment";
type Props = {
  searchParams: {
    teacher: string;
  };
};
const Classes = ({ searchParams: { teacher } }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const t = useTranslations("Class");
  const locale = useLocale();
  const { data: classes, isLoading: classesLoading } = useGetClasses();
  const { data: teachersName } = useGetTeacherNames();

  const [filteredClasses, setFilteredClasses] = useState(classes);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (classes) {
      setFilteredClasses(classes);
    }
  }, [classes]);
  useEffect(() => {
    console.log(filteredClasses);
  }, [filteredClasses]);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getSingleUser();
      if (currentUser) {
        setCurrentUser(currentUser);
      }
    };
    fetchUser();
  }, []);

  // START FILTER DATA

  type FormInputs = {
    className: string;
    teacherName: string;
  };

  const { control, watch } = useForm<FormInputs>({
    defaultValues: {
      className: searchParams.get("className") || "",
      teacherName: searchParams.get("teacher") || "",
    },
  });
  const classNameInput = watch("className", "");
  const teacherNameInput = watch("teacherName", "");

  useEffect(() => {
    if (classNameInput && teacherNameInput) {
      setFilteredClasses(
        classes?.filter(
          (cls) =>
            (cls.title.startsWith(classNameInput) &&
              cls.teacher.fName.startsWith(teacherNameInput)) ||
            cls.teacher.lName?.startsWith(teacherNameInput)
        )
      );
    } else if (classNameInput) {
      setFilteredClasses(
        classes?.filter((cls) => cls.title.startsWith(classNameInput))
      );
    } else if (teacherNameInput) {
      setFilteredClasses(
        classes?.filter(
          (cls) =>
            cls.teacher.fName.startsWith(teacherNameInput) ||
            cls.teacher.lName?.startsWith(teacherNameInput)
        )
      );
    } else {
      setFilteredClasses(classes);
    }
  }, [classNameInput, teacherNameInput]);

  // END FILTER DATA
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.classesHeader}>
        <div className={styles.titleContainer}>
          <h4 className="h3">{t("tiaraAcc")}</h4>
          <h1 className="h1">{t("allClass")}</h1>
          <p>{t("description")}</p>
        </div>
        <div className={styles.searchBarContainer}>
          <div className={styles.eachSearchbar}>
            <IconButton>
              <ClassIcon />
            </IconButton>
            <Controller
              name="className"
              control={control}
              render={({ field }) => (
                <CustomClassTextField {...field} label={t("className")} />
              )}
            />
          </div>
          <div className={styles.eachSearchbar}>
            <IconButton>
              <SchoolIcon />
            </IconButton>
            <FormControl fullWidth>
              <Controller
                name="teacherName"
                control={control}
                render={({ field }) => (
                  <CustomClassTextField
                    {...field}
                    select
                    variant="outlined"
                    label={t("teacherName")}
                  >
                    <MenuItem value="">{t("withoutFilter")}</MenuItem>
                    {teachersName?.map((eachName, index) => (
                      <MenuItem key={index} value={eachName}>
                        {eachName}
                      </MenuItem>
                    ))}
                  </CustomClassTextField>
                )}
              />
            </FormControl>
          </div>
        </div>
      </div>
      <Divider sx={{ margin: "1em 0" }} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-[6em]">
        {classesLoading ? (
          <>
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
            <Skeleton className="w-full h-[250px] rounded-md" />
          </>
        ) : filteredClasses ? (
          <>
            {filteredClasses?.map((eachClass) => {
              let days = eachClass.days;
              const formattedDays = makeEnglishDaysUppercase(days);
              return (
                <Card
                  key={eachClass.id}
                  className="text-center flex flex-col justify-between"
                >
                  <CardHeader>
                    {locale === "en" ? (
                      <CardTitle>{eachClass.title}</CardTitle>
                    ) : (
                      <CardTitle>{eachClass.persianTitle}</CardTitle>
                    )}
                  </CardHeader>
                  <CardContent className=" relative overflow-hidden">
                    <Meteors />
                    <div className="flex items-center justify-around gap-4">
                      <p>{`${eachClass.teacher!.fName} ${
                        eachClass.teacher?.lName
                      }`}</p>

                      <p>{eachClass.price}</p>
                      <div className="flex flex-col gap-2">
                        <Chip label={eachClass.type} />
                      </div>
                    </div>

                    <p className=" font-semibold mt-2">
                      {locale === "en"
                        ? formattedDays
                        : convertDaysToPersian(days) ||
                          "There is no dedicated day for this class"}
                    </p>

                    {eachClass.duration.length > 0 && (
                      <p className="mt-2">
                        {locale === "en"
                          ? `${new Date(
                              eachClass.duration[0]
                            ).toLocaleDateString()} | ${new Date(
                              eachClass.duration[1]
                            ).toLocaleDateString()}`
                          : `${moment(eachClass?.duration[0])
                              .locale("fa")
                              .format("YYYY/MM/DD")} - ${moment(
                              eachClass?.duration[1]
                            )
                              .locale("fa")
                              .format("YYYY/MM/DD")}`}
                      </p>
                    )}
                    {eachClass.date && <p>{`${eachClass.date.getDay()}`}</p>}
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Link
                      href={`/hub/classes/${eachClass.id}`}
                      className="w-full"
                    >
                      <Button className="w-full">Join</Button>
                    </Link>

                    {(currentUser?.role.includes("admin") ||
                      currentUser?.role.includes("adminTeacher") ||
                      currentUser?.role.includes("teacher")) && (
                      <p
                        className=" cursor-pointer text-lg transition-all md:text-base md:hover:text-lg"
                        onClick={() => copyToClipboard(eachClass.id)}
                      >
                        {eachClass.id}
                      </p>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </>
        ) : (
          <p>There is an error in server</p>
        )}
      </div>
    </div>
  );
};

export default Classes;
