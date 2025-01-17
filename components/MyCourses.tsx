"use client";
import { myCourses } from "@/utils/fakeData";
import {
  CircularProgress,
  LinearProgress,
  linearProgressClasses,
  styled,
} from "@mui/material";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Bookmark, Person, School, Videocam } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Axios } from "@/utils/axiosIn";
import { Class, User, UserClasses, VideoCourse } from "@/utils/types";
import { getToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

import { useGetCurrentUser } from "@/hooks/useGetUsers";
import { fetchAllMyVideos } from "@/actions/videos/videos.action";
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
  const [myVideos, setMyVideos] = useState<VideoCourse[]>();
  const t = useTranslations("StudentHub");
  const handleShowMore = () => {
    setDisplayCount((prev: number) => prev + 2);
  };
  const { data: currentUser } = useGetCurrentUser();

  useEffect(() => {
    if (currentUser) {
      const getMyVideos = async () => {
        const myVideos = await fetchAllMyVideos(currentUser.id);
        if (myVideos && myVideos.length > 0) {
          setMyVideos(myVideos);
        }
      };

      getMyVideos();
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchMyClasses = async () => {
      const currentUser = (await getSingleUser()) as User;

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

  if (currentUser && myClasses && myVideos) {
    return (
      <div>
        <h2 className="font-bold text-2xl mb-2 border-b border-dashed">
          {t("myClasses")}
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
              <p className="text-xl">{t("noRegistered")}</p>
            </div>
          ) : (
            myClasses?.slice(0, displayCount).map((myCourse, index) => (
              <Card
                key={index}
                className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg bg-cardBg"
              >
                <div className="relative">
                  {myCourse.imageLink && (
                    <img
                      src={myCourse.imageLink}
                      alt={myCourse.imageName ?? ""}
                      width="400"
                      height="200"
                      className="w-full h-52 object-cover"
                      style={{ aspectRatio: "400/200", objectFit: "cover" }}
                    />
                  )}
                  <div
                    className={`absolute ${
                      myCourse.imageLink ? "bottom-[-40px] " : " "
                    } left-1/2 -translate-x-1/2 bg-background rounded-full p-2 shadow-lg`}
                  >
                    <Avatar className="w-16 h-16 border-4 border-background">
                      <AvatarImage
                        src={myCourse.teacher.image!}
                        alt={myCourse.teacher.fName}
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <CardContent
                  className={`${
                    myCourse.imageLink ? "mt-12" : "mt-24"
                  } px-6 pb-6 text-center `}
                >
                  <div className="font-bold text-xl">{`${myCourse.teacher.fName} ${myCourse.teacher.lName}`}</div>

                  <div className="mt-4 font-semibold text-lg">
                    {myCourse.title}
                  </div>
                  <Link href={`/hub/classes/${myCourse.id}`}>
                    <Button size="sm" className="mt-4">
                      {t("enter")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        {myCourses && myCourses.length > displayCount && (
          <div className="w-full flex justify-center">
            <Button
              className="w-full my-4 sm:w-[30%] "
              onClick={handleShowMore}
            >
              {t("showMore")}
            </Button>
          </div>
        )}
        <hr />
        <div className="grid-cols-1 grid md:grid-cols-4 gap-6 py-4">
          {myVideos?.slice(0, displayCount).map((myVideo, index) => (
            <Card key={index} className="border-extraBg">
              <CardHeader>
                <img
                  src={myVideo.thumbnailLink}
                  alt={`${myVideo.title} image`}
                  className="w-full h-full rounded-md"
                />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col rtl:items-end gap-2">
                  <p className="flex rtl:flex-row-reverse gap-2">
                    <School />
                    {myVideo.title}
                  </p>
                  <p className="flex rtl:flex-row-reverse gap-2">
                    <Person />
                    {`${myVideo.teacher.fName} ${myVideo.teacher.lName}`}
                  </p>
                  <p className="flex rtl:flex-row-reverse gap-2">
                    <Videocam />
                    {myVideo.videoCourseSession.length}
                    <span> {t("videos")}</span>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="mt-2">
                <Link href={`/hub/videos/${myVideo.id}`} className="w-full">
                  <Button className="bg-extraBg w-full rounded-3xl hover:text-lightPrime hover:bg-extraText">
                    View
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }
};

export default MyCourses;
