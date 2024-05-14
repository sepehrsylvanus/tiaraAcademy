"use client";
import { Input } from "@/components/ui/input";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { howTooStudy, videoTags } from "@/constants";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { User, Video } from "@/utils/types";
import axios from "axios";
import { getSingleUser } from "@/actions/userActions";
import { getToken } from "@/actions/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "react-toastify";
import { Chip } from "@mui/material";

interface videoTag {
  name: string;
  link: string;
}

const chunkedTags: videoTag[][] = [];

for (let i = 0; i < videoTags.length; i += 2) {
  chunkedTags.push(videoTags.slice(i, i + 2));
}

const Videos = () => {
  const [searchVal, setSearchVal] = useState<string>();
  const [videos, setVideos] = useState<Video[]>();
  const [currentUser, setCurrentUser] = useState<User>();
  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken()!;
      const currentUser = await getSingleUser(token?.value);
      if (currentUser) {
        setCurrentUser(currentUser);
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    console.log(videos);
  }, [videos]);

  useEffect(() => {}, [currentUser]);
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  useEffect(() => {
    axios
      .get("/api/videos", {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      .then((res) => {
        setVideos(res.data);
      })
      .catch();
  }, []);

  return (
    <div className="flex flex-col px-4 md:pl-[4em]">
      <div>
        <div className="flex justify-between items-center gap-4 mt-4 pt-[3em]">
          <h1 className="h1 ">Videos</h1>
          <Input
            type="text"
            placeholder="Search name..."
            className=" rounded-3xl w-1/2"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchVal(e.target.value)
            }
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 grid-flow-dense mt-2"></div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {videos && currentUser ? (
            videos.map((video) => (
              <Card className="p-4 bg-extraBg text-lightPrime" key={video.id}>
                <CardContent className="p-0">
                  <Link href={`/hub/videos/${video.id}`}>
                    <div className=" relative w-full h-[200px]">
                      <Image
                        src={"/article.jpg"}
                        alt="sample video"
                        className=" absolute object-cover rounded-md brightness-50"
                        fill
                      />
                      <PlayArrowIcon
                        sx={{
                          position: "absolute",
                          color: "white",
                          scale: "2",
                          top: "60%",
                          left: "52%",
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </div>
                  </Link>
                  {(currentUser?.role.includes("admin") ||
                    currentUser?.role.includes("adminTeacher")) && (
                    <p className="p-4">
                      id:{" "}
                      <span
                        className=" text-lg  md:text-base md:hover:scale-125 transition cursor-pointer"
                        onClick={() => copyToClipboard(video.id)}
                      >
                        {video.id}
                      </span>
                    </p>
                  )}
                  {video.playlist.map((eachPlaylist) => (
                    <Chip
                      label={eachPlaylist}
                      sx={{ color: "#072d44", backgroundColor: "#D0D7E1" }}
                    />
                  ))}
                </CardContent>
                <CardFooter className="flex items-center p-4 font-semibold">
                  {video.title}
                </CardFooter>
              </Card>
            ))
          ) : (
            <>
              <Skeleton className="w-full h-[366px] rounded-md" />
              <Skeleton className="w-full h-[366px] rounded-md" />
              <Skeleton className="w-full h-[366px] rounded-md" />
              <Skeleton className="w-full h-[366px] rounded-md" />
              <Skeleton className="w-full h-[366px] rounded-md" />
              <Skeleton className="w-full h-[366px] rounded-md" />
              <Skeleton className="w-full h-[366px] rounded-md" />
              <Skeleton className="w-full h-[366px] rounded-md" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Videos;
