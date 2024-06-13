"use client";
import { getToken, getVideos } from "@/actions/actions";

import { Card, CardContent, Chip, Skeleton } from "@mui/material";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { getSingleUser } from "@/actions/userActions";
import { toast } from "react-toastify";
import { Playlist, User, Video } from "@/utils/types";
import { userGetPlaylist } from "@/hooks/usePlayList";
import styles from "@/app/hub/teachers/teacher.module.css";
import { PlaylistUsers } from "@prisma/client";
type ParamsProps = {
  params: {
    playlistName: string;
  };
};
const PlayListPage = async ({ params }: ParamsProps) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [videos, setVideos] = useState<Video[]>();
  // const [thisPlaylist, setThisPlaylist] = useState<PlaylistUsers[]>();
  // const [isLoading, setIsLoading] = useState();
  const { data: thisPlaylist, isLoading } = userGetPlaylist(
    params.playlistName.charAt(0).toUpperCase() + params.playlistName.slice(1)
  );
  console.log(thisPlaylist);
  useEffect(() => {
    const renderPage = async () => {
      const token = await getToken()!;
      const currentUser = (await getSingleUser(token?.value)) as User;
      const videos = await getVideos();
      setCurrentUser(currentUser);
      setVideos(videos);
      // const { data: thisPlaylist, isLoading } = userGetPlaylist(
      //   params.playlistName.charAt(0).toUpperCase() +
      //     params.playlistName.slice(1)
      // );
      // console.log(thisPlaylist);
      // setThisPlaylist(thisPlaylist);
    };
    renderPage();
  }, []);

  const finalVideos = videos?.filter((video) =>
    video.playlist.includes(params.playlistName)
  );

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="lg:pl-[3.5em]">
      <h1 className="h1 text-center">{params.playlistName.toUpperCase()}</h1>
      {finalVideos && finalVideos?.length === 0 && (
        <h2 className="text-center mt-4">
          In order to see after part 3 you can{" "}
          <Link href={"#"} className="text-extraText underline">
            Sign in
          </Link>{" "}
          in this class
        </h2>
      )}
      <div
        className={`mt-8 ${
          finalVideos && finalVideos?.length > 0
            ? "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : ""
        }`}
      >
        {!isLoading &&
          videos &&
          finalVideos?.map((video, index) => (
            <Card className="p-4 bg-extraBg text-lightPrime" key={video.id}>
              <CardContent className="p-0">
                <Link
                  className={`${
                    index > 2 &&
                    thisPlaylist?.length === 0 &&
                    currentUser?.role === "student" &&
                    currentUser?.role.includes("teacher") &&
                    "pointer-events-none opacity-50"
                  }`}
                  href={
                    index > 3 &&
                    thisPlaylist?.length === 0 &&
                    currentUser?.role === "student" &&
                    currentUser?.role.includes("teacher")
                      ? "#"
                      : `/hub/videos/${video.id}`
                  }
                >
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

                <Chip
                  label={video.playlist}
                  sx={{
                    color: "#072d44",
                    backgroundColor: "#D0D7E1",
                    margin: "1em 0",
                  }}
                />
              </CardContent>
              <CardFooter className="flex flex-col  items-start p-4 pl-0 font-semibold">
                {video.title}
                {(currentUser?.role.includes("admin") ||
                  currentUser?.role.includes("adminTeacher")) && (
                  <p
                    onClick={() => copyToClipboard(video.id)}
                    className=" font-normal hover:scale-105 transition cursor-pointer"
                  >
                    {video.id}
                  </p>
                )}
              </CardFooter>
            </Card>
          ))}
        {finalVideos?.length === 0 && (
          <h1 className="w-full text-center">
            There is no videos in this playlist
          </h1>
        )}
      </div>
    </div>
  );
};

export default PlayListPage;
