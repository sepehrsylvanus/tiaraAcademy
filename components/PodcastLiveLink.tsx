"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDeleteLivePodcast, useUploadLivePodcast } from "@/hooks/usePodcast";
import { toast } from "react-toastify";
const PodcastLiveLink = () => {
  const [livePodcast, setLivePodcast] = useState("");
  const { mutate: uploadLivePodcast, isPending: uploadLiveLoading } =
    useUploadLivePodcast();
  const handleUploadLive = () => {
    try {
      uploadLivePodcast(livePodcast);
    } catch (error: any) {
      return toast.error(error.message);
    }
  };

  const { mutate: deleteLivePodcast, isPending: deleteLiveLoading } =
    useDeleteLivePodcast();
  const handleDeleteLive = async () => {
    try {
      deleteLivePodcast(livePodcast);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Input
        id="livePodcast"
        type="text"
        placeholder="Enter live podcast link"
        value={livePodcast}
        onChange={(e) => setLivePodcast(e.target.value)}
        className="mb-4"
      />
      <div className="flex flex-col gap-3">
        <Button
          onClick={handleUploadLive}
          className="w-full"
          disabled={uploadLiveLoading}
        >
          {uploadLiveLoading ? `Uploading live link...` : "Upload live link"}
        </Button>
        <Button
          onClick={handleDeleteLive}
          variant={"destructive"}
          className="w-full"
          disabled={deleteLiveLoading}
        >
          {deleteLiveLoading ? `Deleting live link...` : "Delete live link"}
        </Button>
      </div>
    </>
  );
};

export default PodcastLiveLink;
