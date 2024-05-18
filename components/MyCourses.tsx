"use client";
import { myCourses } from "@/utils/fakeData";
import {
  CircularProgress,
  LinearProgress,
  linearProgressClasses,
  styled,
} from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Axios } from "@/utils/axiosIn";
import { Class, UserClasses } from "@/utils/types";
export const CustomLinearProgress = styled(LinearProgress)(() => ({
  height: 10,
  borderRadius: 50,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#D0D7E1",
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: "#9ccddb",
  },
}));
const MyCourses = () => {
  const [displayCount, setDisplayCount] = useState(3);
  const [myClasses, setMyClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const handleShowMore = () => {
    setDisplayCount((prev: number) => prev + 2);
  };

  useEffect(() => {
    Axios.get("/registerClass")
      .then((res) => {
        console.log(res.data);
        const userClasses: UserClasses[] = res.data;
        console.log(userClasses);
        const classes = userClasses.map((eachClass) => eachClass.class);
        setMyClasses(classes);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log(myClasses);
  }, [myClasses]);

  return (
    <div>
      <h2 className="font-bold text-2xl mb-2 border-b border-dashed">
        My Classes
      </h2>
      <div
        className={`featuredContainer ${
          !loading && "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
        } gap-4`}
      >
        {loading ? (
          <div className="w-full flex justify-center">
            <CircularProgress sx={{ color: "white" }} />
          </div>
        ) : (
          myClasses?.slice(0, displayCount).map((myCourse, index) => (
            <Card
              key={index}
              className="eachFeatured bg-extraBg text-lightPrime p-2 flex flex-col"
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
                <p>{`${myCourse.creator?.fName} ${myCourse.creator?.lName}`}</p>
                {/* <CustomLinearProgress
                variant="determinate"
                value={myCourse.progress}
              />{" "}
              <p>{myCourse.progress}% Complete</p> */}
              </CardContent>
            </Card>
          ))
        )}
      </div>
      {myCourses && myCourses.length > displayCount && (
        <div className="w-full flex justify-center">
          <Button className="w-full my-4 sm:w-[30%] " onClick={handleShowMore}>
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
