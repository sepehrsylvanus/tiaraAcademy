"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { deleteVideo } from "@/actions/actions";

const DeleteVideo = () => {
  return (
    <form action={deleteVideo} className="flex items-center justify-between">
      <input
        className="formInput"
        placeholder="Enter Your Video id"
        name="id"
      />

      <Button type="submit">Delete</Button>
    </form>
  );
};

export default DeleteVideo;
