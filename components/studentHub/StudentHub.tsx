"use client";
import { Card, CardContent } from "@/components/ui/card";

import { Avatar, CircularProgress } from "@mui/material";

import MyCourses from "@/components/MyCourses";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { Class } from "@/utils/types";
import axios from "axios";
import Link from "next/link";

export default function StudentHub() {
  const [displayCount, setDisplayCount] = useState(3);
  const [featuredClasses, setFeaturedClasses] = useState<Class[]>();
  const [loading, setLoading] = useState(true);
  const handleShowMore = () => {
    setDisplayCount((prev: number) => prev + 2);
  };
  useEffect(() => {
    console.log(featuredClasses);
  }, [featuredClasses]);

  useEffect(() => {
    try {
      axios.get("/api/classes").then((res) => {
        console.log(res.data);
        const classes: Class[] = res.data.classes;
        const result = classes.filter((cls) => {
          const cutoffDate = new Date();
          cutoffDate.setDate(cutoffDate.getDate() - 7);
          const classCreatedDate = new Date(cls.createdAt);
          return classCreatedDate >= cutoffDate;
        });
        console.log(result);
        setFeaturedClasses(result);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="px-2 pb-4  md:pl-[4em]">
      <div className="featuredClasses">
        <div className=" mb-2 border-b border-dashed flex justify-between flex-row-reverse items-center md:justify-end">
          <h2 className="font-bold text-2xl">Featured Classes</h2>
        </div>
        <div
          className={`featuredContainer ${
            featuredClasses && featuredClasses?.length > 0
          } gap-4`}
        >
          {loading ? (
            <div style={{ transform: "scale(.7)" }}>
              <CircularProgress sx={{ color: "white" }} />
            </div>
          ) : featuredClasses && featuredClasses?.length > 0 ? (
            featuredClasses.slice(0, displayCount).map((featuredClass) => {
              return (
                <Card
                  key={featuredClass.id}
                  className="eachFeatured bg-extraBg text-lightPrime p-2"
                >
                  <img
                    src="/article.jpg"
                    alt="featuredCourseImg"
                    width={"100%"}
                    height={200}
                    className="rounded-md"
                  />
                  <div className="teacherPaper flex px-4 py-2 justify-between items-center bg-white w-[90%] shadow-lg rounded-md relative bottom-6 left-2">
                    <Avatar sx={{ width: 54, height: 54 }} />
                    <span className="text-sm text-lightText">
                      {`${featuredClass.creator.fName} ${featuredClass.creator.lName}`}
                    </span>
                  </div>
                  <CardContent className="">
                    <h4 className=" font-bold text-xl">
                      {featuredClass.title}
                    </h4>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="w-full">
              There is not featured classes. Please go to{" "}
              <Link className=" underline" href={"/hub/classes"}>
                classes page
              </Link>{" "}
              in order to see classes...
            </p>
          )}
        </div>

        {featuredClasses && featuredClasses.length > displayCount && (
          <div className="w-full flex justify-center">
            <Button className="w-full my-4 sm:w-[30%]" onClick={handleShowMore}>
              Show More
            </Button>
          </div>
        )}
      </div>
      <div className="mt-6">
        <MyCourses />
      </div>
    </div>
  );
}
