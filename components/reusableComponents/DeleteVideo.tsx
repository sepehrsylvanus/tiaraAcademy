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
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const DeleteVideo = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const id = formData.get("id") as string;
    try {
      await deleteVideo(formData);
    } catch (error) {
      toast.error("There was an error in uploading video:" + error);
    } finally {
      toast.success(`-${id}- deleted successfully`);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-between">
      <input
        className="formInput"
        placeholder="Enter Your Video id"
        name="id"
      />

      {loading ? (
        <Button disabled type="submit">
          <CircularProgress sx={{ color: "white", transform: "scale(.7)" }} />
        </Button>
      ) : (
        <Button type="submit">Delete</Button>
      )}
    </form>
  );
};

export default DeleteVideo;
