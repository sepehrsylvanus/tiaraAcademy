"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { CircularProgress } from "@mui/material";

import MyCourses from "@/components/MyCourses";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { Class } from "@/utils/types";

import Link from "next/link";
import MyWritings from "../myWritings/MyWritings";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";
import { useGetClasses } from "@/hooks/useClasses";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
export default function StudentHub() {
  const [displayCount, setDisplayCount] = useState(3);
  const [featuredClasses, setFeaturedClasses] = useState<Class[]>([]);
  const { data: allClasses, isLoading: loading } = useGetClasses();

  const locale = useLocale();
  const t = useTranslations("StudentHub");
  const handleShowMore = () => {
    setDisplayCount((prev: number) => prev + 2);
  };

  useEffect(() => {
    const featuredClasses = allClasses?.filter((cls) => {
      const currentDate = new Date();
      const timeDifference = currentDate.getTime() - cls.createdAt.getTime();
      const oneWeekMiliseconds = 7 * 24 * 60 * 60 * 1000;
      return timeDifference < oneWeekMiliseconds;
    });
    setFeaturedClasses(featuredClasses!);
  }, [allClasses]);

  return (
    <div
      className={`px-2 pb-[3em]   md:mb-10 pt-[3em]  ${
        locale === "fa" ? "md:pr-[2em]" : "md:pl-[2em]"
      }`}
    >
      <Link
        href={"/"}
        className=" text-lightText font-bold  md:pl-[6em]  absolute top-16 md:top-5 left-4 flex rtl:flex-row-reverse items-center"
      >
        <ArrowBackIosNewIcon />
        {t("landingPage")}{" "}
      </Link>
      <section className="featuredClasses mt-8">
        <div className=" mb-2 border-b border-dashed flex justify-end flex-row-reverse items-center md:justify-end">
          <h2 className="font-bold text-2xl">{t("featuredClasses")}</h2>
        </div>
        <div
          className={`featuredContainer ${
            featuredClasses &&
            featuredClasses?.length > 0 &&
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
          } gap-4`}
        >
          {loading ? (
            <div className="w-full flex justify-center">
              <CircularProgress sx={{ color: "#9ccddb" }} />
            </div>
          ) : featuredClasses && featuredClasses?.length > 0 ? (
            featuredClasses.slice(0, displayCount).map((featuredClass) => {
              return (
                <Card
                  key={featuredClass.id}
                  className="w-full max-w-sm rounded-lg overflow-hidden shadow-lg bg-cardBg"
                >
                  <div className="relative">
                    <img
                      src={featuredClass.imageLink}
                      alt={featuredClass.imageName}
                      width="400"
                      height="200"
                      className="w-full h-52 object-cover"
                      style={{ aspectRatio: "400/200", objectFit: "cover" }}
                    />
                    <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 bg-background rounded-full p-2 shadow-lg">
                      <Avatar className="w-16 h-16 border-4 border-background">
                        <AvatarImage
                          src={featuredClass.teacher.image!}
                          alt={featuredClass.teacher.fName}
                        />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                  <CardContent className="mt-12 px-6 pb-6 text-center">
                    <div className="font-bold text-xl">{`${featuredClass.teacher.fName} ${featuredClass.teacher.lName}`}</div>

                    <div className="mt-4 font-semibold text-lg">
                      {featuredClass.title}
                    </div>
                    <Link href={`/hub/classes/${featuredClass.id}`}>
                      <Button size="sm" className="mt-4">
                        Join
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="w-full text-center">
              {t("noFound1")}{" "}
              <Link className=" underline" href={"/hub/classes"}>
                {t("classesPage")}
              </Link>{" "}
              {t("noFound2")}
            </p>
          )}
        </div>

        {featuredClasses && featuredClasses.length > displayCount && (
          <div className="w-full flex justify-center">
            <Button className="w-full my-4 sm:w-[30%]" onClick={handleShowMore}>
              {t("showMore")}
            </Button>
          </div>
        )}
      </section>
      <section className="mt-6">
        <MyCourses />
      </section>

      <section>
        <MyWritings />
      </section>
    </div>
  );
}
