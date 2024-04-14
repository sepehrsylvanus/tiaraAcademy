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

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import { S3 } from "aws-sdk";

const firstformSchema = z.object({
  name: z.string().min(2, { message: "Please enter a proper name" }),
  email: z.string().email({ message: "Please enter a proper email" }),
  subject: z.string().min(10, { message: "Enter a proper subject" }),
  subjectImg: z.any().optional(),
  writing: z.string().min(20, { message: "You write too short for submit" }),
});

const WriteHere = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };
  async function onSubmit(values: z.infer<typeof firstformSchema>) {
    console.log(selectedImage);

    if (!selectedImage) {
      console.log("this");
      return;
    }
    console.log("triggered");
    console.log(selectedImage);
    try {
      if (!selectedImage) {
        console.log("first");
        return;
      }
      const s3 = new S3({
        accessKeyId: "1qspivhiftlet1iu",
        secretAccessKey: "6dfcc5d7-02d2-4bcd-9454-00df7b69400b",
        endpoint: "storage.iran.liara.space",
      });
      const params = {
        Bucket: "hopeful-jackson-2u3gb-pjh",
        Key: selectedImage.name,
        Body: selectedImage,
      };
      const res = await s3.upload(params).promise();
      const permanentSignedUrl = s3.getSignedUrl("getObject", {
        Bucket: "hopeful-jackson-2u3gb-pjh",
        Key: selectedImage.name,
        Expires: 31536000, // 1 year
      });
      console.log(res);
      console.log(permanentSignedUrl);
    } catch (error) {}
    console.log(values);
  }

  const firstForm = useForm<z.infer<typeof firstformSchema>>({
    resolver: zodResolver(firstformSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      subjectImg: null,

      writing: "",
    },
  });

  const mainWritingFirst = firstForm.watch("writing");
  let wordCountFirst = 0;
  if (mainWritingFirst) {
    wordCountFirst = mainWritingFirst.trim().split(/\s+/).length;
  }

  const formInput =
    "bg-[#c6d9e6] text-lightText px-2 py-2 rounded-md outline-none";
  return (
    <div>
      <Card className="w-[20rem] sm:w-[25rem] md:w-[40rem] lg:w-[50rem] p-4 bg-extraText text-lightPrime mx-auto">
        <Form {...firstForm}>
          <form
            onSubmit={firstForm.handleSubmit(onSubmit)}
            className="space-y-2 "
          >
            <p className="h3 text-center">
              Here you can write and send your first section writing
            </p>

            <FormField
              control={firstForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      className={formInput}
                      placeholder="Write your name"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={firstForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className={formInput}
                      placeholder="Write your email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={firstForm.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject title</FormLabel>
                  <FormControl>
                    <Input
                      className={formInput}
                      placeholder="Write your subject"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={firstForm.control}
              name="subjectImg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject image</FormLabel>
                  <FormControl>
                    <Input
                      className={formInput}
                      accept="image/jpg, image/jpeg, image/png"
                      type="file"
                      placeholder="Write your subject"
                      onChange={handleImageChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={firstForm.control}
              name="writing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main writing</FormLabel>
                  <FormControl>
                    <Textarea
                      className={formInput}
                      placeholder="Write your writing..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-white">
                    {wordCountFirst} / 250
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </Card>
      {firstForm.getValues("subjectImg") && (
        <img
          src={firstForm.getValues("subjectImg")}
          width={25}
          height={25}
          alt="test"
        />
      )}
    </div>
  );
};

export default WriteHere;
