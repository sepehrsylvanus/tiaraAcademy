"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { deleteVideoCourse } from "@/actions/videos/videos.action";
import { toast } from "react-toastify";

const DeleteVideoCourse = () => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const formSchema = z.object({
    id: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setDeleteLoading(true);
      const deleteCourse = await deleteVideoCourse(values.id);
      toast.warning(deleteCourse);
      setDeleteLoading(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
      setDeleteLoading(false);
    }
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-between"
        >
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Enter desired video course id... "
                    {...field}
                    className="w-10/12 bg-[#c6d9e6] outline-none border-none text-lightText 
                  "
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            {deleteLoading ? "Deleting..." : "Delete"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DeleteVideoCourse;
