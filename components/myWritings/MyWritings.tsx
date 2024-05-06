"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { getStudentWritings, getWritings } from "@/actions/actions";
import { useEffect, useState } from "react";
import { WritingFiles, Writings } from "@/utils/types";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

const MyWritings = () => {
  const [studentWriting, setStudentWriting] = useState<
    (Writings | WritingFiles)[]
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getWritings = async () => {
      const myWritings = (await getStudentWritings()) as (
        | Writings
        | WritingFiles
      )[];
      console.log(myWritings);
      setStudentWriting(myWritings);
      setLoading(false);
    };
    getWritings();
  }, []);

  return (
    <>
      <div className=" w-full mb-2 border-b border-dashed flex justify-end flex-row-reverse items-center md:justify-end">
        <h2 className="font-bold text-2xl">Featured Classes</h2>
      </div>
      <div
        className={`${
          !loading &&
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
        } gap-4`}
      >
        {loading ? (
          <div className="w-full flex justify-center">
            <CircularProgress sx={{ color: "white" }} />
          </div>
        ) : (
          studentWriting.map((eachWriting) => (
            <Card key={eachWriting.id} className="text-center">
              <CardHeader>
                <CardTitle>
                  {eachWriting.subject ? eachWriting.subject : "Uploaded file"}
                </CardTitle>
                <CardDescription>Date of teacher answer</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center gap-2">
                {eachWriting.status === "checked" ? (
                  <div className="w-[15px] h-[15px] relative animate-pulse">
                    <Image
                      src={"/greenCircle.png"}
                      alt="checked status"
                      fill
                      className="absolute"
                    />
                  </div>
                ) : (
                  <div className="w-[15px] h-[15px] relative animate-pulse">
                    <Image
                      src={"/yellowCircle.png"}
                      alt="checked status"
                      fill
                      className="absolute"
                    />
                  </div>
                )}
                <p>{eachWriting.status}</p>
              </CardContent>
              <CardFooter className="w-full">
                <Link href="/hub/writing/123" className="w-full">
                  <Button
                    className="w-full "
                    disabled={eachWriting.status === "pending"}
                  >
                    View
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </>
  );
};

export default MyWritings;
