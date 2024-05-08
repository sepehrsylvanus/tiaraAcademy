import { getSingleWriting, getTeacherAnswer } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Writings } from "@/utils/types";
import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type Params = {
  params: {
    id: string;
  };
};
const SingleWriting = async (props: Params) => {
  const myWriting = (await getSingleWriting(props.params.id)) as Writings;
  const teacherAnswer = await getTeacherAnswer(myWriting.id);
  console.log(myWriting);
  console.log(teacherAnswer);
  if (!myWriting) {
    return (
      <div className="grid place-content-center h-screen">
        <p className="h1 text-center">
          How could you arrive to this page! <br /> There is no writing with
          this ID.
        </p>
      </div>
    );
  }
  return (
    <div className="px-2 pb-4 pt-[3em] md:pt-0  md:pl-[5em]">
      {myWriting.subject ? (
        <h1 className="h1 text-center">{myWriting.subject}</h1>
      ) : (
        <h1 className="h1 text-center">This is a writing file</h1>
      )}

      <div className="grid grid-cols-1 mt-4 lg:grid-cols-3  space-y-6 h-screen">
        <div className="lg:flex lg:flex-col lg:text-center">
          <h3 className="h3">Teacher's answer</h3>
          <p className="text-lg border-b border-dashed border-slate-500 w-[30%] lg:w-fit self-center">
            band: {teacherAnswer?.band}
          </p>
          <p className="text-xl">
            <span className="text-lg">Your teacher's answer:</span> <br />
            {teacherAnswer?.writingSelf}
          </p>
        </div>
        <div className="lg:hidden">
          <Divider sx={{ backgroundColor: "gray" }} />
        </div>
        <div className="flex justify-center ">
          <Divider
            sx={{ backgroundColor: "gray", width: 2 }}
            orientation="vertical"
          />
        </div>
        <div className="lg:flex lg:flex-col lg:text-center">
          <h3 className="h3">Your writing</h3>
          {myWriting.subject ? (
            <div>
              {myWriting.subjectImgURL && (
                <div className="relative w-[90%] h-[200px] mx-auto">
                  <Image
                    src={myWriting.subjectImgURL}
                    alt={myWriting.subject!}
                    fill
                    className="absolute  object-contain"
                  />
                </div>
              )}
              <p>{myWriting.writing}</p>
            </div>
          ) : (
            <>
              <div className=" leading-8">
                <p>You uploaded a PDF file</p>
                <p>So you can download your file from this button ⬇️</p>
              </div>
              <Link href={myWriting.writingLink!} className="mt-4r">
                <Button> Download your pdf file</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleWriting;
