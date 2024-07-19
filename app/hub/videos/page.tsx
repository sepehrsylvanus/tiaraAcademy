"use client";
import React from "react";
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

const Videos = () => {
  const { data: playlists } = useGetPlaylists();
  const { data: videos, isLoading: videoLoad } = useGetVideos();
  const trendVideos = videos?.filter((video: Video) => video.trend);
  return (
    <div className={styles.container}>
      <div className="header flex flex-col items-center md:items-center md:justify-between text-center gap-4">
        <div className="grid grid-cols-2 gap-y-4 lg:flex lg:gap-4 ">
          {playlists?.map((playlist: Playlist) => {
            console.log(playlist.title);

            return (
              <Link href={`/hub/videos/playlist/${playlist.value}`}>
                <Chip
                  label={playlist.title}
                  className=" hover:bg-extraText hover:text-white transition"
                />
              </Link>
            );
          })}
        </div>
        <h3 className="h1 text-4xl ">Trending Videos</h3>
        <p className=" w-fit md:w-[30rem]">
          Your Daily Dose of Viral Sensations
        </p>
      </div>

      <Divider sx={{ border: "1px solid #b2bec3" }} />
      {trendVideos && trendVideos?.length > 0 ? (
        <div className="trending grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <Link href={`/hub/videos/${trendVideos[length - 1].id}`}>
              <Card className="h-full  transition hover:shadow-2xl ">
                <CardMedia
                  sx={{ height: 200 }}
                  image="/article.jpg"
                  title="article"
                />
                <CardContent
                  sx={{
                    backgroundColor: "#1C294B",
                    color: "white",
                  }}
                  className=" flex flex-col gap-7 justify-between"
                >
                  <Chip
                    sx={{ color: "white" }}
                    label={trendVideos[length - 1].playlist}
                    variant="outlined"
                    className=" w-fit"
                  />
                  <div className="flex flex-col gap-4">
                    <h4 className=" font-bold text-2xl">
                      {trendVideos[length - 1].title}
                    </h4>
                    <p className="text-sm">
                      Deciphering the Code of Communication: The Role of Grammar
                      in Enhancing Clarity and Cohesion in Language
                    </p>
                  </div>
                  <p className="text-xs flex gap-2">
                    <span>{`${trendVideos[length - 1].creator.fName} ${
                      trendVideos[length - 1].creator.lName
                    }`}</span>
                    •
                    <span>{`${trendVideos[
                      length - 1
                    ].createDate.getFullYear()} / ${trendVideos[
                      length - 1
                    ].createDate.getMonth()} / ${trendVideos[
                      length - 1
                    ].createDate.getDay()}`}</span>
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
          <div className=" grid grid-rows-3 gap-5">
            <div className="eacHeadBlog flex flex-col md:flex-row gap-4 transition hover:shadow-xl hover:-translate-y-1 items-center">
              <Image
                src={"/article.jpg"}
                alt="article"
                width={200}
                height={90}
                className=" rounded-lg"
              />
              <div className="flex flex-col justify-between gap-4 md:gap-0 items-center md:items-start">
                <Chip
                  variant="outlined"
                  label={trendVideos[length - 2].playlist}
                  className=" w-fit"
                />
                <div>
                  <h4 className=" mb-2 font-extrabold text-center md:text-start">
                    {trendVideos[length - 2].title}
                  </h4>
                  <p className="text-xs flex gap-2 justify-center md:justify-start">
                    <span>{`${trendVideos[length - 2].creator.fName} ${
                      trendVideos[length - 2].creator.lName
                    }`}</span>
                    •
                    <span>{`${trendVideos[
                      length - 2
                    ].createDate.getFullYear()} / ${trendVideos[
                      length - 2
                    ].createDate.getMonth()} / ${trendVideos[
                      length - 2
                    ].createDate.getDay()}`}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="eacHeadBlog flex flex-col md:flex-row gap-4 transition hover:shadow-xl hover:-translate-y-1 items-center">
              <Image
                src={"/article.jpg"}
                alt="article"
                width={200}
                height={90}
                className=" rounded-lg"
              />
              <div className="flex flex-col justify-between gap-4 md:gap-0 items-center md:items-start">
                <Chip
                  variant="outlined"
                  label={trendVideos[length - 3].playlist}
                  className=" w-fit"
                />
                <div>
                  <h4 className=" mb-2 font-extrabold text-center md:text-start">
                    {trendVideos[length - 3].title}
                  </h4>
                  <p className="text-xs flex gap-2 justify-center md:justify-start">
                    <span>{`${trendVideos[length - 1].creator.fName} ${
                      trendVideos[length - 3].creator.lName
                    }`}</span>
                    •{" "}
                    <span>{`${trendVideos[
                      length - 3
                    ].createDate.getFullYear()} / ${trendVideos[
                      length - 3
                    ].createDate.getMonth()} / ${trendVideos[
                      length - 3
                    ].createDate.getDay()}`}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="eacHeadBlog flex flex-col md:flex-row gap-4 transition hover:shadow-xl hover:-translate-y-1 items-center">
              <Image
                src={"/article.jpg"}
                alt="article"
                width={200}
                height={90}
                className=" rounded-lg"
              />
              <div className="flex flex-col justify-between gap-4 md:gap-0 items-center md:items-start">
                <Chip
                  variant="outlined"
                  label={trendVideos[length - 4].playlist}
                  className=" w-fit"
                />
                <div>
                  <h4 className=" mb-2 font-extrabold text-center md:text-start">
                    {trendVideos[length - 4].title}
                  </h4>
                  <p className="text-xs flex gap-2 justify-center md:justify-start">
                    <span>{`${trendVideos[length - 4].creator.fName} ${
                      trendVideos[length - 4].creator.lName
                    }`}</span>
                    •
                    <span>{`${trendVideos[
                      length - 4
                    ].createDate.getFullYear()} / ${trendVideos[
                      length - 4
                    ].createDate.getMonth()} / ${trendVideos[
                      length - 4
                    ].createDate.getDay()}`}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <h4>There is no trending videos</h4>
        </div>
      )}

      <div>
        <h3 className="h1 text-4xl mb-3 text-center">All videos</h3>
        <Divider sx={{ border: "1px solid #b2bec3", margin: "1em 0" }} />
      </div>

      {videos ? (
        <OtherBlogs videos={videos} />
      ) : (
        <div className="w-full flex justify-center">
          <CircularProgress sx={{ color: "#072d44" }} />
        </div>
      )}
    </div>
  );
};

export default Videos;
