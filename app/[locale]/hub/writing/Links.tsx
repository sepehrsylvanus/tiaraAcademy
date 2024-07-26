"use client";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { writingIcons } from "@/constants";
import { User } from "@/utils/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { postWriting } from "@/actions/actions";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const Links = ({ teachers }: { teachers: User[] }) => {
  const [pdfFile, setPdfFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const path = usePathname();

  const handlePdfChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPdfFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);

      const newWritingFile = await postWriting(formData);
      toast.success(newWritingFile);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" grid text-sm grid-cols-2 mx-auto justify-center justify-items-center gap-3 mt-4 transition sm:grid-cols-3 md:grid-cols-4  lg:relative left-12">
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
                      href={`/hub/classes?teacher=${
                        teacher.fName + "-" + teacher.lName
                      }&className=writing`}
                      className={
                        index !== teachers.length - 1
                          ? "border-b border-slate-300 pb-2"
                          : ""
                      }
                    >
                      {teacher.fName + " " + teacher.lName}
                    </Link>
                  </>
                ))}
              </PopoverContent>
            </Popover>
          );
        } else {
          return (
            <>
              <Dialog>
                <DialogTrigger className=" hover:ring-1 hover:ring-blue-800 bg-slate-200 w-fit text-blue-800 font-bold rounded-md px-4 py-6">
                  Upload one
                </DialogTrigger>
                <DialogContent className="py-10 bg-extraText">
                  <form
                    onSubmit={handleSubmit}
                    className="flex space-y-4 flex-col"
                  >
                    <input
                      id="writingFile"
                      type="file"
                      name="writingFile"
                      style={{ display: "none" }}
                      onChange={handlePdfChange}
                      accept=".pdf"
                    />
                    <label
                      htmlFor="writingFile"
                      className="formInput w-full py-4"
                    >
                      {pdfFile?.name && "Choosed => "}
                      {` ${pdfFile?.name || "Not chosen yet :)"}`}
                    </label>
                    {loading ? (
                      <Button disabled className="w-fit">
                        <CircularProgress
                          sx={{ color: "white", transform: "scale(.7)" }}
                        />
                      </Button>
                    ) : (
                      <Button type="submit" className="w-fit">
                        Submit
                      </Button>
                    )}
                  </form>
                </DialogContent>
              </Dialog>
            </>
          );
        }
      })}
    </div>
  );
};

export default Links;
