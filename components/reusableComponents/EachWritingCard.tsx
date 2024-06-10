"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import ReuableForm from "./teacherWriting/ReuableForm";
import { Avatar, CircularProgress } from "@mui/material";
import { Button } from "../ui/button";
import MyPdf from "./myPdf";
import { Writings } from "@/utils/types";
import { useState } from "react";

// Conditionally import usePDF only in a web environment
let usePDF: any; // Adjust the type based on your usePDF type definition
if (typeof window !== "undefined") {
  // Only import usePDF if running in a web environment
  const reactPDF = require("@react-pdf/renderer");
  usePDF = reactPDF.usePDF;
}

const EachWritingCard: React.FC<{ writing: Writings }> = ({ writing }) => {
  const [openAnswer, setOpenAnswer] = useState(false);
  let url: string | undefined;
  if (usePDF && writing.subject) {
    // usePDF is available only in a web environment
    const [{ loading, url: pdfUrl, error }] = usePDF({
      document: <MyPdf details={writing} />,
    });
    url = pdfUrl;
  }

  return (
    <div
      key={writing.id}
      className="w-full flex flex-col gap-2 lg: items-center"
    >
      <Avatar sx={{ width: 50, height: 50 }} />
      <div className={`flex  w-full justify-between md:space-y-2 `}>
        {writing.name ? (
          <>
            <p>{writing.name}</p>
            <p>{writing.subjectImgURL ? "Section 1" : "Section 2"}</p>
          </>
        ) : (
          <p className="text-center w-full">This writing uploaded in pdf</p>
        )}
      </div>
      <div className="w-full flex flex-col gap-2">
        <Dialog onOpenChange={setOpenAnswer}>
          <DialogTrigger
            suppressHydrationWarning
            className="py-2 rounded-md w-full md:mr-2 bg-slate-900/90 text-lightPrime transition hover:outline hover:outline-1 hover:outline-lightPrime hover:text-[#c6d9e6] dark:bg-slate-900/90 dark:text-[#c6d9e6] dark:hover:bg-slate-50/90"
            onClick={() => setOpenAnswer(true)}
          >
            Open
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Teacher Writing Form</DialogTitle>
            </DialogHeader>
            <ReuableForm writingId={writing.id} setOpenAnswer={setOpenAnswer} />
          </DialogContent>
        </Dialog>

        {!url && !writing.writingLink ? (
          <div className="flex justify-center">
            <CircularProgress sx={{ color: "white", transform: "scale(.7)" }} />
          </div>
        ) : url ? (
          <a href={url}>
            <Button className="w-full">Download</Button>
          </a>
        ) : (
          writing.writingLink && (
            <a href={writing.writingLink}>
              <Button className="w-full">Download</Button>
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default EachWritingCard;
