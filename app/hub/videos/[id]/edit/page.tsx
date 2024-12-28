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
import {
  useDeleteSession,
  useGetCourseVideosDetails,
  usePostSession,
} from "@/hooks/useVideos";
import { toast } from "react-toastify";
import { deleteVideoCourse } from "@/actions/videos/videos.action";
import { useRouter } from "next/navigation";

interface EditVideoProps {
  params: {
    id: string;
  };
}
const EditVideoCoursePage: FC<EditVideoProps> = ({ params }) => {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState<string>();
  const [rawvideo, setRawvideo] = useState<File>();
  const [sessionTitle, setSessionTitle] = useState<string>("");
  const [duration, setDuration] = useState<number>();
  
  const [index, setIndex] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { data: videoDetails, isLoading: videoDetailsLoading } =
    useGetCourseVideosDetails(params.id);
  const { mutate: postSession, isPending: sessionLoading } = usePostSession();
  const { mutate: deleteSession, isPending: deleteSessionLoading } =
    useDeleteSession();
  const courseSessions = videoDetails?.videoCourseSession;

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoUrl(videoURL);
      setRawvideo(file);
    }
  };

  const handleAddSession = () => {
    if (
      videoDetails?.videoCourseSession.some(
        (item) => item.index === parseInt(index)
      )
    ) {
      return toast.error("There is already a session with this index");
    }

    const newSessionFormData = new FormData();
    newSessionFormData.set("video", rawvideo!);
    newSessionFormData.set("title", sessionTitle);
    newSessionFormData.set("duration", duration!.toString());
    newSessionFormData.set("videoCourseId", params.id);
    newSessionFormData.set("index", index);

    postSession(newSessionFormData);
    setVideoUrl("");
    setRawvideo(undefined);
    setSessionTitle("");
    setDuration(undefined);
    setIndex("");
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
            <Input
              id="title"
              placeholder="Enter video title"
              onChange={(e) => setSessionTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              type="number"
              placeholder="Enter video duration in minutes"
              onChange={(e) => setDuration(parseInt(e.target.value, 10))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="index">Index</Label>
            <Input
              id="index"
              type="number"
              placeholder="Write proper index in order to search"
              onChange={(e) => setIndex(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={handleAddSession}>
            {sessionLoading ? "Loading..." : "Add Session"}
          </Button>
          <Button
            variant={"destructive"}
            onClick={async () => {
              setDeleteLoading(true);
              await deleteVideoCourse(params.id);
              router.push("/hub/videos");
            }}
          >
            {deleteLoading ? "Loading..." : "Delete Course"}
          </Button>
        </div>
        <div id="videoPreview" className="bg-muted rounded-lg overflow-hidden">
          <div className="aspect-video relative">
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
        {courseSessions?.length === 0 ||
          (!courseSessions && (
            <p className="text-center font-bold text-lg">
              No sessions available
            </p>
          ))}
        {courseSessions && courseSessions?.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-start">Session Index</TableHead>
                <TableHead className="text-start">Name</TableHead>
                <TableHead className="text-start">Duration</TableHead>
                <TableHead className="text-start">Date</TableHead>
                <TableHead className="text-start">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courseSessions
                ?.sort((a, b) => a.index - b.index)
                .map((session) => (
                  <TableRow key={session.index}>
                    <TableCell>{session.index}</TableCell>
                    <TableCell>{session.title}</TableCell>
                    <TableCell>{session.duration}</TableCell>
                    <TableCell>
                      {session.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant={"destructive"}
                        onClick={() => {
                          deleteSession(session.id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default EditVideoCoursePage;
