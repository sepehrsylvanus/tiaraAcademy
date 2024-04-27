"use client";
import { Video as VideoType } from "@/utils/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

type SingleVideoProps = {
  params: {
    id: string;
  };
};
const SingleVideo = ({ params }: SingleVideoProps) => {
  const [video, setVideo] = useState<VideoType>();
  useEffect(() => {
    axios
      .get(`/api/videos/${params.id}`)
      .then((res) => setVideo(res.data))
      .catch((e) => console.log(e));
  }, []);
  useEffect(() => {
    console.log(video?.title);
  }, [video]);

  return (
    <div className="grid place-content-center h-screen w-screen">
      <h1 className="h1 text-center lg:mb-6">{video?.title}</h1>
      {video && (
        <div className=" scale-[.45] md:scale-100">
          <ReactPlayer
            url={video.videoLink}
            controls
            width={900}
            height={500}
          />
        </div>
      )}
    </div>
  );
};

export default SingleVideo;
