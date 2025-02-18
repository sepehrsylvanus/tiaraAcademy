import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDeletePodcast } from "@/hooks/usePodcast";
import { toast } from "react-toastify";

const PodcastDelete = () => {
  const [podcastId, setPodcastId] = useState("");
  const { mutate: deletePodcast, isPending: loadingDeletePodcast } =
    useDeletePodcast();
  const handleDeletePodcast = () => {
    try {
      deletePodcast(podcastId);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Input
        id="livePodcast"
        type="text"
        placeholder="Enter podcast ID"
        value={podcastId}
        onChange={(e) => setPodcastId(e.target.value)}
        className="mb-4"
      />
      <div className="flex flex-col gap-3">
        <Button
          onClick={handleDeletePodcast}
          className="w-full"
          disabled={loadingDeletePodcast}
          variant={"destructive"}
        >
          {loadingDeletePodcast ? `Deleting podcast...` : "Delete Podcast"}
        </Button>
      </div>
    </>
  );
};

export default PodcastDelete;
