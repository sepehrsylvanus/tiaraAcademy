"use client";
import styles from "./blogs.module.css";
import {
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
} from "@mui/material";
import Image from "next/image";

import OtherBlogs from "@/components/otherBlogs/OtherBlogs";
import Link from "next/link";
import { useGetBlogs } from "@/hooks/useArticles";
import { useGetCategory } from "@/hooks/useCategory";
import { Category } from "@prisma/client";

const Blogs = () => {
  const { data: articles, isLoading } = useGetBlogs();
  const { data: categories, isLoading: catLoading } = useGetCategory();
  const trendingAtricles = articles?.filter((article) => article.trend);

  return (
    <div className={styles.container}>
      <div className="header flex flex-col items-center md:items-center md:justify-between text-center gap-4">
        <div className="flex justify-center gap-4">
          {categories?.map((category: Category) => (
            <Link href={`/hub/videos/category/${category.value}`}>
              <Chip
                label={category.title}
                className=" hover:bg-extraText hover:text-white transition"
              />
            </Link>
          ))}
        </div>
        <h3 className="h1 text-4xl ">Trending Articles</h3>
        <p className=" w-fit md:w-[30rem]">
          Discover Our Curated Collection of the Most Trending and Insightful
          Articles: From Educational Insights to Practical Tips
        </p>
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
                  <Card className="h-full  transition hover:shadow-2xl bg-[#1C294B]">
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
                      <Chip
                        sx={{ color: "white" }}
                        label={
                          trendingAtricles[trendingAtricles.length - 1]
                            ?.categories
                        }
                        variant="outlined"
                        className=" w-fit"
                      />
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
                        <span>{`${trendingAtricles[
                          trendingAtricles.length - 1
                        ]?.createdAt.getFullYear()} / ${trendingAtricles[
                          trendingAtricles.length - 1
                        ]?.createdAt.getMonth()} / ${trendingAtricles[
                          trendingAtricles.length - 1
                        ]?.createdAt.getDay()}`}</span>
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
              <div className=" grid grid-rows-3 gap-5">
                {trendingAtricles.length > 1 && (
                  <div className="eacHeadBlog flex flex-col md:flex-row gap-4 transition hover:shadow-xl hover:-translate-y-1 items-center">
                    <Image
                      src={"/article.jpg"}
                      alt="article"
                      width={200}
                      height={90}
                      className=" rounded-lg"
                    />
                    <div className="flex flex-col justify-between gap-4 md:gap-0 items-center md:items-start">
                      <Chip
                        variant="outlined"
                        label={trendingAtricles[length - 2]?.categories}
                        className=" w-fit"
                      />
                      <div>
                        <h4 className=" mb-2 font-extrabold text-center md:text-start">
                          {trendingAtricles[length - 2]?.title}
                        </h4>
                        <p className="text-xs flex gap-2 justify-center md:justify-start">
                          <span>{`${
                            trendingAtricles[length - 2]?.author.fName
                          } ${
                            trendingAtricles[length - 2]?.author.lName
                          }`}</span>
                          •{" "}
                          <span>{`${trendingAtricles[
                            length - 2
                          ]?.createdAt.getFullYear()} / ${trendingAtricles[
                            length - 2
                          ]?.createdAt.getMonth()} / ${trendingAtricles[
                            length - 2
                          ]?.createdAt.getDay()}`}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {trendingAtricles.length > 2 && (
                  <div className="eacHeadBlog flex flex-col md:flex-row gap-4 transition hover:shadow-xl hover:-translate-y-1 items-center">
                    <Image
                      src={"/article.jpg"}
                      alt="article"
                      width={200}
                      height={90}
                      className=" rounded-lg"
                    />
                    <div className="flex flex-col justify-between gap-4 md:gap-0 items-center md:items-start">
                      <Chip
                        variant="outlined"
                        label={trendingAtricles[length - 3]?.categories}
                        className=" w-fit"
                      />
                      <div>
                        <h4 className=" mb-2 font-extrabold text-center md:text-start">
                          {trendingAtricles[length - 3]?.title}
                        </h4>
                        <p className="text-xs flex gap-2 justify-center md:justify-start">
                          <span>{`${
                            trendingAtricles[length - 3]?.author.fName
                          } ${
                            trendingAtricles[length - 3]?.author.lName
                          }`}</span>
                          •{" "}
                          <span>{`${trendingAtricles[
                            length - 3
                          ]?.createdAt.getFullYear()} / ${trendingAtricles[
                            length - 3
                          ]?.createdAt.getMonth()} / ${trendingAtricles[
                            length - 3
                          ]?.createdAt.getDay()}`}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {trendingAtricles.length > 3 && (
                  <div className="eacHeadBlog flex flex-col md:flex-row gap-4 transition hover:shadow-xl hover:-translate-y-1 items-center">
                    <Image
                      src={"/article.jpg"}
                      alt="article"
                      width={200}
                      height={90}
                      className=" rounded-lg"
                    />
                    <div className="flex flex-col justify-between gap-4 md:gap-0 items-center md:items-start">
                      <Chip
                        variant="outlined"
                        label={trendingAtricles[length - 4]?.categories}
                        className=" w-fit"
                      />
                      <div>
                        <h4 className=" mb-2 font-extrabold text-center md:text-start">
                          {trendingAtricles[length - 4]?.title}
                        </h4>
                        <p className="text-xs flex gap-2 justify-center md:justify-start">
                          <span>{`${
                            trendingAtricles[length - 4]?.author.fName
                          } ${
                            trendingAtricles[length - 4]?.author.lName
                          }`}</span>
                          •{" "}
                          <span>{`${trendingAtricles[
                            length - 4
                          ]?.createdAt.getFullYear()} / ${trendingAtricles[
                            length - 4
                          ]?.createdAt.getMonth()} / ${trendingAtricles[
                            length - 4
                          ]?.createdAt.getDay()}`}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <h4>There is no trending articles</h4>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <CircularProgress sx={{ color: "#072d44" }} />
        </div>
      )}

      <div>
        <h3 className="h1 text-4xl mb-3 text-center">Grammar Article</h3>
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
