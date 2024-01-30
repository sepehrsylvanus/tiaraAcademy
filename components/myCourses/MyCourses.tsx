import React from "react";
import styles from "./myCourses.module.css";
import { Card, CardContent, CardMedia, LinearProgress } from "@mui/material";
const MyCourses = () => {
  return (
    <div className={styles.container}>
      <h3 style={{marginBottom: '1em', marginTop: '2em'}}>My Learning</h3>
      <div className={styles.coursesContainer}>
        <Card className={styles.eachCard}>
          <CardMedia
            className={styles.cardMedia}
            image="https://images.pexels.com/photos/7256196/pexels-photo-7256196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            title="green iguana"
          />
          <CardContent className={styles.cardContent}>
            <h5 style={{ fontSize: 18, fontWeight: "light" }}>test name</h5>
            <h6>test instructure</h6>
            <LinearProgress variant="determinate" value={75} />
            <p>
              <span>75</span>% complete
            </p>
          </CardContent>
        </Card>
        <Card className={styles.eachCard}>
          <CardMedia
            sx={{ height: 140 }}
            image="https://images.pexels.com/photos/7256196/pexels-photo-7256196.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            title="green iguana"
          />
          <CardContent>
            <h5>test name</h5>
            <h6>test instructure</h6>
            <LinearProgress variant="determinate" value={75} />
            <p>
              <span>75</span>% complete
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyCourses;
