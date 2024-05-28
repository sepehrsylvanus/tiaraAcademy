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
import { Class, User, UserClasses } from "@/utils/types";
import { getToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
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
    const fetchMyClasses = async () => {
      const token = await getToken()!;
      const currentUser = (await getSingleUser(token?.value)) as User;

      Axios.get("/registerClass")
        .then((res) => {
          const userClasses: UserClasses[] = res.data;

          const myClasses = userClasses.filter(
            (item) => item.userId === currentUser.id
          );
          const classes = myClasses.map((eachClass) => eachClass.class);
          setMyClasses(classes);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchMyClasses();
  }, []);



  return (
    <div>
      <h2 className="font-bold text-2xl mb-2 border-b border-dashed">
        My Classes
      </h2>
      <div
        className={`featuredContainer ${
          !loading &&
          myClasses.length > 0 &&
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
        } gap-4`}
      >
        {loading ? (
          <div className="w-full flex justify-center">
            <CircularProgress sx={{ color: "white" }} />
          </div>
        ) : myClasses.length === 0 ? (
          <div className="flex justify-center w-full">
            <p className="text-xl">You have't register in any clasases yet</p>
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
