import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ReuableForm from "./teacherWriting/ReuableForm";
import { Avatar } from "@mui/material";
import { Button } from "../ui/button";
import MyPdf from "./myPdf";
import { usePDF } from "@react-pdf/renderer";
import { Writings } from "@/utils/types";

const EachWritingCard = ({ writing }: { writing: Writings }) => {
  const [{ loading, url, error }] = usePDF({
    document: <MyPdf details={writing} />,
  });
  return (
    <div
      key={writing.id}
      className="w-full flex flex-col gap-2 lg: items-center"
    >
      <Avatar sx={{ width: 50, height: 50 }} />
      <div
        className={`flex  w-full ${
          !writing.name ? " justify-center" : "justify-between"
        }  md:space-y-2 `}
      >
        {writing.name ? (
          <>
            <p>{writing.name}</p>
            <p>{writing.subjectImgURL ? "Section 1" : "Section 2"}</p>
          </>
        ) : (
          <p className="text-center ">This writing uploaded in pdf</p>
        )}
      </div>
      <div className="w-full flex flex-col gap-2">
        <Dialog>
          <DialogTrigger
            suppressHydrationWarning
            className="py-2 rounded-md w-full md:mr-2 bg-slate-900/90 text-lightPrime transition hover:outline hover:outline-1 hover:outline-lightPrime hover:text-[#c6d9e6] dark:bg-slate-900/90 dark:text-[#c6d9e6] dark:hover:bg-slate-50/90"
          >
            Open
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Teacher Writing Form</DialogTitle>
            </DialogHeader>
            <ReuableForm />
          </DialogContent>
        </Dialog>

        {writing.name ? (
          <a href={url!}>
            <Button className="w-full">Download</Button>
          </a>
        ) : (
          <a href={writing.writingLink}>
            <Button className="w-full">Download</Button>
          </a>
        )}
      </div>
    </div>
  );
};

export default EachWritingCard;
