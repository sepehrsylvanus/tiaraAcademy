"use client";
import React, { useEffect, useState } from "react";
import styles from "../blogs/blogs.module.css";

import OtherBlogs from "@/components/otherBlogs/OtherBlogs";
import Link from "next/link";
import GrammarCarousel from "@/components/carousel/GrammarCarousel";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useGetPlaylists } from "@/hooks/usePlayList";
import { Playlist, Video } from "@/utils/types";
import { useGetVideos } from "@/hooks/useVideos";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { testVideoUpload } from "@/actions/videos/videos.action";
import { Button } from "@/components/ui/button";
const Videos = () => {
  const [video, setVideo] = useState<File>();
  useEffect(() => {
    console.log(video);
  }, [video]);

  const handleSubmit = async () => {
    console.log("here");
    const data = new FormData();
    data.set("video", video!);
    const testUpload = await testVideoUpload(data);
    console.log(testUpload);
  };

  const { data: playlists } = useGetPlaylists();
  const { data: videos, isLoading: videoLoad } = useGetVideos();
  console.log(videos);
  const t = useTranslations("Videos");
  return (
    <div>
      <div className="flex justify-between container items-center">
        <h1>Video Courses</h1>
        <div>
          <Input placeholder="Course name..." />
          <Input placeholder="Category..." />
        </div>
      </div>
      <Separator className="my-6" />
      <div>
        <input type="file" onChange={(e) => setVideo(e.target.files![0])} />
        {/* <video /> */}
        <Button onClick={handleSubmit}>Send</Button>
      </div>
    </div>
  );
};

export default Videos;
