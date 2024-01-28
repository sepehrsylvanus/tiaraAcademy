import React from "react";
import styles from "./featuredCourse.module.css";
import { Card, CardContent, CardMedia } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
const FeaturedCourse = () => {
  return (
    <div className={styles.container}>
      <h3>کلاس‌های جدید</h3>
      <div className={styles.cardContainer}>
        <Card sx={{ maxWidth: 300 }}>
          <CardMedia
            sx={{ height: 140 }}
            image="https://images.pexels.com/photos/1595385/pexels-photo-1595385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            title="green iguana"
          />
          <CardContent>
            <h5>A test</h5>
            <div className={styles.classStuff}>
              <span>
                <AccessTimeIcon/> 1h 53m
              </span>
              <span>
                <StarIcon/> <span>4.9</span>/5
              </span>
              <button>Enroll</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeaturedCourse;
