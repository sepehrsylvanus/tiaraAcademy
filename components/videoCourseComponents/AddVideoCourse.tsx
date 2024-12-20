"use client";
import React, {
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import z from "zod";
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

import TextEditor from "../TextEditor";
const AddVideoCourse = () => {
  const [loading, setLoading] = useState(false);
  const [materialsFile, setMaterialsFile] = useState<File>();
  // COURSE IMAGE CHOOSING
  const [selectedImage, setSelectedImage] = useState<string>();
  const [thumbnailRaw, setThumbnailRaw] = useState<File>();

 
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

  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

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
    setLoading(true);
    const videoCourseFormData = new FormData();
    videoCourseFormData.set("normalValues", JSON.stringify(values));
    videoCourseFormData.set("image", thumbnailRaw!);
    videoCourseFormData.set("language", selectedLanguage);
    videoCourseFormData.set("materials", materialsFile!);
    videoCourseFormData.set("tags", JSON.stringify(tags));
    const ifCourseCreated = await createVideoCourse(videoCourseFormData);
    if (ifCourseCreated) {
      toast.success(ifCourseCreated);
      setLoading(false);
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      setTags([...tags, trimmedInput]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // END OF TAG INPUT THINGS

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
                  <SelectItem value="general">General</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="w-full max-w-md mx-auto" id="preRequisitiesInput">
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center bg-lightText text-white px-2 py-1 rounded-md"
                  >
                    <span className="mr-1">{tag}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-4 h-4 p-0 hover:bg-primary-foreground/20"
                      onClick={() => removeTag(tag)}
                    >
                      <CloseIcon className="w-3 h-3" />
                      <span className="sr-only">Remove tag</span>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Add tags"
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  className="text-end text-lightText"
                />
                <Button
                  className="absolute right-1 top-1 h-8"
                  onClick={addTag}
                  disabled={!inputValue.trim()}
                >
                  Add Tag
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 p-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md flex-1">
              <Input
                id="materials"
                type="file"
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
                <TextEditor
                  textEditorContent={field.value}
                  setTextEditorContent={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="col-span-2">
          {loading ? "Loading..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default AddVideoCourse;
