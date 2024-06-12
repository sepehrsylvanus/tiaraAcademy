"use client";
import React from "react";
import styles from "../blogs/blogs.module.css";

import OtherBlogs from "@/components/otherBlogs/OtherBlogs";
import Link from "next/link";
import GrammarCarousel from "@/components/carousel/GrammarCarousel";
import Image from "next/image";
import { Card, CardContent, CardMedia, Chip, Divider } from "@mui/material";
import { useGetPlaylists } from "@/hooks/usePlayList";
import { Playlist } from "@/utils/types";

const Videos = () => {
  const { data: playlists } = useGetPlaylists();
  return (
    <div className={styles.container}>
      <div className="header flex flex-col items-center md:items-center md:justify-between text-center gap-4">
        <h3 className="h1 text-4xl ">Trending Videos</h3>
        <p className=" w-fit md:w-[30rem]">
          Your Daily Dose of Viral Sensations
        </p>
      </div>
      <div className="flex gap-4">
        {playlists?.map((playlist: Playlist) => (
          <Link href={`/hub/videos/playlist/${playlist.value}`}>
            <Chip
              label={playlist.title}
              className=" hover:bg-extraText hover:text-white transition"
            />
          </Link>
        ))}
      </div>
      <Divider sx={{ border: "1px solid #b2bec3" }} />
      <div className="trending grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <Link href={"/hub/blogs/123465"}>
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
                  label="Grammer"
                  variant="outlined"
                  className=" w-fit"
                />
                <div className="flex flex-col gap-4">
                  <h4 className=" font-bold text-2xl">
                    Unraveling the Mysteries of Grammar: A Deep Dive into
                    Language Structure
                  </h4>
                  <p className="text-sm">
                    Deciphering the Code of Communication: The Role of Grammar
                    in Enhancing Clarity and Cohesion in Language
                  </p>
                </div>
                <p className="text-xs flex gap-2">
                  <span>Khashayar Mohammadi</span>•<span>03 March 2020</span>
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
              <Chip variant="outlined" label="Vocabulary" className=" w-fit" />
              <div>
                <h4 className=" mb-2 font-extrabold text-center md:text-start">
                  Mastering the Lexicon: Unlocking the Power of Words for
                  Effective Communication and Learning
                </h4>
                <p className="text-xs flex gap-2 justify-center md:justify-start">
                  <span>Khashayar Mohammadi</span>•<span>03 March 2020</span>
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
              <Chip variant="outlined" label="Vocabulary" className=" w-fit" />
              <div>
                <h4 className=" mb-2 font-extrabold text-center md:text-start">
                  Mastering the Lexicon: Unlocking the Power of Words for
                  Effective Communication and Learning
                </h4>
                <p className="text-xs flex gap-2 justify-center md:justify-start">
                  <span>Khashayar Mohammadi</span>•<span>03 March 2020</span>
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
              <Chip variant="outlined" label="Vocabulary" className=" w-fit" />
              <div>
                <h4 className=" mb-2 font-extrabold text-center md:text-start">
                  Mastering the Lexicon: Unlocking the Power of Words for
                  Effective Communication and Learning
                </h4>
                <p className="text-xs flex gap-2 justify-center md:justify-start">
                  <span>Khashayar Mohammadi</span>•<span>03 March 2020</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grammarCarousel">
        <GrammarCarousel />
      </div>

      <div>
        <h3 className="h1 text-4xl mb-3">Grammar Article</h3>
        <Divider sx={{ border: "1px solid #b2bec3", margin: "1em 0" }} />
      </div>

      <OtherBlogs />
    </div>
  );
};

export default Videos;
