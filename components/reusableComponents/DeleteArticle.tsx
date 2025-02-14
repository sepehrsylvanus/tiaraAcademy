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
import { deleteArticle } from "@/actions/article";
import { toast } from "react-toastify";
const deleeteArticleForm = z.object({
  id: z.string(),
});

const DeleteArticle = () => {
  const form = useForm<z.infer<typeof deleeteArticleForm>>({
    resolver: zodResolver(deleeteArticleForm),
  });

  async function onSubmit(values: z.infer<typeof deleeteArticleForm>) {
    const ifDeleted = await deleteArticle(values.id);
    if (ifDeleted) {
      toast.warning("Article deleted successfully");
      form.reset();
    }
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
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="w-10/12 bg-[#c6d9e6] outline-none border-none text-lightText"
                  placeholder="Enter Your article id..."
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

export default DeleteArticle;
