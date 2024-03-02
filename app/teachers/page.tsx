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
  useEffect(() => {
    const fetchTeachers = async () => {
      const teachers = await retrieveTeachers();
      setTeachers(teachers);
    };
    fetchTeachers();
  }, []);

  // START OF FILTER
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameToFilter = e.target.value;
    console.log({ nameToFilter });
  };

  // END OF FILTER

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1 className=" font-bold text-3xl">Find a teacher</h1>
        <CustomClassTextField onChange={handleChange} label="Teacher's name" />
      </div>
      <div className={styles.teachersCardContainer}>
        {teachers.map((teacher) => (
          <div className={styles.eachTeacerCard}>
            <Avatar src={teacher.profileImg} sx={{ width: 54, height: 54 }} />
            <p className=" font-bold ">{teacher.name}</p>
            <p>{teacher.job}</p>
            <p>{teacher.role}</p>
            <Link
              href={`/teachers/${teacher.id}`}
              className=" text-blue-300 underline ml-auto"
            >
              View profile
            </Link>
            <Button style={{ width: "100%" }} variant="contained">
              See Classes
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
