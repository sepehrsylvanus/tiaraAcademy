"use client";
import { Card, CardContent } from "@/components/ui/card";

import { Star, AccessTime } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import { getFeaturedClasses } from "@/actions/actions";

import MyCourses from "@/components/MyCourses";
import { Button } from "@/components/ui/button";
import { number } from "zod";
import { useEffect, useState } from "react";
import { Class } from "@/utils/types";
import CustomHamburger from "@/components/hamburger/CustomHamburger";

export default function StudentHub() {
  const [displayCount, setDisplayCount] = useState(3);
  const [featuredClasses, setFeaturedClasses] = useState<Class[]>();
  const handleShowMore = () => {
    setDisplayCount((prev: number) => prev + 2);
  };

  useEffect(() => {
    const getClasses = async () => {
      const featuredClasses = await getFeaturedClasses();
      setFeaturedClasses(featuredClasses);
    };
    getClasses();
  }, []);

  return (
    <div className="px-2 pb-4  md:pl-[4em]">
      <div className="featuredClasses">
        <div className=" mb-2 border-b border-dashed flex justify-between flex-row-reverse items-center md:justify-end">
          <CustomHamburger navbar={true} sidebar={false} />
          <h2 className="font-bold text-2xl ">Featured Classes</h2>
        </div>
        <div className="featuredContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredClasses ? (
            featuredClasses.slice(0, displayCount).map((featuredClass) => {
              console.log(featuredClass.duration);
              const seconds = Math.floor(Number(featuredClass.duration) / 1000);
              const minutes = Math.floor(seconds / 60);
              const hours = Math.floor(minutes / 60);
              const remainingMinutes = minutes % 60;

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
                  <div className="teacherPaper flex px-4  justify-between items-center bg-white w-[90%] shadow-lg rounded-md relative bottom-6 left-2">
                    <Avatar
                      src={
                        featuredClass.classInstructors[0].instructor.profileImg
                      }
                      sx={{ width: 54, height: 54 }}
                    />
                    <span className="text-sm">
                      {" "}
                      {featuredClass.classInstructors[0].instructor.name}
                    </span>
                  </div>
                  <CardContent className="">
                    <h4>{featuredClass.title}</h4>
                    <div className="flex gap-8 mt-4">
                      <p className="flex gap-2">
                        <AccessTime />
                        {`${
                          hours > 0 ? `${hours}hr` : ""
                        } ${remainingMinutes}m`}
                      </p>
                      <p className="flex gap-2">
                        <Star />
                        {featuredClass.rating}/5
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="mx-auto">
              <CircularProgress />
            </div>
          )}
        </div>

        {featuredClasses && featuredClasses.length > displayCount && (
          <div className="w-full flex justify-center">
            <Button
              className="w-full my-4 sm:w-[50%] "
              onClick={handleShowMore}
            >
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
