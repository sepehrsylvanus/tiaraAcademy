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
import BrownLink from "../reusableComponents/brownLink/BrownLink";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CustomHamburger from "../hamburger/CustomHamburger";
import {
  AccessTime,
  EditNote,
  GridView,
  NoteAlt,
  OndemandVideo,
  People,
} from "@mui/icons-material";

const FeaturedCourse = async () => {
  const featuredCourses: Class[] = await getFeaturedClasses();

  return (
    <div className={styles.container}>
      <div className="flex justify-between">
        <h3 className="h3">New classes</h3>
        <Popover>
          <PopoverTrigger>
            <div className="block md:hidden">
              <CustomHamburger />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex w-full justify-around  gap-2">
              <Link href={"/home"} className="navLinkContainer">
                <GridView />
              </Link>
              <Link href={"/classes"} className="navLinkContainer">
                <AccessTime />
              </Link>
              <Link href={"/writing"} className="navLinkContainer">
                <EditNote />
              </Link>
              <Link href={"/teachers"} className="navLinkContainer">
                <People />
              </Link>
              <Link href={"/blogs"} className="navLinkContainer">
                <NoteAlt />
              </Link>
              <Link href={"#"} className="navLinkContainer">
                <OndemandVideo />
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div className={styles.cardContainer}>
        {featuredCourses.map((eachClass) => {
          const hours = Math.floor(Number(eachClass.duration) / 1000 / 60 / 60);

          return (
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
              <CardContent className=" relative bottom-[1em] text-center min-[350px]:text-start">
                <div className={styles.instructure}>
                  <Avatar
                    src={eachClass.classInstructors[0].instructor.profileImg}
                  />{" "}
                  {eachClass.classInstructors[0].instructor.name}
                </div>
                <h5
                  className="font-bold"
                  style={{ fontSize: 18, fontWeight: "light" }}
                >
                  {eachClass.title}
                </h5>
                <div className={styles.classStuff}>
                  <div className={styles.iconsContainer}>
                    <p className="flex items-center gap-1">
                      <AccessTimeIcon className={styles.icon} />
                      <span>
                        {" "}
                        {hours > 0 && `${hours}hr  `}{" "}
                        {(Number(eachClass.duration) / 1000 / 60) % 60}m
                      </span>
                    </p>
                    <span className="flex items-center gap-1">
                      <StarIcon className={styles.icon} />{" "}
                      <span>{eachClass.rating}</span>/5
                    </span>
                  </div>
                  <BrownLink
                    href={`/classes/${eachClass.title
                      .toLowerCase()
                      .replace(
                        /\s+/g,
                        "-"
                      )}?teacher=${eachClass.classInstructors[0].instructor.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}&id=${eachClass.id}`}
                    title="register"
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedCourse;
