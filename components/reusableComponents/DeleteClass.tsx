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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { CircularProgress } from "@mui/material";

const deleeteArticleForm = z.object({
  id: z.string(),
});

const DeleteClass = () => {
  const [sending, setSending] = useState(false);
  const form = useForm<z.infer<typeof deleeteArticleForm>>({
    resolver: zodResolver(deleeteArticleForm),
  });

  function onSubmit(values: z.infer<typeof deleeteArticleForm>) {
    setSending(true);
    axios
      .delete(`/api/classes/${values.id}`, {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      .then((res) => {
        toast.success(res.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSending(false);
      })
      .catch((e) => {
        toast.error(e.response.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSending(false);
      });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center justify-between"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  className="w-full formInput"
                  placeholder="Enter Your class id"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {sending ? (
            <div style={{ transform: "scale(.7)" }}>
              <CircularProgress sx={{ color: "white" }} />
            </div>
          ) : (
            "Delete"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default DeleteClass;
