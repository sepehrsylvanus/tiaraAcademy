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
import { useUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const MAX_FILE_SIZE = 500 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const firstformSchema = z.object({
  name: z.string().min(2, { message: "Please enter a proper name" }),
  email: z.string().email({ message: "Please enter a proper email" }),
  subject: z.string().min(10, { message: "Enter a proper subject" }),
  subjectImg: z.any(),
  writing: z.string().min(20, { message: "You write too short for submit" }),
});
const secondformSchema = z.object({
  name: z.string().min(2, { message: "Please enter a proper name" }),
  email: z.string().email({ message: "Please enter a proper email" }),
  subject: z.string().min(10, { message: "Enter a proper subject" }),

  writing: z.string().min(20, { message: "You write too short for submit" }),
});

const WriteHere = () => {
  const { user } = useUser();
  console.log({ user });

  function onSubmitFirst(values: z.infer<typeof firstformSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  function onSubmitSecond(values: z.infer<typeof secondformSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  if (user) {
    const firstForm = useForm<z.infer<typeof firstformSchema>>({
      resolver: zodResolver(firstformSchema),
      defaultValues: {
        name: user?.firstName!,
        email: user?.emailAddresses[0].emailAddress,
        subject: "",
        subjectImg: null,

        writing: "",
      },
    });
    const secondForm = useForm<z.infer<typeof secondformSchema>>({
      resolver: zodResolver(secondformSchema),
      defaultValues: {
        name: user?.firstName!,
        email: user?.emailAddresses[0].emailAddress,
        subject: "",

        writing: "",
      },
    });

    const mainWritingFirst = firstForm.watch("writing");
    let wordCountFirst = 0;
    if (mainWritingFirst) {
      wordCountFirst = mainWritingFirst.trim().split(/\s+/).length;
    }
    const mainWritingSecond = secondForm.watch("writing");
    let wordCountSecond = 0;
    if (mainWritingSecond) {
      wordCountSecond = mainWritingSecond.trim().split(/\s+/).length;
    }
    const formInput =
      "bg-[#c6d9e6] text-lightText px-2 py-2 rounded-md outline-none";
    return (
      <div>
        {user && (
          <Tabs
            defaultValue="chart"
            className=" mx-auto flex flex-col items-center "
          >
            <TabsList className="w-[20rem] sm:w-[25rem] md:w-[40rem] lg:w-[50rem] bg-extraText text-lightPrime">
              <TabsTrigger value="chart">First Section</TabsTrigger>
              <TabsTrigger value="essay">Second Section</TabsTrigger>
            </TabsList>
            <TabsContent value="chart">
              <Card className="w-[20rem] sm:w-[25rem] md:w-[40rem] lg:w-[50rem] p-4 bg-extraText text-lightPrime">
                <Form {...firstForm}>
                  <form
                    onSubmit={firstForm.handleSubmit(onSubmitFirst)}
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
                              {...field}
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
                          <FormDescription>
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
            </TabsContent>
            <TabsContent value="essay">
              <Card className="w-[20rem] sm:w-[25rem] md:w-[40rem] lg:w-[50rem] p-4 bg-extraText text-lightPrime">
                <Form {...secondForm}>
                  <form
                    onSubmit={secondForm.handleSubmit(onSubmitSecond)}
                    className="space-y-2"
                  >
                    <p className="h3 text-center">
                      Here you can write and send your second section writing
                    </p>
                    <FormField
                      control={secondForm.control}
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
                      control={secondForm.control}
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
                      control={secondForm.control}
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
                      control={secondForm.control}
                      name="writing"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Main writing</FormLabel>
                          <FormControl>
                            <Input
                              className={formInput}
                              placeholder="Write your writing"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {wordCountSecond} / 250
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </Card>
            </TabsContent>
          </Tabs>
        )}

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
  } else {
    return <p className="font-bold text-xl"> Loading your info...</p>;
  }
};

export default WriteHere;
