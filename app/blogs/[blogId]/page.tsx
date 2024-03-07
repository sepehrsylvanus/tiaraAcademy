"use client";
import styles from "./singleBlog.module.css";
import { Chip } from "@mui/material";
import Image from "next/image";
import { sections } from "@/utils/fakeData";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
interface Section {
  title: string;
  body: string;
}

const SingleBlog = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (ref) => ref === entry.target
            );
            setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className="header text-center flex flex-col gap-5">
        <Chip className="w-fit mx-auto" label="Grammar" />
        <h1 className="h1">
          How we can learn grammars more
          <br /> easier and efficiently{" "}
        </h1>
        <p className="flex gap-2 justify-center">
          <span>22 Jan 2024</span>&bull;<span>Khashayar Mohammadi</span>
        </p>
      </div>
      <div>
        <Image
          src={"/singleBlog.jpg"}
          width={800}
          height={960}
          className="  mx-auto  object-cover rounded-lg"
          alt="Class"
        />
      </div>
      <div className="main mt-7 px-[6em] flex flex-row-reverse gap-[2.5em]">
        <div className="flex-[7]">
          <p className="mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            quisquam dignissimos, doloribus eveniet alias velit ullam. Magnam
            eaque libero porro laboriosam quam iusto minima sapiente? Cupiditate
            eum omnis expedita inventore, est culpa dolore quisquam esse quo
            voluptate ullam sed cumque architecto, molestias sint aperiam,
            excepturi perspiciatis natus? A, suscipit aliquam?
          </p>

          {sections.map((section, index) => (
            <div
              key={index}
              ref={(ref) => (sectionRefs.current[index] = ref)}
              className="my-8"
            >
              <h4 className=" font-bold text-lg mb-2">{section.title}</h4>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
        <div className="flex-[2]">
          {sections.map((section, index) => (
            <div key={index} className="flex items-center gap-2 w-full">
              <div
                className={`w-1 h-[3rem] transition ${
                  activeIndex === index ? "bg-blue-500" : "bg-slate-400 "
                } `}
              ></div>
              {section.title}
            </div>
          ))}

          <div className="mt-4">
            <p className=" font-bold text-sm mb-2">Share this article</p>
            <div className="flex gap-3">
              <Image
                src={"/instaLogo.png"}
                width={25}
                height={25}
                alt="Instagram logo"
              />
              <Image
                src={"/linkedInLogo.png"}
                width={25}
                height={25}
                alt="linkedIn logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
