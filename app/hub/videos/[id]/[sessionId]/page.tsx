"use client";
import AddComment from "@/components/addComment/AddComment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { javascriptLessons, sampleComments } from "@/constants";
import { Separator } from "@radix-ui/react-separator";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import ForumIcon from "@mui/icons-material/Forum";
import SchoolIcon from "@mui/icons-material/School";
import Link from "next/link";

const SingleSession = () => {
  const [openComment, setOpenComment] = useState(false);
  return (
    <div className="mt-[4em] md:mt-0 px-4 pb-[3em]">
      <div className="w-full md:w-[80%] mx-auto" id="sessionVideoContainer">
        <ReactPlayer
          width={"100%"}
          height={"auto"}
          controls
          url={
            "https://infallible-zhukovsky-7f1f128am.storage.iran.liara.space/2024-09-03%2015-50-41.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=342080d4-c2d1-45a3-a670-00ed1438736c%2F20241001%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241001T134310Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=fc19a6da63646068eb4a1f4aff95a318ccf4a58c0bf5a9a013c86373c074baa1"
          }
        />
      </div>
      <div
        id="sessionOptions"
        className="grid grid-cols-1 md:grid-cols-4 md:w-[80%] mx-auto mt-4 gap-4"
      >
        <div className="col-span-3">
          <section className="bg-cardBg rounded-md p-4">
            <h1>Counrse title</h1>
            <h3>Session title</h3>
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
              {sampleComments.map((comment, index) => (
                <div className="p-5 rounded-md bg-slate-200">
                  <div className="flex gap-3 items-center">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <p>{comment.name} </p>
                      <p className="opacity-50">{comment.date}</p>
                    </div>
                  </div>
                  <Separator className="my-2" />
                  <p>{comment.comment}</p>

                  <div className="rounded-md p-4 bg-white mt-4">
                    <div className="flex gap-3 items-center">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p>{comment.answer.name} </p>
                        <p className="opacity-50">{comment.answer.date}</p>
                      </div>
                    </div>
                    <Separator className="my-2" />
                    {comment.answer.response}
                  </div>
                </div>
              ))}
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
            {javascriptLessons.map((lesson, index) => (
              <Link href={`/hub/videos/1/23`}>
                <div
                  key={index}
                  className="bg-white p-4 rounded-md hover:bg-slate-200 transition-all"
                >
                  <p>{lesson}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SingleSession;
