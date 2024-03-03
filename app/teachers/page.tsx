"use client";
import React, { useEffect, useState } from "react";
import styles from "./teacher.module.css";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
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
      <div className={styles.head}>
        <h1 className=" font-bold text-3xl">Find a teacher</h1>
        <CustomClassTextField onChange={handleChange} label="Teacher's name" />
      </div>
      <div className={styles.teachersCardContainer}>
        {loading ? (
          <CircularProgress />
        ) : (
          filteredTeachers.map((teacher) => (
            <div className={styles.eachTeacerCard}>
              <Avatar src={teacher.profileImg} sx={{ width: 54, height: 54 }} />
              <p className=" font-bold ">{teacher.name}</p>
              <p>{teacher.job}</p>
              <p>{teacher.role}</p>
              <Link
                href={`/teachers/${teacher.id}`}
                className=" text-blue-300 underline ml-auto hover:text-blue-600 transition"
              >
                View profile
              </Link>
              <button className="  bg-blue-500 w-full py-4 rounded-md text-white hover:bg-blue-800 transition">
                See Classes
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default page;
