"use client";
import AddComment from "@/components/addComment/AddComment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { javascriptLessons, sampleComments } from "@/constants";
import { Separator } from "@radix-ui/react-separator";
import React, { FC, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import ForumIcon from "@mui/icons-material/Forum";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";
import {
  useGetCourseVideosDetails,
  useGetSessionDetails,
} from "@/hooks/useVideos";
import { useGetUser } from "@/hooks/useUsers";
import { getVerifiedCoursePayment } from "@/actions/payment";
interface VideoSessionProps {
  params: {
    id: string;
    sessionId: string;
  };
}
type verifiedCourse = {
  id: string;
  courseId: string;
  userId: string;
  resnumber: string;
  verified: boolean;
};
const SingleSession: FC<VideoSessionProps> = ({ params }) => {
  const [openComment, setOpenComment] = useState(false);
  const [verifiedCourse, setVerifiedCourse] = useState<verifiedCourse[]>();
  const { data: sessionDetails, isLoading: sessionDetailsLoading } =
    useGetSessionDetails(params.sessionId);
  const { data: videoDetails, isLoading: videoDetailsLoading } =
    useGetCourseVideosDetails(params.id);
  const { data: currentUser, isLoading: currentUserLoading } = useGetUser();
  console.log(currentUser?.role);

  useEffect(() => {
    const fetchVerifiedCourses = async () => {
      if (currentUser) {
        const verifiedCourse = await getVerifiedCoursePayment({
          id: params.id,
          userId: currentUser.id,
        });
        console.log(verifiedCourse);
        setVerifiedCourse(verifiedCourse);
      }
    };
    fetchVerifiedCourses();
  }, []);

  if (!sessionDetailsLoading && !videoDetailsLoading) {
    return (
      <div className="mt-[4em] md:mt-0 px-4 pb-[3em]">
        <div className="w-full md:w-[80%] mx-auto" id="sessionVideoContainer">
          <ReactPlayer
            width={"100%"}
            height={"auto"}
            controls
            url={sessionDetails?.video}
          />
        </div>
        <div
          id="sessionOptions"
          className="grid grid-cols-1 md:grid-cols-4 md:w-[80%] mx-auto mt-4 gap-4"
        >
          <div className="col-span-3">
            <section className="bg-cardBg rounded-md p-4">
              <h1>{videoDetails?.title}</h1>
              <h3>{sessionDetails?.title}</h3>
            </section>

            <section
              className="bg-cardBg text-lightText p-4  mt-2 rounded-md 
        "
            >
              <div className="flex justify-between">
                <h2 className="flex gap-2 items-center">
                  <ForumIcon />
                  Comments
                </h2>
                <Button onClick={() => setOpenComment(true)}>
                  Add a new comment
                </Button>
              </div>
              <div className={`animate-fadeIn ${openComment ? "" : "hidden"}`}>
                <AddComment
                  setOpenComment={setOpenComment}
                  isSession={true}
                  isCourse={false}
                  sessionId={params.sessionId}
                />
              </div>
              <div className="flex flex-col gap-3 mt-4">
                {sessionDetails?.Comment.sort(
                  (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
                ).map((comment, index) => (
                  <div key={index} className="p-5 rounded-md bg-slate-200">
                    <div className="flex gap-3 items-center">
                      <Avatar>
                        <AvatarImage
                          src={
                            comment.commentCreator.image ??
                            "https://github.com/shadcn.png"
                          }
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

                    {comment.CommentAnswer[0] && (
                      <div className="rounded-md p-4 bg-white mt-4">
                        <div className="flex gap-3 items-center">
                          <Avatar>
                            <AvatarImage
                              src={
                                comment.CommentAnswer[0].answerCreator.image ??
                                "https://github.com/shadcn.png"
                              }
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <p>
                              {`${comment.CommentAnswer[0].answerCreator.fName} ${comment.CommentAnswer[0].answerCreator.lName}`}{" "}
                            </p>
                            <p className="opacity-50">
                              {comment.CommentAnswer[0].createdAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Separator className="my-2" />
                        {comment.CommentAnswer[0].content}
                      </div>
                    )}
                  </div>
                ))}
                {sessionDetails?.Comment.length === 0 && (
                  <p>There is no comment yet</p>
                )}
              </div>
            </section>
          </div>
          <section
            className="bg-cardBg text-lightText p-4  rounded-md col-span-3 md:col-span-1  h-fit  
        "
          >
            <h2>
              <SchoolIcon /> Lessons
            </h2>
            <div className="flex flex-col gap-2 mt-2">
              {videoDetails?.videoCourseSession
                .sort((a, b) => a.index - b.index)
                .map((lesson, index) => {
                  if (lesson.id !== params.sessionId) {
                    if (
                      verifiedCourse &&
                      verifiedCourse.length === 0 &&
                      index > 2 &&
                      videoDetails.price !== 0 &&
                      currentUser?.role === "student"
                    ) {
                      return (
                        <Link
                          href={`#`}
                          key={index}
                          className="pointer-events-none opacity-50"
                        >
                          <div className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all">
                            <p>{lesson.title}</p>
                          </div>
                        </Link>
                      );
                    } else if (
                      currentUser?.role === "admin" ||
                      currentUser?.role === "adminTeacher"
                    ) {
                      return (
                        <Link
                          href={`/hub/videos/${params.id}/${lesson.id}`}
                          key={index}
                        >
                          <div className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all">
                            <p>{lesson.title}</p>
                          </div>
                        </Link>
                      );
                    } else {
                      <Link
                        href={`/hub/videos/${params.id}/${lesson.id}`}
                        key={index}
                      >
                        <div className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all">
                          <p>{lesson.title}</p>
                        </div>
                      </Link>;
                    }
                  }
                })}
            </div>
          </section>
        </div>
      </div>
    );
  }
};

export default SingleSession;
