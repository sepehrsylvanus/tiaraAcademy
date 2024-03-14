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
      <div>
        <Input
          type="text"
          placeholder="Search name..."
          className=" rounded-3xl mt-4"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 grid-flow-dense mt-2">
          {videoTags.map((tag) => (
            <Badge className="w-fit bg-slate-300 text-black">{tag.name}</Badge>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {howTooStudy.map((eachCard, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
              </CardHeader>
              <CardContent>
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
                </div>
                <h4 className="font-bold my-2">{eachCard.title}</h4>
                <p className="text-sm">{eachCard.desc}</p>
              </CardContent>
              <CardFooter>
                <Link
                  className=" text-blue-400 transition underline md:no-underline	md:transition md:hover:underline"
                  href={"#"}
                >
                  Read more
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Videos;
