"use client";
import { myCourses } from "@/utils/fakeData";
import { LinearProgress, linearProgressClasses, styled } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "@mui/icons-material";
import { useState } from "react";
import { Button } from "./ui/button";
export const CustomLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 50,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#d7d7d7",
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: "#f0f0f0",
  },
}));
const MyCourses = () => {
  const [displayCount, setDisplayCount] = useState(3);
  const handleShowMore = () => {
    setDisplayCount((prev: number) => prev + 2);
  };
  return (
    <div>
      <h2 className="font-bold text-2xl mb-2 border-b border-dashed">
        My Classes
      </h2>
      <div className="featuredContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {myCourses?.slice(0, displayCount).map((myCourse, index) => (
          <Card
            key={index}
            className="eachFeatured bg-slate-300 p-2 flex flex-col"
          >
            <div className="relative">
              <img
                src="/article.jpg"
                alt="featuredCourseImg"
                width={"100%"}
                height={200}
                className="rounded-md"
              />
              <div className="border border-black w-fit rounded-md hover:bg-slate-500 transition absolute top-[1em] right-[1em]">
                <Bookmark />
              </div>
            </div>

            <CardContent className="flex flex-col gap-2 mt-3">
              <h4 className="font-bold text-lg">{myCourse.title}</h4>
              <p>{myCourse.instructure}</p>
              <CustomLinearProgress
                variant="determinate"
                value={myCourse.progress}
              />{" "}
              <p>{myCourse.progress}% Complete</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {myCourses && myCourses.length > displayCount && (
        <div className="w-full flex justify-center">
          <Button className="w-full my-4 sm:w-[50%] " onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyCourses;