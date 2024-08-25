"use client";
import React, { useEffect, useState } from "react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

import { CustomClassTextField } from "../classes/styledComponents";

import { Skeleton } from "@/components/ui/skeleton";

import { User } from "@/utils/types";
import { toast } from "react-toastify";
import { Axios } from "@/utils/axiosIn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const page = () => {
  const [teachers, setTeachers] = useState<User[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState<User[]>(teachers);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const t = useTranslations("Teachers");
  const router = useRouter();
  useEffect(() => {
    Axios.get("/users")
      .then((res) => {
        const teachers = res.data.filter(
          (teacher: User) =>
            teacher.role === "teacher" || teacher.role === "adminTeacher"
        );
        setTeachers(teachers);
        setFilteredTeachers(teachers);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  // START OF FILTER
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameToFilter = e.target.value;

    const result = teachers.filter((teacher) => {
      const teachersName = `${teacher.fName} ${teacher.lName}`;
      const teacherName = teachersName.split(" ").join("").toLowerCase();

      return teacherName.startsWith(nameToFilter);
    });

    setFilteredTeachers(result);
  };

  // END OF FILTER
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const renderRole = (role: string) => {
    if (locale === "en") {
      switch (role) {
        case "adminTeacher":
          return "Admin | Teacher";
          break;
        case "teacher":
          return "Teacher";
          break;
      }
    } else {
      switch (role) {
        case "adminTeacher":
          return "ادمین | معلم";
          break;
        case "teacher":
          return "معلم";
          break;
      }
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="flex flex-col  items-center gap-4 sm:flex-row sm:justify-between sm:px-4 md:pl-[3em]">
        <h1 className=" font-bold text-3xl">{t("findATeacher")}</h1>
        <CustomClassTextField
          onChange={handleChange}
          label={t("teachersName")}
        />
      </div>

      <div
        className={`flex flex-col items-center mt-4 gap-4 ${
          !loading && "md:grid md:grid-cols-3"
        } overflow-y-scroll`}
      >
        {loading ? (
          <>
            <div className="flex flex-col items-center w-full mt-4 gap-4 md:grid md:grid-cols-3 overflow-y-scroll ">
              <Skeleton className={`w-[254px] h-[272px] `} />
              <Skeleton className={`w-[254px] h-[272px] `} />
              <Skeleton className={`w-[254px] h-[272px] `} />
            </div>
          </>
        ) : (
          <>
            {filteredTeachers.map((teacher) => (
              <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                <Card className={` p-4 bg-extraBg text-lightPrime`}>
                  <CardContent className="flex flex-col items-center gap-4">
                    <Avatar>
                      <AvatarImage src={teacher.image!} alt={teacher.fName} />
                      <AvatarFallback>{`${teacher.fName[0]}${teacher.lName?.[0]}`}</AvatarFallback>
                    </Avatar>
                    <p className=" font-bold ">{`${teacher.fName} ${teacher.lName}`}</p>

                    <p>{renderRole(teacher.role)}</p>
                    <Link
                      href={`/hub/teachers/${teacher.id}`}
                      className=" text-extraItem underline  hover:text-white transition"
                    >
                      {t("viewProfile")}
                    </Link>
                  </CardContent>
                  <CardFooter className="p-0 flex flex-col gap-2">
                    <button
                      onClick={() =>
                        router.push(
                          `/hub/classes?teacher=${teacher.fName} ${teacher.lName}`
                        )
                      }
                      className="  bg-extraText w-full py-4 rounded-md text-white hover:bg-lightPrime hover:text-extraBg transition"
                    >
                      {t("seeClasses")}
                    </button>

                    <p
                      className=" text-lg  md:text-base md:hover:scale-125 transition cursor-pointer"
                      onClick={() => copyToClipboard(teacher.id)}
                    >
                      {teacher.id}
                    </p>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default page;
