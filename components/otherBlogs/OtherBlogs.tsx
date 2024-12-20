"use client";

import { CardMedia, Chip } from "@mui/material";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Blogs } from "@/utils/types";
import { usePathname } from "next/navigation";
import { useGetCurrentUser } from "@/hooks/useGetUsers";
import { toast } from "react-toastify";
import { Whatshot, WhatshotOutlined } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import { useChangeTrend } from "@/hooks/useArticles";
import { useLocale, useTranslations } from "next-intl";
import moment from "jalali-moment";
const OtherBlogs = ({ articles }: { articles?: Blogs[] }) => {
  const t = useTranslations("Articles");
  const locale = useLocale();
  const [itemsToShow, setItemsToShow] = useState(3);
  const pathName = usePathname();
  const trendArticles = articles?.filter((article) => article.trend);
  const { data: currentUser } = useGetCurrentUser();
  const { mutate } = useChangeTrend();

  const handleToggleTrend = async (id: string) => {
    const isAlreadyTrending = trendArticles?.some(
      (article) => article.id === id
    );

    if (trendArticles && !isAlreadyTrending && trendArticles.length >= 4) {
      toast.error("Trend articles more thant 4");
    } else {
      await mutate(id);
    }
  };

  const handleLoadMore = () => {
    setItemsToShow(itemsToShow + 3);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  articles = articles?.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  return (
    <div className="text-center">
      {pathName === "/hub/blogs" && articles && articles?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles?.slice(0, itemsToShow).map((article, index) => (
            <Card
              className="transition hover:shadow-xl bg-extraBg text-lightPrime h-fit  relative"
              key={index}
            >
              {article.trend ? (
                <div
                  className="absolute top-4 right-4"
                  onClick={() => handleToggleTrend(article.id)}
                >
                  <Whatshot
                    sx={{
                      color: "#f1c40f",
                      borderRadius: 5,
                      border: "1px solid black",
                      cursor: "pointer",
                      "&:hover": {
                        transition: ".5s all",
                        color: "black",
                      },
                    }}
                  />
                </div>
              ) : (
                <div
                  className="absolute top-4 right-4"
                  onClick={() => handleToggleTrend(article.id)}
                >
                  <WhatshotOutlined
                    sx={{
                      color: "black",
                      border: "1px solid  black",
                      borderRadius: 5,
                      cursor: "pointer",
                      "&:hover": {
                        transition: ".5s all",
                        color: "#f1c40f",
                      },
                    }}
                  />
                </div>
              )}

              <Link href={`/hub/blogs/${article.id}`}>
                {article.image && (
                  <CardMedia
                    sx={{ height: 250 }}
                    image={article.image}
                    className="object-center"
                  />
                )}
                <CardContent className="flex flex-col mt-4 items-center md:items-start gap-4 ">
                  <p className="text-lg font-bold md:text-start text-center text-lightPrime">
                    {article.title}
                  </p>

                  <p className="text-sm flex gap-2 justify-center text-lightPrime">
                    {article.author && (
                      <span>{`${article.author.fName} ${article.author.lName}`}</span>
                    )}
                    &bull;
                    <span>
                      {locale === "en"
                        ? `${article.createdAt.getFullYear()} / ${
                            article.createdAt.getMonth() + 1
                          } / ${article.createdAt.getDate()}`
                        : moment(article.createdAt)
                            .locale("fa")
                            .format("YYYY/MM/DD")}
                    </span>
                  </p>
                </CardContent>
              </Link>
              <CardFooter>
                {(currentUser?.role.includes("admin") ||
                  currentUser?.role.includes("adminTeacher") ||
                  currentUser?.role.includes("teacher")) && (
                  <p
                    className=" cursor-pointer text-lg  md:text-base md:hover:scale-110 transition"
                    onClick={() => copyToClipboard(article.id)}
                  >
                    {article.id}
                  </p>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        pathName === "/hub/blogs" &&
        articles?.length === 0 && <h4>{t("noArticle")}</h4>
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
