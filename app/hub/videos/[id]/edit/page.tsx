"use client";
import React, { FC, useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import ReactPlayer from "react-player";

interface EditVideoProps {
  params: {
    id: string;
  };
}
const EditVideoCoursePage: FC<EditVideoProps> = ({ params }) => {
  console.log(params);
  const [videoUrl, setVideoUrl] = useState<string>();

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoUrl(videoURL);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 md:px-0 mt-[3em] md:mt-0">
      <h1 className="text-center">Edit English advanced video course</h1>
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <div id="editForm" className="grid gap-6 order-2 md:order-none">
          <div className="grid gap-2">
            <Label htmlFor="video">Video</Label>
            <Input id="video" type="file" onChange={handleVideoChange} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter video title" />
          </div>

          <Button className="w-full">Add Video</Button>
        </div>
        <div id="videoPreview" className="bg-muted rounded-lg overflow-hidden">
          <div className="aspect-video relative">
            <video className="w-full h-full object-cover">
              <source src="/placeholder.mp4" type="video/mp4" />
            </video>
            <div
              className={`absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex items-end p-4 ${
                videoUrl ? "hidden" : ""
              }`}
            ></div>
            <div className={`${videoUrl ? "" : "hidden"} absolute inset-0`}>
              <ReactPlayer
                width={"100%"}
                height={"auto"}
                controls
                url={
                  "https://infallible-zhukovsky-7f1f128am.storage.iran.liara.space/2024-09-03%2015-50-41.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=342080d4-c2d1-45a3-a670-00ed1438736c%2F20241001%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241001T134310Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=fc19a6da63646068eb4a1f4aff95a318ccf4a58c0bf5a9a013c86373c074baa1"
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Other Sessions</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">Session ID</TableHead>
              <TableHead className="text-start">Name</TableHead>
              <TableHead className="text-start">Duration</TableHead>
              <TableHead className="text-start">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>123456789</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>45 minutes</TableCell>
              <TableCell>2023-04-15</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EditVideoCoursePage;
