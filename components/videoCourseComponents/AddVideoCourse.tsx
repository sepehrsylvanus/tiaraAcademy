"use client";
import React, { useEffect, useRef, useState } from "react";
import z from "zod";
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
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CloseIcon from "@mui/icons-material/Close";
import { Textarea } from "@/components/ui/textarea";
import { createVideoCourse } from "@/actions/videos/videos.action";
import { toast } from "react-toastify";

const courseDetailsForm = z.object({
  title: z.string().min(2).max(50),
  price: z.number(),
  description: z.string(),
  explenation: z.string(),
});
const AddVideoCourse = () => {
  const [materialsFile, setMaterialsFile] = useState<File>();
  // COURSE IMAGE CHOOSING
  const [selectedImage, setSelectedImage] = useState<string>();
  const [thumbnailRaw, setThumbnailRaw] = useState<File>();
  useEffect(() => {
    console.log(materialsFile);
  }, [materialsFile]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [selectedImage]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setThumbnailRaw(file);
    }
  };
  const handlePreviewClick = () => {
    fileInputRef.current?.click();
  };
  //   END OF CHOOSING COURSE IMAGE
  //   TAG INPUT
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  //   END OF TAG INPUT
  const [selectedLanguage, setSelectedLanguage] = React.useState("");

  const form = useForm<z.infer<typeof courseDetailsForm>>({
    resolver: zodResolver(courseDetailsForm),
    defaultValues: {
      title: "",

      description: "",
      explenation: "",
    },
    mode: "onChange",
    shouldUseNativeValidation: false,
    criteriaMode: "all",
    reValidateMode: "onBlur",
  });
  async function onSubmit(values: z.infer<typeof courseDetailsForm>) {
    const videoCourseFormData = new FormData();
    videoCourseFormData.set("normalValues", JSON.stringify(values));
    videoCourseFormData.set("image", thumbnailRaw!);
    videoCourseFormData.set("language", selectedLanguage);
    videoCourseFormData.set("materials", materialsFile!);
    const ifCourseCreated = await createVideoCourse(videoCourseFormData);
    console.log(ifCourseCreated);
    if (ifCourseCreated) {
      toast.success(ifCourseCreated);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 w-full"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  className="text-lightText "
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Price"
                  {...field}
                  className="text-lightText"
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 grid  grid-cols-2 gap-4">
          <div className="">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
              aria-label="Choose an image"
            />
            <div
              className="w-full h-32 rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
              onClick={handlePreviewClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handlePreviewClick();
                }
              }}
              aria-label={selectedImage ? "Change image" : "Select an image"}
            >
              {selectedImage ? (
                <img
                  src={selectedImage ?? ""}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-gray-500 flex flex-col items-center">
                  <AddPhotoAlternateIcon className=" mb-2" />
                  <span>Click to select an image</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-4">
            <Select
              onValueChange={setSelectedLanguage}
              value={selectedLanguage}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent className="bg-white flex-1">
                <SelectGroup>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md flex-1">
              <Input
                id="materials"
                type="file"
                value={inputValue}
                onChange={(e) => setMaterialsFile(e.target.files?.[0])}
                className="hidden"
              />
              {!materialsFile && (
                <label
                  htmlFor="materials"
                  className="text-lightText cursor-pointer "
                >
                  Choose your materials file
                </label>
              )}
              {materialsFile && (
                <label
                  htmlFor="materials"
                  className="text-lightText cursor-pointer "
                >{`${materialsFile.name} has been chosen`}</label>
              )}
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Description"
                  className="col-span-2 resize-none text-lightText outline-none"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explenation"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Explenation"
                  className="col-span-2 resize-none text-lightText outline-none"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="col-span-2">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddVideoCourse;
