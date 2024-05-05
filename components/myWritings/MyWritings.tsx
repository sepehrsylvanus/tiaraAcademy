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

const MyWritings = () => {
  const [studentWriting, setStudentWriting] = useState<
    (Writings | WritingFiles)[]
  >([]);
  useEffect(() => {
    const getWritings = async () => {
      const myWritings = (await getStudentWritings()) as (
        | Writings
        | WritingFiles
      )[];
      console.log(myWritings);
      setStudentWriting(myWritings);
    };
    getWritings();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {studentWriting.map((eachWriting) => (
        <Card key={eachWriting.id} className="text-center">
          <CardHeader>
            <CardTitle>
              {eachWriting.subject ? eachWriting.subject : "Uploaded file"}
            </CardTitle>
            <CardDescription>Date of teacher answer</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{eachWriting.status}</p>
          </CardContent>
          <CardFooter className="w-full">
            <Link href="/hub/writing/123" className="w-full">
              <Button className="w-full">View</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MyWritings;
