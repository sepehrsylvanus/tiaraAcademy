"use client";

import { Button } from "@/components/ui/button";

import { ChangeEvent, useState } from "react";
import { postVideo } from "@/actions/actions";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const CreateVideo = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    try {
      await postVideo(formData);
      toast.success(`-${title}- uploaded successfully`);
    } catch (error) {
      toast.error("There was an error in uploading video:" + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input className="formInput w-full" placeholder="Title..." name="title" />
      <input
        className="formInput w-full "
        type="file"
        placeholder="Enter Your article title"
        name="video"
        accept=".mp4, .mkv"
      />

      {loading ? (
        <Button disabled type="submit">
          <CircularProgress sx={{ color: "white", transform: "scale(.7)" }} />
        </Button>
      ) : (
        <Button type="submit">Create</Button>
      )}
    </form>
  );
};

export default CreateVideo;
