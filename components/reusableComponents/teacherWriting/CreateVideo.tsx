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
import { useState } from "react";

const createArticleForm = z.object({
  title: z.string(),
  time: z.string(),
  video: z.any(),
});

const CreateVideo = () => {
  const [file, setFile] = useState(null);
  const form = useForm<z.infer<typeof createArticleForm>>({
    resolver: zodResolver(createArticleForm),
  });

  function onSubmit(values: z.infer<typeof createArticleForm>) {
    axios
      .post("/api/videos", { values })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-3"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  className="formInput w-full"
                  placeholder="Title..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  className="formInput w-full"
                  placeholder="Time..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <input
          onChange={(e) => setFile(e.target.files[0])}
          className="formInput w-full "
          type="file"
          placeholder="Enter Your article title"
        />

        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};

export default CreateVideo;
