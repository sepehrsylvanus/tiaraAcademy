"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import UpdateIcon from "@mui/icons-material/Update";
import WorkIcon from "@mui/icons-material/Work";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";
import ForumIcon from "@mui/icons-material/Forum";
import { Separator } from "@/components/ui/separator";
import AddComment from "@/components/addComment/AddComment";
import EditIcon from "@mui/icons-material/Edit";
import {
  useGetCourseVideosDetails,
  useGetVerifiedCoursePayment,
} from "@/hooks/useVideos";
import { VideoCourses } from "@/constants";
import { useGetUser } from "@/hooks/useUsers";
import { useRouter } from "next/navigation";
import { buyVideoCourse, getVerifiedCoursePayment } from "@/actions/payment";
import { useTranslations } from "next-intl";
type SingleVideoProps = {
  params: {
    id: string;
  };
};

type verifiedCourse = {
  id: string;
  courseId: string;
  userId: string;
  resnumber: string;
  verified: boolean;
};
const SingleVideo = ({ params }: SingleVideoProps) => {
  const t = useTranslations("VideoCourse");
  const [openComment, setOpenComment] = useState(false);
  const [verifiedCourse, setVerifiedCourse] = useState<verifiedCourse[]>();
  const { data: videoDetails, isLoading: videoDetailsLoading } =
    useGetCourseVideosDetails(params.id);
  const router = useRouter();
  const { data: currentUser, isLoading: currentUserLoading } = useGetUser();
  console.log(currentUser?.id);

  useEffect(() => {
    const getVerifiedCourse = async () => {
      if (currentUser) {
        const verifiedCourse = await getVerifiedCoursePayment({
          id: params.id,
          userId: currentUser.id,
        });
        console.log(verifiedCourse);
        setVerifiedCourse(verifiedCourse);
      }
    };
    getVerifiedCourse();
  }, [currentUser, params]);

  console.log(videoDetails);
  const handleBuyCourse = async () => {
    const buyVideo = await buyVideoCourse(
      videoDetails!.price,
      videoDetails!.title,
      videoDetails!.id
    );
    if (buyVideo) {
      router.push(buyVideo);
    }
  };
  const ifbuyed = verifiedCourse && verifiedCourse.length > 0;
  if (!videoDetailsLoading) {
    return (
      <div className="md:w-9/12  pb-[6em] mx-auto w-full md:px-0 px-4">
        <section
          id="introduction"
          className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full mt-[4em]"
        >
          <div id="text " className="order-2 md:order-none">
            <h2 className="mb-4">{videoDetails?.title}</h2>
            <p>{videoDetails?.description}</p>
            <div
              id="price&register"
              className="flex justify-between mt-4 flex-col-reverse md:flex-row items-center gap-5"
            >
              {ifbuyed ? (
                <Button
                  className=" md:w-auto mt-2 md:mt-0 bg-green-500 pointer-events-none  break-all flex-1"
                  onClick={handleBuyCourse}
                >
                  {t("alreadyBought")}
                </Button>
              ) : (
                <Button
                  className="w-full md:w-auto mt-2 md:mt-0 flex-1"
                  onClick={handleBuyCourse}
                >
                  {t("buy")}
                </Button>
              )}

              {!currentUserLoading && currentUser?.role !== "student" ? (
                <Link
                  href={`/hub/videos/${params.id}/edit`}
                  className="w-full md:w-auto"
                >
                  <Button className="w-full md:w-auto mt-2 md:mt-0 flex gap-2 flex-1">
                    <EditIcon /> {t("manageThisCourse")}
                  </Button>
                </Link>
              ) : (
                <Link
                  href={videoDetails?.materialsLink ?? "#"}
                  className="w-full md:w-auto"
                >
                  <Button className="w-full md:w-auto mt-2 md:mt-0 flex gap-2 flex-1">
                    <EditIcon /> {t("downloadMaterials")}
                  </Button>
                </Link>
              )}
              {!ifbuyed && (
                <p className="font-bold flex-1">
                  <span className="mr-1">{videoDetails?.price}</span>
                  {t("toman")}
                </p>
              )}
            </div>
          </div>

          <div
            id="coursePrevVideo"
            className={`order-1 ${
              !videoDetails?.videoCourseSession[0]?.video &&
              "grid place-content-center"
            }`}
          >
            <ReactPlayer
              width={"100%"}
              height={"auto"}
              controls
              url={videoDetails?.videoCourseSession[0]?.video}
            />
            {!videoDetails?.videoCourseSession[0]?.video && (
              <p className="font-bold text-lg">{t("noPreview")}</p>
            )}
          </div>
        </section>

        <section
          id="features"
          className="grid
       grid-cols-1 md:grid-cols-3 gap-3 justify-items-center mt-6"
        >
          <div className=" rounded-md w-full text-center bg-cardBg text-white">
            <FormatListNumberedIcon className="text-lightText " />
            <p className="text-extraText">{t("videoCount")}</p>
            <p className="text-lightText">
              {videoDetails?.videoCourseSession?.length ?? 0}
            </p>
          </div>
          <div className=" rounded-md w-full text-center bg-cardBg text-white">
            <UpdateIcon className="text-lightText " />
            <p className="text-extraText">{t("lastUpdate")}</p>
            <p className="text-lightText">
              {videoDetails?.updatedAt.toLocaleDateString()}
            </p>
          </div>
          <div className=" rounded-md md:w-full text-center bg-cardBg text-white col-span-2 md:col-span-1 w-full">
            <WorkIcon className="text-lightText " />
            <p className="text-extraText">{t("preRquesities")}</p>
            <p className="text-lightText">English 1, English 2</p>
          </div>
        </section>

        <div className="flex flex-col md:flex-row-reverse gap-6">
          <section
            id="teacher"
            className="flex flex-col items-center mt-4 gap-2 rounded-md py-4 shadow-md bg-cardBg md:w-4/12 md:h-fit"
          >
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage
                src={
                  videoDetails?.teacher.image ?? "https://picsum.photos/200/300"
                }
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <p className="font-bold">{`${videoDetails?.teacher.fName} ${videoDetails?.teacher.lName}`}</p>
            <p>Teacher of English, Persian, Russian</p>
            <Button variant={"outline"}>{t("showProfile")}</Button>
          </section>

          <div className="md:w-8/12">
            <section
              id="description"
              className="bg-cardBg text-lightText p-4  mt-2 rounded-md 
      "
            >
              <h2 className=" text-center mt-4">{t("description")}</h2>
              <p className="text-justify mt-2 ">{videoDetails?.explenation}</p>
            </section>
            <section
              className="bg-cardBg text-lightText p-4  mt-2 rounded-md 
      "
            >
              <h2>
                <SchoolIcon /> {t("lessons")}
              </h2>
              {verifiedCourse &&
                verifiedCourse?.length === 0 &&
                videoDetails?.price !== 0 && <p>{t("locked")}</p>}
              <div className="flex flex-col gap-2 mt-2">
                {videoDetails?.videoCourseSession
                  .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
                  .map((lesson, index) => {
                    if (index < 3) {
                      return (
                        <Link href={`/hub/videos/${params.id}/${lesson.id}`}>
                          <div
                            key={index}
                            className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all"
                          >
                            <p>{lesson.title}</p>
                          </div>
                        </Link>
                      );
                    } else if (
                      (index > 2 &&
                        verifiedCourse &&
                        verifiedCourse.length > 0) ||
                      videoDetails.price === 0
                    ) {
                      return (
                        <Link href={`/hub/videos/${params.id}/${lesson.id}`}>
                          <div
                            key={index}
                            className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all"
                          >
                            <p>{lesson.title}</p>
                          </div>
                        </Link>
                      );
                    } else {
                      return (
                        <Link
                          href={`#`}
                          className="pointer-events-none
                         opacity-50"
                        >
                          <div
                            key={index}
                            className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all"
                          >
                            <p>{lesson.title}</p>
                          </div>
                        </Link>
                      );
                    }
                  })}
                {videoDetails?.videoCourseSession.length === 0 && (
                  <p>{t("noSessionYet")}</p>
                )}
              </div>
            </section>

            <section
              className="bg-cardBg text-lightText p-4  mt-2 rounded-md 
      "
            >
              <div className="flex justify-between">
                <h2 className="flex gap-2 items-center">
                  <ForumIcon />
                  {t("comments")}
                </h2>
                <Button onClick={() => setOpenComment(true)}>
                  {t("addNewComment")}
                </Button>
              </div>
              <div className={`animate-fadeIn ${openComment ? "" : "hidden"}`}>
                <AddComment
                  setOpenComment={setOpenComment}
                  isCourse={true}
                  isSession={false}
                  courseId={params.id}
                />
              </div>
              <div className="flex flex-col gap-3 mt-4">
                {videoDetails?.Comment.sort(
                  (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
                ).map((comment, index) => {
                  if (comment.verified) {
                    return (
                      <div className="p-5 rounded-md bg-slate-200" key={index}>
                        <div className="flex gap-3 items-center">
                          <Avatar>
                            <AvatarImage
                              src={`${
                                comment.commentCreator.image ??
                                "https://github.com/shadcn.png"
                              }`}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <p>
                              {`${comment.commentCreator.fName} ${comment.commentCreator.lName}`}{" "}
                            </p>
                            <p className="opacity-50">
                              {comment.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Separator className="my-2" />
                        <p>{comment.content}</p>

                        {comment.CommentAnswer.length > 0 && (
                          <div className="rounded-md p-4 bg-white mt-4">
                            <div className="flex gap-3 items-center">
                              <Avatar>
                                <AvatarImage
                                  src={`${
                                    comment.CommentAnswer[0]?.answerCreator
                                      .image ?? "https://github.com/shadcn.png"
                                  }`}
                                />
                                <AvatarFallback>CN</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <p>
                                  {`${comment.CommentAnswer[0]?.answerCreator.fName} ${comment.CommentAnswer[0]?.answerCreator.lName}`}{" "}
                                </p>
                                <p className="opacity-50">
                                  {comment.CommentAnswer[0]?.createdAt.toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <Separator className="my-2" />
                            {comment.CommentAnswer[0]?.content}
                          </div>
                        )}
                      </div>
                    );
                  }
                })}
                {videoDetails?.Comment.length === 0 && (
                  <p>{t("noCommentYet")}</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleVideo;
