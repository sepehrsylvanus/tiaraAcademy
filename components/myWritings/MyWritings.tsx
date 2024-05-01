import React from "react";
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

const MyWritings = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Subject</CardTitle>
          <CardDescription>Date of teacher answer</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Status</p>
        </CardContent>
        <CardFooter className="w-full">
          <Link href="/hub/writing/123" className="w-full">
            <Button className="w-full">View</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MyWritings;
