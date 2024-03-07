"use client";
import { slides } from "@/utils/fakeData";
import { Card, CardContent, CardMedia, Chip } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

const OtherBlogs = () => {
  const [itemsToShow, setItemsToShow] = useState(3);

  const handleLoadMore = () => {
    setItemsToShow(itemsToShow + 3); // Increase by 3 items each time
  };
  return (
    <div className="text-center">
      <div className="grid grid-cols-3 gap-5">
        {slides.slice(0, itemsToShow).map((slide, index) => (
          <Link href={"/blogs/26458973"}>
            <Card className="transition hover:shadow-xl" key={index}>
              <CardMedia sx={{ height: 140 }} image="/article.jpg" />
              <CardContent className="flex flex-col gap-4">
                <div className="flex items-center gap-5">
                  {slide.tags.map((tag, index) => (
                    <Chip variant="outlined" key={index} label={tag} />
                  ))}
                </div>

                <p className="h3 text-start">{slide.title}</p>

                <p className="text-sm flex gap-2">
                  <span>{slide.author}</span>&bull;
                  <span>{slide.createDate}</span>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {slides.length > itemsToShow && (
        <button
          className=" my-5 px-4 py-2 rounded-md  bg-blue-600 text-white transition hover:bg-blue-800"
          onClick={handleLoadMore}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default OtherBlogs;
