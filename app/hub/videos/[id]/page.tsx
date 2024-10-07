"use client";
import { Button } from "@/components/ui/button";
import { Axios } from "@/utils/axiosIn";
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
import { useGetCourseVideosDetails } from "@/hooks/useVideos";
type SingleVideoProps = {
  params: {
    id: string;
  };
};
const SingleVideo = ({ params }: SingleVideoProps) => {
  const [openComment, setOpenComment] = useState(false);
  const { data: videoDetails, isLoading: videoDetailsLoading } =
    useGetCourseVideosDetails(params.id);
  console.log(videoDetails?.Comment);

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
              className="flex justify-between mt-4 flex-col-reverse md:flex-row items-center"
            >
              <Button className="w-full md:w-auto mt-2 md:mt-0">Buy</Button>
              <Link href={"/hub/videos/3/edit"} className="w-full md:w-auto">
                <Button className="w-full md:w-auto mt-2 md:mt-0 flex gap-2">
                  <EditIcon /> Manage this course
                </Button>
              </Link>
              <p className="font-bold ">
                <span className="mr-1">{videoDetails?.price}</span>Toman
              </p>
            </div>
          </div>

          <div
            id="coursePrevVideo"
            className="order-1
        "
          >
            <ReactPlayer
              width={"100%"}
              height={"auto"}
              controls
              url={
                "https://infallible-zhukovsky-7f1f128am.storage.iran.liara.space/2024-09-03%2015-50-41.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=342080d4-c2d1-45a3-a670-00ed1438736c%2F20241001%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241001T134310Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=fc19a6da63646068eb4a1f4aff95a318ccf4a58c0bf5a9a013c86373c074baa1"
              }
            />
          </div>
        </section>

        <section
          id="features"
          className="grid
       grid-cols-1 md:grid-cols-3 gap-3 justify-items-center mt-6"
        >
          <div className=" rounded-md w-full text-center bg-cardBg text-white">
            <FormatListNumberedIcon className="text-lightText " />
            <p className="text-extraText">Video count</p>
            <p className="text-lightText">
              {videoDetails?.videoCourseSession?.length ?? 0}
            </p>
          </div>
          <div className=" rounded-md w-full text-center bg-cardBg text-white">
            <UpdateIcon className="text-lightText " />
            <p className="text-extraText">The last update</p>
            <p className="text-lightText">
              {videoDetails?.updatedAt.toLocaleDateString()}
            </p>
          </div>
          <div className=" rounded-md md:w-full text-center bg-cardBg text-white col-span-2 md:col-span-1 w-full">
            <WorkIcon className="text-lightText " />
            <p className="text-extraText">Prerequisities</p>
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
            <Button variant={"outline"}>Show profile</Button>
          </section>

          <div className="md:w-8/12">
            <section
              id="description"
              className="bg-cardBg text-lightText p-4  mt-2 rounded-md 
      "
            >
              <h2 className=" text-center mt-4">Description</h2>
              <p className="text-justify mt-2 ">{videoDetails?.explenation}</p>
            </section>
            <section
              className="bg-cardBg text-lightText p-4  mt-2 rounded-md 
      "
            >
              <h2>
                <SchoolIcon /> Lessons
              </h2>
              <div className="flex flex-col gap-2 mt-2">
                {videoDetails?.videoCourseSession.map((lesson, index) => (
                  <Link href={`/hub/videos/${params.id}/${lesson.id}`}>
                    <div
                      key={index}
                      className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all"
                    >
                      <p>{lesson.title}</p>
                    </div>
                  </Link>
                ))}
                {videoDetails?.videoCourseSession.length === 0 && (
                  <p>There is no session yet</p>
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
                  Comments
                </h2>
                <Button onClick={() => setOpenComment(true)}>
                  Add a new comment
                </Button>
              </div>
              <div className={`animate-fadeIn ${openComment ? "" : "hidden"}`}>
                <AddComment setOpenComment={setOpenComment} />
              </div>
              <div className="flex flex-col gap-3 mt-4">
                {videoDetails?.Comment.map((comment, index) => (
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

                    {comment.CommentAnswer && (
                      <div className="rounded-md p-4 bg-white mt-4">
                        <div className="flex gap-3 items-center">
                          <Avatar>
                            <AvatarImage
                              src={`${
                                comment.CommentAnswer[0].answerCreator.image ??
                                "https://github.com/shadcn.png"
                              }`}
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
                {videoDetails?.Comment.length === 0 && (
                  <p>There is no comment yet</p>
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
