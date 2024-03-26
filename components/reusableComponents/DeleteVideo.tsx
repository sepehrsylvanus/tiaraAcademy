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
const deleteVideo = z.object({
  id: z.string(),
});

const DeleteVideo = () => {
  const form = useForm<z.infer<typeof deleteVideo>>({
    resolver: zodResolver(deleteVideo),
  });

  function onSubmit(values: z.infer<typeof deleteVideo>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                  className="formInput"
                  placeholder="Enter Your Video id"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Delete</Button>
      </form>
    </Form>
  );
};

export default DeleteVideo;
