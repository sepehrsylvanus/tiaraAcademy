"use client";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { VideoCourses } from "@/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { School, Person, Videocam } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllVideos } from "@/actions/videos/videos.action";
import { getMessages, getTranslations } from "next-intl/server";
import { useGetAllVideos } from "@/hooks/useVideos";
import { useTranslations } from "next-intl";

const Videos = () => {
  const { data: videos } = useGetAllVideos();
  const [filteredVideos, setFilteredVideos] = useState<any[]>();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const t = useTranslations("VideoCourse");

  useEffect(() => {
    const filteredVideos = videos?.filter((video) => {
      const matchedName = video.title
        .toLowerCase()
        .startsWith(name.toLowerCase());
      const matchedCategory = video.category
        .toLowerCase()
        .startsWith(category.toLowerCase());
      return matchedName && matchedCategory;
    });
    setFilteredVideos(filteredVideos);
  }, [name, category, videos]);

  if (videos) {
    return (
      <div>
        <h1 className="text-center">{t("videoTitle")}</h1>
        <main className=" mt-10  pb-10">
          <div className="filterInputs flex flex-col rtl:items-end gap-4 rtl:ml-6">
            <Input
              placeholder="Name of course"
              className="w-[180px] rtl:text-end"
              onChange={(e) => setName(e.target.value)}
            />
            <Select onValueChange={(e) => setCategory(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-10/12 border-t border-slate-400 border-dashed mx-auto my-6" />
          <div
            className={`mx-auto  w-10/12 ${
              videos.length > 0 ? "grid-cols-1 grid md:grid-cols-4 gap-6" : ""
            }`}
          >
            {filteredVideos?.map((videoCourse) => (
              <Card className="border-extraBg">
                <CardHeader>
                  <img
                    src={videoCourse.thumbnailLink}
                    alt={`${videoCourse.title} image`}
                    className="w-full h-full rounded-md"
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col rtl:items-end gap-2">
                    <p className="flex rtl:flex-row-reverse gap-2">
                      <School />
                      {videoCourse.title}
                    </p>
                    <p className="flex rtl:flex-row-reverse gap-2">
                      <Person />
                      {`${videoCourse.teacher.fName} ${videoCourse.teacher.lName}`}
                    </p>
                    <p className="flex rtl:flex-row-reverse gap-2">
                      <Videocam />
                      {videoCourse.videoCourseSession.length}
                      <span> {t("videos")}</span>
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="mt-2">
                  <Link
                    href={`/hub/videos/${videoCourse.id}`}
                    className="w-full"
                  >
                    <Button className="bg-extraBg w-full rounded-3xl hover:text-lightPrime hover:bg-extraText">
                      View
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
            {videos.length === 0 && (
              <p className="h3 text-center ">{t("noVideoYet")}</p>
            )}
          </div>
          {videos.length > 8 && (
            <div className="flex justify-center">
              <Button className="rounded-3xl bg-extraBg px-[3em]">
                {t("loadMore")}
              </Button>
            </div>
          )}
        </main>
      </div>
    );
  }
};

export default Videos;
