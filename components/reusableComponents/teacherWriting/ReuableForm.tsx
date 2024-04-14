"use client";
import { ZodObject, ZodType, z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import axios from "axios";

const ReuableForm = () => {
  const formSchema = z.object({
    band: z.string().min(1),
    writing: z.string().min(10, { message: "Realy?! This short?!" }),
  });
  // FORM FUNCTIONS
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      writing: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    axios
      .post("/api/makePdf", { values })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
    console.log(values);
  }

  // ===========================

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="band"
          render={({ field }) => (
            <FormItem className="w-[30%]">
              <FormControl>
                <Input placeholder="Band..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="writing"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Write your writing here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ReuableForm;
