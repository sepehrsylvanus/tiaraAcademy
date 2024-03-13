"use client";
import styles from "./singleBlog.module.css";
import { Chip } from "@mui/material";
import Image from "next/image";
import { sections } from "@/utils/fakeData";

import { useEffect, useRef, useState } from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";

interface Section {
  title: string;
  body: string;
}

const SingleBlog = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  return (
    <div className={styles.container}>
      <TracingBeam className="px-6 h-fit">
        <div>
          <div className="header antialiased  text-center flex flex-col gap-5 mb-4">
            <Chip className="w-fit mx-auto" label="Grammar" />
            <h1 className="font-bold  md:h1">
              How we can learn grammars more
              <br /> easier and efficiently{" "}
            </h1>
            <p className="flex gap-2 justify-center items-center">
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
          <div className="main  mt-7 md:px-[6em] flex flex-row-reverse gap-[2.5em]">
            <div className="w-full">
              <p className="mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
                quisquam dignissimos, doloribus eveniet alias velit ullam.
                Magnam eaque libero porro laboriosam quam iusto minima sapiente?
                Cupiditate eum omnis expedita inventore, est culpa dolore
                quisquam esse quo voluptate ullam sed cumque architecto,
                molestias sint aperiam, excepturi perspiciatis natus? A,
                suscipit aliquam?
              </p>

              {sections.map((section, index) => (
                <div key={index} className="my-8">
                  <h4 className=" font-bold text-lg mb-2">{section.title}</h4>
                  <p>{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TracingBeam>
    </div>
  );
};

export default SingleBlog;
