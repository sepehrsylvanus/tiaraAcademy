"use client";
import styles from "./blogs.module.css";
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
} from "@mui/material";
import Image from "next/image";

import OtherBlogs from "@/components/otherBlogs/OtherBlogs";
import Link from "next/link";
import { useGetBlogs } from "@/hooks/useArticles";
import { useGetCategory } from "@/hooks/useCategory";
import { Category } from "@prisma/client";
import { useLocale, useTranslations } from "next-intl";
import moment from "jalali-moment";

const Blogs = () => {
  const t = useTranslations("Articles");
  const locale = useLocale();
  const { data: articles, isLoading } = useGetBlogs();
  const { data: categories, isLoading: catLoading } = useGetCategory();
  const trendingAtricles = articles?.filter((article) => article.trend);
  const makeItJalali = (date: Date) => {
    return moment(date).locale("fa").format("YYYY/MM/DD");
  };
  return (
    <div className={styles.container}>
      <div className="header flex flex-col items-center md:items-center md:justify-between text-center gap-4">
        <div className="flex justify-center gap-4">
          {categories?.map((category: Category) => (
            <Link href={`/hub/videos/category/${category.value}`}></Link>
          ))}
        </div>
        <h3 className="h1 text-4xl ">{t("terndingArticles")}</h3>
        <p className=" w-fit md:w-[30rem]">{t("trendingDescription")}</p>
      </div>
      <Divider sx={{ border: "1px solid #b2bec3" }} />
      {!isLoading ? (
        <div>
          {trendingAtricles && trendingAtricles.length > 0 ? (
            <div className="trending grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="h-full ">
                <Link
                  href={`/hub/blogs/${
                    trendingAtricles[trendingAtricles.length - 1].id
                  }`}
                >
                  <Card
                    className={`${
                      trendingAtricles.length > 3 ? "h-full" : "h-fit"
                    }  transition hover:shadow-2xl bg-[#1C294B]`}
                  >
                    <CardMedia
                      sx={{ height: 200 }}
                      image={
                        trendingAtricles[trendingAtricles.length - 1]?.image ??
                        "/empty.png"
                      }
                      title="article"
                    />

                    <CardContent
                      sx={{
                        backgroundColor: "#1C294B",
                        color: "white",
                      }}
                      className=" flex flex-col gap-7 justify-between bg-"
                    >
                      <div className="flex flex-col gap-4">
                        <h4 className=" font-bold text-2xl">
                          {trendingAtricles[trendingAtricles.length - 1]?.title}
                        </h4>
                        <p className="text-sm">
                          {trendingAtricles[
                            trendingAtricles.length - 1
                          ]?.text.substring(3, 20)}
                          ...
                        </p>
                      </div>
                      <p className="text-xs flex gap-2">
                        <span>{`${
                          trendingAtricles[trendingAtricles.length - 1]?.author
                            .fName
                        } ${
                          trendingAtricles[trendingAtricles.length - 1]?.author
                            .lName
                        }`}</span>
                        •{" "}
                        <span>
                          {locale === "en"
                            ? `${trendingAtricles[
                                trendingAtricles.length - 1
                              ]?.createdAt.getFullYear()} / ${trendingAtricles[
                                trendingAtricles.length - 1
                              ]?.createdAt.getMonth()} / ${trendingAtricles[
                                trendingAtricles.length - 1
                              ]?.createdAt.getDay()}`
                            : moment(
                                trendingAtricles[trendingAtricles.length - 1]
                                  .createdAt
                              )
                                .locale("fa")
                                .format("YYYY/MM/DD")}
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
              <div className=" grid grid-rows-3 gap-5">
                {trendingAtricles.length > 1 && (
                  <div className="eacHeadBlog flex flex-col md:flex-row gap-4 transition hover:shadow-xl hover:-translate-y-1 items-center">
                    <Image
                      src={
                        trendingAtricles[trendingAtricles.length - 2].image ??
                        "/empty.png"
                      }
                      alt={trendingAtricles[trendingAtricles.length - 2].title}
                      width={100}
                      height={50}
                      className=" rounded-lg"
                    />
                    <div className="flex flex-col justify-between gap-4 md:gap-0 items-center md:items-start">
                      <div>
                        <h4 className=" mb-2 font-extrabold text-center md:text-start">
                          {trendingAtricles[trendingAtricles.length - 2]?.title}
                        </h4>
                        <p className="text-xs flex gap-2 justify-center md:justify-start">
                          <span>{`${
                            trendingAtricles[trendingAtricles.length - 2]
                              ?.author.fName
                          } ${
                            trendingAtricles[trendingAtricles.length - 2]
                              ?.author.lName
                          }`}</span>
                          •{" "}
                          <span>
                            {locale === "en"
                              ? `${trendingAtricles[
                                  trendingAtricles.length - 2
                                ]?.createdAt.getFullYear()} / ${trendingAtricles[
                                  trendingAtricles.length - 2
                                ]?.createdAt.getMonth()} / ${trendingAtricles[
                                  trendingAtricles.length - 2
                                ]?.createdAt.getDay()}`
                              : makeItJalali(
                                  trendingAtricles[trendingAtricles.length - 2]
                                    .createdAt
                                )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {trendingAtricles.length > 2 && (
                  <div className="eacHeadBlog flex flex-col md:flex-row gap-4 transition hover:shadow-xl hover:-translate-y-1 items-center">
                    <Image
                      src={
                        trendingAtricles[trendingAtricles.length - 3].image ??
                        "/empty.png"
                      }
                      alt={trendingAtricles[trendingAtricles.length - 3].title}
                      width={100}
                      height={50}
                      className=" rounded-lg"
                    />
                    <div className="flex flex-col justify-between gap-4 md:gap-0 items-center md:items-start">
                      <div>
                        <h4 className=" mb-2 font-extrabold text-center md:text-start">
                          {trendingAtricles[trendingAtricles.length - 3]?.title}
                        </h4>
                        <p className="text-xs flex gap-2 justify-center md:justify-start">
                          <span>{`${
                            trendingAtricles[trendingAtricles.length - 3]
                              ?.author.fName
                          } ${
                            trendingAtricles[trendingAtricles.length - 3]
                              ?.author.lName
                          }`}</span>
                          •{" "}
                          <span>
                            {locale === "en"
                              ? `${trendingAtricles[
                                  trendingAtricles.length - 3
                                ]?.createdAt.getFullYear()} / ${trendingAtricles[
                                  trendingAtricles.length - 3
                                ]?.createdAt.getMonth()} / ${trendingAtricles[
                                  trendingAtricles.length - 3
                                ]?.createdAt.getDay()}`
                              : makeItJalali(
                                  trendingAtricles[trendingAtricles.length - 3]
                                    .createdAt
                                )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {trendingAtricles.length > 3 && (
                  <div className="eacHeadBlog flex flex-col md:flex-row gap-4 transition hover:shadow-xl hover:-translate-y-1 items-center">
                    <Image
                      src={
                        trendingAtricles[trendingAtricles.length - 4].image ??
                        "/empty.png"
                      }
                      alt={trendingAtricles[trendingAtricles.length - 4].title}
                      width={100}
                      height={50}
                      className=" rounded-lg"
                    />
                    <div className="flex flex-col justify-between gap-4 md:gap-0 items-center md:items-start">
                      <div>
                        <h4 className=" mb-2 font-extrabold text-center md:text-start">
                          {trendingAtricles[trendingAtricles.length - 4]?.title}
                        </h4>
                        <p className="text-xs flex gap-2 justify-center md:justify-start">
                          <span>{`${
                            trendingAtricles[trendingAtricles.length - 4]
                              ?.author.fName
                          } ${
                            trendingAtricles[trendingAtricles.length - 4]
                              ?.author.lName
                          }`}</span>
                          •{" "}
                          <span>
                            {locale === "en"
                              ? `${trendingAtricles[
                                  trendingAtricles.length - 4
                                ]?.createdAt.getFullYear()} / ${trendingAtricles[
                                  trendingAtricles.length - 4
                                ]?.createdAt.getMonth()} / ${trendingAtricles[
                                  trendingAtricles.length - 4
                                ]?.createdAt.getDay()}`
                              : makeItJalali(
                                  trendingAtricles[trendingAtricles.length - 4]
                                    .createdAt
                                )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <h4>{t("noTrending")}</h4>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <CircularProgress sx={{ color: "#072d44" }} />
        </div>
      )}

      <div>
        <h3 className="h1 text-4xl mb-3 text-center">{t("allArticles")}</h3>
        <Divider sx={{ border: "1px solid #b2bec3", margin: "1em 0" }} />
      </div>

      {isLoading ? (
        <div className="w-full flex justify-center">
          <CircularProgress sx={{ color: "#072d44" }} />
        </div>
      ) : (
        <OtherBlogs articles={articles} />
      )}
    </div>
  );
};

export default Blogs;
