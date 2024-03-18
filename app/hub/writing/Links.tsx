"use client";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { writingIcons } from "@/constants";
import { Instructure } from "@/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Links = ({ teachers }: { teachers: Instructure[] }) => {
  const path = usePathname();
  console.log(path);
  return (
    <div className=" grid text-sm grid-cols-2 mx-auto justify-items-center gap-3 mt-4 transition sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:relative left-12">
      {writingIcons.map((writingIcon, index) => {
        if (writingIcon.link) {
          return (
            <Link key={index} href={writingIcon.link}>
              <div
                className={` ${
                  path === writingIcon.link && "ring-1 ring-blue-800"
                } hover:ring-1 hover:ring-blue-800 bg-slate-200 w-fit text-blue-800 font-bold rounded-md px-4 py-6`}
              >
                {writingIcon.title}
              </div>
            </Link>
          );
        } else if (writingIcon.type === "popover") {
          return (
            <Popover key={index}>
              <PopoverTrigger>
                <div className=" hover:ring-1 hover:ring-blue-800 bg-slate-200 w-fit text-blue-800 font-bold rounded-md px-4 py-6">
                  {writingIcon.title}
                </div>
              </PopoverTrigger>
              <PopoverContent className="flex items-center flex-col gap-2">
                {teachers.map((teacher, index) => (
                  <>
                    <Link
                      key={index}
                      href={`/classes?teacher=${teacher.name}&className=writing`}
                      className={
                        index !== teachers.length - 1
                          ? "border-b border-slate-300 pb-2"
                          : ""
                      }
                    >
                      {teacher.name}
                    </Link>
                  </>
                ))}
              </PopoverContent>
            </Popover>
          );
        } else {
          return (
            <>
              <Input className="hidden" id="writingUp" type="file" />
              <label htmlFor="writingUp">
                <div
                  className="  cursor-pointer hover:ring-1 hover:ring-blue-800 bg-slate-200 w-fit text-blue-800 font-bold rounded-md px-4 py-6 "
                  key={index}
                >
                  {writingIcon.title}
                </div>
              </label>
            </>
          );
        }
      })}
    </div>
  );
};

export default Links;
