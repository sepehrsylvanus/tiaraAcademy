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
import ReactQuill from "react-quill";
import { postTeacherAnswer } from "@/actions/actions";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
type TeacherWritingProps = {
  writingId?: string;
  writingFileId?: string;
};
const ReuableForm = ({ writingId, writingFileId }: TeacherWritingProps) => {
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    band: z.string().min(1),
    writingSelf: z.string().min(10, { message: "Realy?! This short?!" }),
  });
  // FORM FUNCTIONS
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const wirtingAnswerData = { ...values, writingFileId, writingId };
    try {
      await postTeacherAnswer(wirtingAnswerData);
      toast.success("Your answer submited");
    } catch (error) {
      toast.error(`There was a problem in submitting answer : ${error}`);
    } finally {
      setLoading(false);
    }
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
          name="writingSelf"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Write your writing here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {loading ? (
          <Button disabled type="submit">
            <CircularProgress sx={{ color: "white", transform: "scale(.7)" }} />
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
};

export default ReuableForm;
