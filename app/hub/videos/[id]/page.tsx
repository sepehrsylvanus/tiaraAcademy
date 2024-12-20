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
  useAddFreeVideoCourse,
  useGetCourseVideosDetails,
  useGetRegisteredFreeVideoCourse,
  useGetVerifiedCoursePayment,
} from "@/hooks/useVideos";
import { VideoCourses } from "@/constants";
import { useGetUser } from "@/hooks/useUsers";
import { useRouter } from "next/navigation";
import { buyVideoCourse, getVerifiedCoursePayment } from "@/actions/payment";
import { useTranslations } from "next-intl";
import DOMPurify from "dompurify";
import { fetchRegisteredVideoCourse } from "@/actions/videos/videos.action";

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
  const [registeredVideoCourse, setRegisteredVideoCourse] = useState<any>();
  const { data: videoDetails, isLoading: videoDetailsLoading } =
    useGetCourseVideosDetails(params.id);
  const router = useRouter();
  const { data: currentUser, isLoading: currentUserLoading } = useGetUser();
  useEffect(() => {
    const getRegisteredVideoCourse = async () => {
      if (currentUser && videoDetails) {
        const registeredVideos = await fetchRegisteredVideoCourse(
          currentUser.id,
          videoDetails.id
        );
        setRegisteredVideoCourse(registeredVideos);
      }
    };
    getRegisteredVideoCourse();
  }, [currentUser, videoDetails]);

  const { mutate: addFreeVideoCourse } = useAddFreeVideoCourse();

  useEffect(() => {
    const getVerifiedCourse = async () => {
      if (currentUser) {
        const verifiedCourse = await getVerifiedCoursePayment({
          id: params.id,
          userId: currentUser.id,
        });
        setVerifiedCourse(verifiedCourse);
      }
    };
    getVerifiedCourse();
  }, [currentUser, params]);

  const pureHTML = DOMPurify.sanitize(videoDetails?.explenation!);
  const handleBuyCourse = async () => {
    if (videoDetails?.price !== 0) {
      const buyVideo = await buyVideoCourse(
        videoDetails!.price,
        videoDetails!.title,
        videoDetails!.id
      );
      if (buyVideo) {
        router.push(buyVideo);
      }
    } else {
      addFreeVideoCourse({
        videoCourseId: videoDetails.id,
        userId: currentUser!.id!,
      });
    }
  };
  const ifbuyed = verifiedCourse && verifiedCourse.length > 0;
  if (!videoDetailsLoading && registeredVideoCourse) {
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
              {ifbuyed || registeredVideoCourse?.length > 0 ? (
                <Button
                  className=" md:w-auto mt-2 md:mt-0 bg-green-500 pointer-events-none  break-all flex-1"
                  onClick={handleBuyCourse}
                >
                  {videoDetails?.price !== 0
                    ? t("alreadyBought")
                    : t("alreadyAdd")}
                </Button>
              ) : (
                <Button
                  className="w-full md:w-auto mt-2 md:mt-0 flex-1"
                  onClick={handleBuyCourse}
                >
                  {videoDetails?.price !== 0 ? t("buy") : t("addToAccount")}
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
                ifbuyed && (
                  <Link
                    href={videoDetails?.materialsLink ?? "#"}
                    className="w-full md:w-auto"
                  >
                    <Button className="w-full md:w-auto mt-2 md:mt-0 flex gap-2 flex-1">
                      <EditIcon /> {t("downloadMaterials")}
                    </Button>
                  </Link>
                )
              )}
              {!ifbuyed && videoDetails?.price !== 0 && (
                <p className="font-bold ">
                  <span className="mr-1">{videoDetails?.price}</span>
                  {t("toman")}
                </p>
              )}
              {videoDetails?.price === 0 && (
                <p className="border border-lightText p-2 rounded-md pointer-events-none">
                  {t("free")}
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
          <div className=" rounded-md md:w-full text-center bg-cardBg text-white col-span-2 md:col-span-1 w-full pb-2 pt-2">
            <WorkIcon className="text-lightText " />
            <p className="text-extraText">{t("preRequisities")}</p>
            <p className="text-lightText">
              {videoDetails?.prerequisities.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
              {videoDetails?.prerequisities.length === 0 &&
                t("noPrerequisities")}
            </p>
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

            <p className="font-bold">
              {`${t("teacher")}: `}

              {`${videoDetails?.teacher.fName} ${videoDetails?.teacher.lName}`}
            </p>
            <Link href={`/hub/teachers/${videoDetails?.teacherId}`}>
              <Button variant={"outline"}>{t("showProfile")}</Button>
            </Link>
          </section>

          <div className="md:w-8/12">
            <section
              id="description"
              className="bg-cardBg text-lightText p-4  mt-2 rounded-md 
      "
            >
              <h2 className=" text-center mt-4">{t("description")}</h2>
              <div
                className="px-5"
                dangerouslySetInnerHTML={{ __html: pureHTML }}
              />
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
                  .sort((a, b) => a.index - b.index)
                  .map((lesson, index) => {
                    if (index < 3) {
                      return (
                        <Link href={`/hub/videos/${params.id}/${lesson.id}`}>
                          <div
                            key={index}
                            className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all "
                            style={{
                              unicodeBidi: "bidi-override",
                              direction: "ltr",
                            }}
                          >
                            <p>{lesson.title}</p>
                          </div>
                        </Link>
                      );
                    } else if (
                      (index > 2 &&
                        verifiedCourse &&
                        verifiedCourse.length > 0) ||
                      (registeredVideoCourse &&
                        registeredVideoCourse.length > 0) ||
                      currentUser?.role === "admin" ||
                      currentUser?.role === "adminTeacher"
                    ) {
                      return (
                        <Link href={`/hub/videos/${params.id}/${lesson.id}`}>
                          <div
                            key={index}
                            className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all "
                            style={{
                              unicodeBidi: "bidi-override",
                              direction: "ltr",
                            }}
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
                            className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all "
                            style={{
                              unicodeBidi: "bidi-override",
                              direction: "ltr",
                            }}
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
