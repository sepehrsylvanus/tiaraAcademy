import { Input } from "@/components/ui/input";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { howTooStudy, videoTags } from "@/constants";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CustomHamburger from "@/components/hamburger/CustomHamburger";

interface videoTag {
  name: string;
  link: string;
}

const chunkedTags: videoTag[][] = [];

for (let i = 0; i < videoTags.length; i += 2) {
  chunkedTags.push(videoTags.slice(i, i + 2));
}
console.log(chunkedTags);

const Videos = () => {
  return (
    <div className="flex flex-col px-4 md:pl-[4em]">
      <div className="ml-auto z-10 fixed top-0 right-0 md:hidden bg-white  rounded-md m-2">
        <CustomHamburger navbar={false} sidebar={true} />
      </div>
      <div>
        <div className="flex justify-between items-center gap-4 mt-4 pt-[3em]">
          <h1 className="h1 ">Videos</h1>
          <Input
            type="text"
            placeholder="Search name..."
            className=" rounded-3xl w-1/2"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 grid-flow-dense mt-2">
          {videoTags.map((tag) => (
            <Badge className="w-fit bg-lightText text-lightPrime cursor-pointer">
              {tag.name}
            </Badge>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {howTooStudy.map((eachCard, index) => (
            <Card className="p-4 bg-extraBg text-lightPrime" key={index}>
              <CardContent className="p-0">
                <div className=" relative w-full h-[200px]">
                  <Image
                    src={"/article.jpg"}
                    alt="sample video"
                    className=" absolute object-cover rounded-md brightness-50"
                    fill
                  />
                  <PlayArrowIcon
                    sx={{
                      position: "absolute",
                      color: "white",
                      scale: "2",
                      top: "60%",
                      left: "52%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                  <span className=" absolute  bottom-0 right-[.5em] text-white">
                    2:45
                  </span>
                </div>
                <h4 className="font-bold mt-2">{eachCard.title}</h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
