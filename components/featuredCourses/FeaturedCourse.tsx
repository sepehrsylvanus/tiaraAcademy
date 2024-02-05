import React from "react";
import styles from "./featuredCourse.module.css";
import { Avatar, Card, CardContent, CardMedia } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import { light } from "@mui/material/styles/createPalette";
import Link from "next/link";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { getFeaturedClasses } from "@/actions/actions";
import { Class } from "@/utils/types";
const FeaturedCourse = async () => {
  const featuredCourses: Class[] = await getFeaturedClasses();
  console.log(featuredCourses);
  return (
    <div className={styles.container}>
      <h3>کلاس‌های جدید</h3>
      <div className={styles.cardContainer}>
        {/* {featuredCourses.map((eachClass) => (
          <Card
            className={styles.eachCard}
            key={eachClass.id}
            sx={{ padding: ".5em" }}
          >
            <Link className={styles.bookmarkLink} href={"#"}>
              <BookmarkIcon style={{ position: "relative", top: 2 }} />
            </Link>
            {eachClass.img && (
              <CardMedia sx={{ height: 140 }} image={eachClass.img} />
            )}
            <CardContent style={{ position: "relative", bottom: "1em" }}>
              <div className={styles.instructure}>
                <Avatar src={eachClass.classInstructors[0].instructor.profileImg} /> {eachClass.instructor}
              </div>
              <h5 style={{ fontSize: 18, fontWeight: "light" }}>
                {eachClass.title}
              </h5>
              <div className={styles.classStuff}>
                <div className={styles.iconsContainer}>
                  <span>
                    <AccessTimeIcon className={styles.icon} /> {eachClass.time}
                  </span>
                  <span>
                    <StarIcon className={styles.icon} />{" "}
                    <span>{eachClass.rating}</span>/5
                  </span>
                </div>
                <button className={styles.enrollBtn}>ثبت نام</button>
              </div>
            </CardContent>
          </Card>
        ))} */}
      </div>
    </div>
  );
};

export default FeaturedCourse;
