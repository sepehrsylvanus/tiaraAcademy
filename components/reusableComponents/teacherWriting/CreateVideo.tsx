"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { postVideo } from "@/actions/actions";

const CreateVideo = () => {
  const [video, setVideo] = useState<File>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideo(e.target.files[0]);
    } else {
      console.log("There is no video");
    }
  };

  return (
    <form action={postVideo} className="flex flex-col space-y-3">
      <input className="formInput w-full" placeholder="Title..." name="title" />
      <input
        onChange={handleChange}
        className="formInput w-full "
        type="file"
        placeholder="Enter Your article title"
        name="video"
        accept=".mp4, .mkv"
      />

      <Button type="submit">Create</Button>
    </form>
  );
};

export default CreateVideo;
