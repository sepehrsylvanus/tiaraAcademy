import { getToken, getVideos } from "@/actions/actions";

import { Card, CardContent, Chip } from "@mui/material";

import Image from "next/image";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { getSingleUser } from "@/actions/userActions";
import { toast } from "react-toastify";

type ParamsProps = {
  params: {
    playlistName: string;
  };
};
const PlayListPage = async ({ params }: ParamsProps) => {
  const videos = await getVideos();
  const finalVideos = videos.filter((video) =>
    video.playlist.includes(params.playlistName)
  );

  console.log(finalVideos);

  console.log(params);
  return (
    <div className="lg:pl-[3.5em]">
      <h1 className="h1 text-center">{params.playlistName.toUpperCase()}</h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {videos &&
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

                {video.playlist.map((eachPlaylist) => (
                  <Chip
                    label={eachPlaylist}
                    sx={{
                      color: "#072d44",
                      backgroundColor: "#D0D7E1",
                      margin: "1em 0",
                    }}
                  />
                ))}
              </CardContent>
              <CardFooter className="flex items-center p-4 pl-0 font-semibold">
                {video.title}
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default PlayListPage;
