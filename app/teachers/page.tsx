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
const page = async () => {
  const teachers = await retrieveTeachers();
  console.log({ teachers });
  return (
    <div className={styles.container}>
      <h1>Teacher's Introduction</h1>
      <div className={styles.teachersCardContainer}>
        {teachers &&
          teachers.map((teacher) => (
            <Card key={teacher.id} className={styles.eachTeacherCard}>
              <CardMedia
                sx={{ position: "relative", height: 250, width: "100%" }}
              >
                <Image
                  src={teacher.profileImg}
                  alt={`${teacher.name} image`}
                  fill
                  style={{
                    position: "absolute",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </CardMedia>

              <CardContent>
                <span style={{ fontWeight: 700, fontSize: 18 }}>
                  {teacher.name}
                </span>{" "}
                {teacher.bio}
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  sx={{ color: "#81403e", fontWeight: 700, "&:hover": {} }}
                  href={`/teachers/${teacher.id}`}
                >
                  Read More
                </Button>
              </CardActions>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default page;
