"use client";
import React, { useEffect, useState } from "react";
import styles from "./teacher.module.css";
import { Avatar, CircularProgress } from "@mui/material";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";
import TelegramIcon from "@mui/icons-material/Telegram";
import Image from "next/image";
import BrownLink from "@/components/reusableComponents/brownLink/BrownLink";
import { retrieveTeachers } from "@/actions/actions";
import { Controller } from "react-hook-form";
import { CustomClassTextField } from "../classes/styledComponents";
import StarIcon from "@mui/icons-material/Star";
import { Instructure } from "@/utils/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  AccessTime,
  EditNote,
  GridView,
  NoteAlt,
  OndemandVideo,
  People,
} from "@mui/icons-material";
import CustomHamburger from "@/components/hamburger/CustomHamburger";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  const [teachers, setTeachers] = useState<Instructure[]>([]);
  const [filteredTeachers, setFilteredTeachers] = useState(teachers);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTeachers = async () => {
      const teachers = await retrieveTeachers();
      setTeachers(teachers);
      setFilteredTeachers(teachers);
      setLoading(false);
    };
    fetchTeachers();
  }, []);

  // START OF FILTER
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameToFilter = e.target.value;

    const result = teachers.filter((teacher) => {
      const teacherName = teacher.name.split(" ").join("").toLowerCase();

      return teacherName.startsWith(nameToFilter);
    });
    console.log(result);
    setFilteredTeachers(result);
  };

  // END OF FILTER

  return (
    <div className={styles.container}>
      <div className="ml-auto fixed top-0 right-0 md:hidden">
        <Popover>
          <PopoverTrigger>
            <div className="block lg:hidden">
              <CustomHamburger />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-fit
          "
          >
            <div className="flex flex-col w-fit justify-around px-6 gap-2">
              <Link href={"/home"} className="navLinkContainer">
                <span>Profile</span>
                <GridView />
              </Link>
              <Link href={"/classes"} className="navLinkContainer">
                <span>Classes</span>
                <AccessTime />
              </Link>
              <Link href={"/writing"} className="navLinkContainer">
                <span>Writing</span>
                <EditNote />
              </Link>
              <Link href={"/teachers"} className="navLinkContainer">
                <span>Teachers</span>
                <People />
              </Link>
              <Link href={"/blogs"} className="navLinkContainer">
                <span>Blogs</span>
                <NoteAlt />
              </Link>
              <Link href={"#"} className="navLinkContainer">
                <span>Videos</span>
                <OndemandVideo />
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:px-4 md:pl-[3em]">
        <h1 className=" font-bold text-3xl">Find a teacher</h1>
        <CustomClassTextField onChange={handleChange} label="Teacher's name" />
      </div>

      <div className={styles.teachersCardContainer}>
        {loading ? (
          <>
            <div className="flex items-center gap-[1.5em] md:hidden">
              <Skeleton className="w-[30px] h-[30px] rounded-full" />
              <Skeleton className="w-full h-[390px]" />
              <Skeleton className="w-[30px]  h-[30px] rounded-full" />
            </div>
            <div className=" w-screen flex gap-4 ">
              <Skeleton
                className={`w-[260px] h-[390px] ${styles.eachTeacerCard}`}
              />
              <Skeleton
                className={`w-[260px] h-[390px] ${styles.eachTeacerCard}`}
              />
              <Skeleton
                className={`w-[260px] h-[390px] ${styles.eachTeacerCard}`}
              />
            </div>
          </>
        ) : (
          <>
            <Carousel className="md:hidden">
              <CarouselContent>
                {filteredTeachers.map((teacher) => (
                  <CarouselItem>
                    <Card className="flex flex-col gap-6 text-center justify-center rounded-md p-4 w-full">
                      <CardContent className="flex flex-col items-center gap-4">
                        <Avatar
                          src={teacher.profileImg}
                          sx={{ width: 54, height: 54 }}
                        />
                        <p className=" font-bold ">{teacher.name}</p>
                        <p>{teacher.job}</p>
                        <p>{teacher.role}</p>
                        <Link
                          href={`/teachers/${teacher.id}`}
                          className=" text-blue-300 underline  hover:text-blue-600 transition"
                        >
                          View profile
                        </Link>
                      </CardContent>
                      <CardFooter className="p-0">
                        <button className="  bg-blue-500 w-full py-4 rounded-md text-white hover:bg-blue-800 transition">
                          See Classes
                        </button>
                      </CardFooter>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>

            {filteredTeachers.map((teacher) => (
              <Card className={styles.eachTeacerCard}>
                <CardContent className="flex flex-col items-center gap-4">
                  <Avatar
                    src={teacher.profileImg}
                    sx={{ width: 54, height: 54 }}
                  />
                  <p className=" font-bold ">{teacher.name}</p>
                  <p>{teacher.job}</p>
                  <p>{teacher.role}</p>
                  <Link
                    href={`/teachers/${teacher.id}`}
                    className=" text-blue-300 underline  hover:text-blue-600 transition"
                  >
                    View profile
                  </Link>
                </CardContent>
                <CardFooter className="p-0">
                  <button className="  bg-blue-500 w-full py-4 rounded-md text-white hover:bg-blue-800 transition">
                    See Classes
                  </button>
                </CardFooter>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default page;
