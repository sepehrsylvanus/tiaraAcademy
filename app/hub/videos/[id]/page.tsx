"use client";
import { Axios } from "@/utils/axiosIn";
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
    Axios.get(`/videos/${params.id}`)
      .then((res) => setVideo(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="grid place-content-center h-screen w-screen">
      <h1 className="h1 text-center w-screen mx-auto  lg:mb-6">
        {video?.title}
      </h1>
      {video && (
        <div className="  w-screen md:w-[70%] mx-auto md:scale-100">
          {video.videoLink && (
            <ReactPlayer
              url={video.videoLink}
              controls
              width={"100%"}
              height={500}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SingleVideo;
