"use client";
import styles from "./singleBlog.module.css";
import { Chip, CircularProgress } from "@mui/material";
import Image from "next/image";
import { sections } from "@/utils/fakeData";

import { TracingBeam } from "@/components/ui/tracing-beam";
import { useGetSingleBlog } from "@/hooks/useArticles";
import moment from "jalali-moment";
import { useLocale } from "next-intl";
type ParamsProps = {
  params: {
    blogId: string;
  };
};
const SingleBlog = (params: ParamsProps) => {

  const { data: article } = useGetSingleBlog(params.params.blogId);
  const locale = useLocale();
  if (article) {
    return (
      <div className={styles.container}>
        <TracingBeam className="px-6 h-fit">
          <div>
            <div className="header   text-center flex flex-col gap-5 mb-4">
              <Chip className="w-fit mx-auto" label="Grammar" />
              <h1 className="font-bold  md:h1">{article?.title}</h1>
              <p className="flex gap-2 justify-center items-center">
                <span>
                  {locale === "en"
                    ? `${article.createdAt.getFullYear()} / ${
                        article.createdAt.getMonth() + 1
                      } / ${article.createdAt.getDate()}`
                    : moment(article.createdAt)
                        .locale("fa")
                        .format("YYYY/MM/DD")}
                </span>
                &bull;
                <span>{`${article?.author.fName} ${article?.author.lName}`}</span>
              </p>
            </div>
            <div>
              {article.image && (
                <Image
                  src={article.image}
                  width={650}
                  height={680}
                  className="mb-4  mx-auto  object-cover rounded-lg"
                  alt="Class"
                />
              )}
            </div>
            <div
              className={`main   md:px-[6em] gap-[2.5em] ${
                article.english && "text-end"
              }`}
              dangerouslySetInnerHTML={{ __html: article?.text }}
            />
          </div>
        </TracingBeam>
      </div>
    );
  } else {
    return (
      <div className="grid place-content-center">
        <CircularProgress />
      </div>
    );
  }
};

export default SingleBlog;
