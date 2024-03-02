import React from "react";
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
const page = async () => {
  const teachers = await retrieveTeachers();
  console.log({ teachers });
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <h1>Find a teacher</h1>
        <CustomClassTextField label="Teacher's name" />
      </div>
      <div className={styles.teachersCardContainer}>
        <div className={styles.eachTeacerCard}>
          <div className={styles.details}>
            <div className={styles.info}>
              <p>Teacher</p>
              <p>
                <StarIcon /> <span>4.98 </span> | <span>6353 </span>reviews
              </p>
              <p>Tutor since 2020</p>
            </div>
            <Avatar src="/khashayar.jpg" sx={{ width: 54, height: 54 }} />
          </div>
          <div className={styles.bio}></div>
          <div className={styles.extra}></div>
          <Button>See Classes</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
