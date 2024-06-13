"use client";
import { slides } from "@/utils/fakeData";
import { CardMedia, Chip } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Blogs, Video } from "@/utils/types";
import { usePathname } from "next/navigation";

const OtherBlogs = ({
  videos,
  articles,
}: {
  videos?: Video[];
  articles?: Blogs[];
}) => {
  const [itemsToShow, setItemsToShow] = useState(3);
  const pathName = usePathname();
  console.log(pathName);
  const handleLoadMore = () => {
    setItemsToShow(itemsToShow + 3);
  };
  return (
    <div className="text-center">
      {pathName === "/hub/blogs" && articles && articles?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles?.slice(0, itemsToShow).map((article, index) => (
            <Link href={`/hub/blogs/${article.id}`}>
              <Card
                className="transition hover:shadow-xl bg-extraBg text-lightPrime"
                key={index}
              >
                {article.image && (
                  <CardMedia sx={{ height: 140 }} image={article.image} />
                )}
                <CardContent className="flex flex-col mt-4 items-center md:items-start gap-4">
                  <div className="flex items-center gap-5">
                    <Chip
                      sx={{ color: "#D0D7E1" }}
                      variant="outlined"
                      label={article.categories}
                    />
                  </div>

                  <p className="h3 md:text-start text-center">
                    {article.title}
                  </p>

                  <p className="text-sm flex gap-2 justify-center">
                    {article.author && (
                      <span>{`${article.author.fName} ${article.author.lName}`}</span>
                    )}
                    &bull;
                    <span>{`${article.createdAt.getFullYear()} / ${article.createdAt.getMonth()} / ${article.createdAt.getDay()}`}</span>
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        pathName === "/hub/blogs" &&
        articles?.length === 0 && <h4>There is no article to show</h4>
      )}
      {pathName === "/hub/videos" && videos && videos?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {videos?.slice(0, itemsToShow).map((video, index) => (
            <Link href={`/hub/videos/${video.id}`}>
              <Card
                className="transition hover:shadow-xl bg-extraBg text-lightPrime"
                key={index}
              >
                <CardMedia sx={{ height: 140 }} image="/article.jpg" />
                <CardContent className="flex flex-col mt-4 items-center md:items-start gap-4">
                  <div className="flex items-center gap-5">
                    <Chip
                      sx={{ color: "#D0D7E1" }}
                      variant="outlined"
                      label={video.playlist}
                    />
                  </div>

                  <p className="h3 md:text-start text-center">{video.title}</p>

                  <p className="text-sm flex gap-2 justify-center">
                    {video.creator && (
                      <span>{`${video.creator.fName} ${video.creator.lName}`}</span>
                    )}
                    &bull;
                    <span>{`${video.createDate.getFullYear()} / ${video.createDate.getMonth()} / ${video.createDate.getDay()}`}</span>
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        pathName === "/hub/videos" &&
        videos?.length === 0 && <h4>There is no video to show</h4>
      )}
      {videos && videos?.length > itemsToShow && (
        <Button
          className=" my-5 px-4 py-2 rounded-md  bg-slate-900/90 text-[#c6d9e6] hover:bg-[#c6d9e6] hover:ring-1 hover:ring-slate-900/90 hover:text-slate-900/90"
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
      {articles && articles?.length > itemsToShow && (
        <Button
          className=" my-5 px-4 py-2 rounded-md  bg-slate-900/90 text-[#c6d9e6] hover:bg-[#c6d9e6] hover:ring-1 hover:ring-slate-900/90 hover:text-slate-900/90"
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default OtherBlogs;
