"use client";
import { Video as VideoType } from "@/utils/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Video from "next-video";
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
    console.log(video?.videoLink);
  }, [video]);

  return (
    <div className="w-[500px] h-[500px] pl-[5em]">
      {video && (
        <Video url={video?.videoLink} width="640" height="360" controls />
      )}
    </div>
  );
};

export default SingleVideo;
