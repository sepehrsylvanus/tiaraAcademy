"use client";
import { slides } from "@/utils/fakeData";
import { CardMedia, Chip } from "@mui/material";
import { Card, CardContent } from "@/components/ui/card";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";

const OtherBlogs = () => {
  const [itemsToShow, setItemsToShow] = useState(3);

  const handleLoadMore = () => {
    setItemsToShow(itemsToShow + 3); // Increase by 3 items each time
  };
  return (
    <div className="text-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {slides.slice(0, itemsToShow).map((slide, index) => (
          <Link href={"/blogs/26458973"}>
            <Card
              className="transition hover:shadow-xl bg-extraBg text-lightPrime"
              key={index}
            >
              <CardMedia sx={{ height: 140 }} image="/article.jpg" />
              <CardContent className="flex flex-col mt-4 items-center md:items-start gap-4">
                <div className="flex items-center gap-5">
                  {slide.tags.map((tag, index) => (
                    <Chip
                      sx={{ color: "#D0D7E1" }}
                      variant="outlined"
                      key={index}
                      label={tag}
                    />
                  ))}
                </div>

                <p className="h3 md:text-start text-center">{slide.title}</p>

                <p className="text-sm flex gap-2 justify-center">
                  <span>{slide.author}</span>&bull;
                  <span>{slide.createDate}</span>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {slides.length > itemsToShow && (
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
