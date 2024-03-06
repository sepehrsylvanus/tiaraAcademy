import React from "react";
import styles from "./blogs.module.css";
import { Card, CardContent, CardMedia, Chip, Divider } from "@mui/material";
import Image from "next/image";
import GrammarCarousel from "@/components/carousel/GrammarCarousel";

import OtherBlogs from "@/components/otherBlogs/OtherBlogs";
const Blogs = () => {
  return (
    <div className={styles.container}>
      <div className="header flex items-center justify-between">
        <h3 className="h1 text-4xl ">Trending Articles</h3>
        <p className=" w-[30rem]">
          Discover Our Curated Collection of the Most Trending and Insightful
          Articles: From Educational Insights to Practical Tips
        </p>
      </div>
      <Divider sx={{ border: "1px solid #b2bec3" }} />
      <div className="trending flex gap-5">
        <div className=" flex-1">
          <Card>
            <CardMedia
              sx={{ height: 200 }}
              image="/article.jpg"
              title="article"
            />
            <CardContent
              sx={{ backgroundColor: "#1C294B", color: "white" }}
              className=" flex flex-col gap-7"
            >
              <Chip
                sx={{ color: "white" }}
                label="Grammer"
                variant="outlined"
                className=" w-fit"
              />
              <h4 className=" font-bold text-2xl">
                Unraveling the Mysteries of Grammar: A Deep Dive into Language
                Structure
              </h4>
              <p className="text-sm">
                Deciphering the Code of Communication: The Role of Grammar in
                Enhancing Clarity and Cohesion in Language
              </p>
              <p className="text-xs flex gap-2">
                <span>Khashayar Mohammadi</span>•<span>03 March 2020</span>
              </p>
            </CardContent>
          </Card>
        </div>
        <div className=" flex-1  grid grid-rows-3 gap-5">
          <div className="eacHeadBlog flex gap-4">
            <Image
              src={"/article.jpg"}
              alt="article"
              width={200}
              height={90}
              className=" rounded-lg"
            />
            <div className="flex flex-col justify-between">
              <Chip variant="outlined" label="Vocabulary" className=" w-fit" />
              <div>
                <h4 className=" mb-2 font-extrabold">
                  Mastering the Lexicon: Unlocking the Power of Words for
                  Effective Communication and Learning
                </h4>
                <p className="text-xs flex gap-2">
                  <span>Khashayar Mohammadi</span>•<span>03 March 2020</span>
                </p>
              </div>
            </div>
          </div>
          <div className="eacHeadBlog flex gap-4">
            <Image
              src={"/article.jpg"}
              alt="article"
              width={200}
              height={90}
              className=" rounded-lg"
            />
            <div className="flex flex-col justify-between">
              <Chip variant="outlined" label="Vocabulary" className=" w-fit" />
              <div>
                <h4 className=" mb-2 font-extrabold">
                  Mastering the Lexicon: Unlocking the Power of Words for
                  Effective Communication and Learning
                </h4>
                <p className="text-xs flex gap-2">
                  <span>Khashayar Mohammadi</span>•<span>03 March 2020</span>
                </p>
              </div>
            </div>
          </div>
          <div className="eacHeadBlog flex gap-4">
            <Image
              src={"/article.jpg"}
              alt="article"
              width={200}
              height={90}
              className=" rounded-lg"
            />
            <div className="flex flex-col justify-between">
              <Chip variant="outlined" label="Vocabulary" className=" w-fit" />
              <div>
                <h4 className=" mb-2 font-extrabold">
                  Mastering the Lexicon: Unlocking the Power of Words for
                  Effective Communication and Learning
                </h4>
                <p className="text-xs flex gap-2">
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

export default Blogs;
