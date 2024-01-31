
import React, { useState } from "react";
import styles from "./myCourses.module.css";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  LinearProgress,
} from "@mui/material";
import Link from "next/link";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { CustomLinearProgress } from "../stylesComponents";
import { myCourses } from "@/utils/fakeData";

const MyCourses = () => {
  const [visibleCourses, setVisibleCourses] = useState(2); // Initial number of visible courses

  const loadMoreCourses = () => {
    setVisibleCourses(prev => prev + 2); // Increase the number of visible courses by 2
  };

  return (
    <div className={styles.container}>
      <h3 style={{ marginBottom: "1em", marginTop: "2em" }}>My Learning</h3>
      <div className={styles.coursesContainer}>
        {myCourses.slice(0, visibleCourses).map((course, index) => (
          <Card key={index} className={styles.eachCard}>
            <Link className={styles.bookmarkLink} href={"#"}>
              <BookmarkIcon style={{ position: "relative", top: 2 }} />
            </Link>
            <CardMedia
              className={styles.cardMedia}
              image={course.img}
              title={course.title}
            />
            <CardContent className={styles.cardContent}>
              {/* LESSON TITLE */}
              <div>
                <h5 style={{ fontSize: 24 }}>{course.title}</h5>
                <h6 style={{ fontSize: 16, fontWeight: "300" }}>
                  {course.instructure}
                </h6>
              </div>
              {/* LESSON PROGRESS */}
              <div>
                <CustomLinearProgress
                  className={styles.progress}
                  variant="determinate"
                  value={course.progress}
                />
                <p>
                  <span>{course.progress}</span>% complete
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {visibleCourses < myCourses.length && (
        <div style={{ textAlign: "center", marginTop: "1em" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#81403e",
              "&:hover": { backgroundColor: "#915e5c" },
            }}
            onClick={loadMoreCourses}
          >
            View More
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
