"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, Divider } from "@mui/material";
import ReuableForm from "./reusableComponents/teacherWriting/ReuableForm";
import Link from "next/link";
import { Button } from "./ui/button";
import MyPdf from "./reusableComponents/myPdf";
import { usePDF } from "@react-pdf/renderer";

const PdfSection = () => {
  const [{ loading, url, error }] = usePDF({
    // قالب پی دی اف خود را به عنوان داکیومنت این هوک معرفی می کنیم
    document: <MyPdf />,
  });
  console.log(url);
  return (
    <div className="pdfs max-h-[480px] overflow-y-auto rounded-md shadow-md p-2 flex flex-col bg-extraText text-lightPrime">
      <p className="text-2xl">PDF Section</p>
      <p className="my-2">Send and view PDFs.</p>
      <Divider />
      <div className="flex flex-col px-2 gap-3 items-center py-3 m-2 rounded-md ring-1 ring-lightPrime">
        <div className="w-full flex flex-col gap-2 items-center">
          <Avatar sx={{ width: 50, height: 50 }} />
          <div className="flex justify-between w-full md:space-y-2 ">
            <p>Sepehr</p>
            <p>Section 1</p>
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

            <a href={url!}>
              <Button className="w-full">Download</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfSection;
