"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Check, Key, Upload, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { S3 } from "aws-sdk";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { cn } from "@/lib/utils";
import { createNewPodcast } from "@/actions/podcasts.action";
import { toast } from "react-toastify";
import { Separator } from "./ui/separator";
import { useDeleteLivePodcast, useUploadLivePodcast } from "@/hooks/usePodcast";

const categories = [
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "entertainment", label: "Entertainment" },
  { value: "health", label: "Health & Wellness" },
  { value: "sports", label: "Sports" },
  { value: "news", label: "News & Politics" },
  { value: "music", label: "Music" },
  { value: "comedy", label: "Comedy" },
  { value: "arts", label: "Arts & Culture" },
];
export default function PodcastUploadForm() {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [thumbnailName, setThumbnailName] = useState("");
  const [thubmnailRaw, setThubmnailRaw] = useState<File>();
  const [thumbnailProgress, setThumbnailProgress] = useState(0);
  const [podcastProgress, setPodcastProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [audioFileName, setAudioFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [livePodcast, setLivePodcast] = useState("");

  const { mutate: uploadLivePodcast, isPending: uploadLiveLoading } =
    useUploadLivePodcast();
  const { mutate: deleteLivePodcast, isPending: deleteLiveLoading } =
    useDeleteLivePodcast();

  const handleUploadLive = () => {
    try {
      uploadLivePodcast(livePodcast);
    } catch (error: any) {
      return toast.error(error.message);
    }
  };

  const handleDeleteLive = async () => {
    try {
      deleteLivePodcast(livePodcast);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
      setThumbnailName(file.name);
      setThubmnailRaw(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
      setThumbnailName(file.name);
      setThubmnailRaw(file);
    }
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFileName(file.name);
      setAudioFile(file);
    }
  };

  const removeThumbnail = (e: React.MouseEvent) => {
    e.stopPropagation();
    setThumbnail(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const toggleCategory = (category: string) => {
    setSelectedCategories((current) => {
      if (current.includes(category)) {
        return current.filter((c) => c !== category);
      }
      return [...current, category];
    });
  };
  const removeCategory = (categoryToRemove: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedCategories((current) =>
      current.filter((category) => category !== categoryToRemove)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      const accessKeyId = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID!;
      const secretAccessKey = process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY!;
      const endpoint = process.env.NEXT_PUBLIC_LIARA_ENDPOINT!;
      const fileName = new Date().toISOString() + thumbnailName;
      const podcastName = new Date().toISOString() + audioFileName;
      const s3 = new S3({
        accessKeyId,
        secretAccessKey,
        endpoint,
      });
      const thumbnailParams = {
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key: fileName,
        Body: thubmnailRaw,
      };
      const podcastParams = {
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key: podcastName,
        Body: audioFile!,
      };

      const uploadThumbnail = s3.upload(thumbnailParams);
      const uploadPodcast = s3.upload(podcastParams);
      uploadThumbnail.on("httpUploadProgress", function (evt) {
        const progress = Math.round((evt.loaded / evt.total) * 100);
        setThumbnailProgress(progress);
      });
      uploadPodcast.on("httpUploadProgress", function (evt) {
        const progress = Math.round((evt.loaded / evt.total) * 100);
        setPodcastProgress(progress);
      });
      await uploadThumbnail.promise();
      await uploadPodcast.promise();
      const thumbnailLink = s3.getSignedUrl("getObject", {
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key: fileName,
        Expires: 31536000, // 1 year
      });

      const voiceLink = s3.getSignedUrl("getObject", {
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key: podcastName,
        Expires: 31536000, // 1 year
      });

      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("name", name);
      formData.append("imageLink", thumbnailLink);
      formData.append("imageName", fileName);
      formData.append("voiceLink", voiceLink);
      formData.append("voiceName", podcastName);
      formData.append("duration", duration);
      formData.append("categories", selectedCategories.join(","));
      const newPodcast = await createNewPodcast(formData);
      if (newPodcast) {
        toast.success(newPodcast);
      }
      setUploading(false);
    } catch (error: any) {
      toast.error(error.message);
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Podcast Name</Label>
            <Input
              id="name"
              placeholder="Enter podcast name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedCategories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={(e) => removeCategory(category, e)}
                >
                  {categories.find((c) => c.value === category)?.label}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  Select categories...
                  <Upload className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search categories..." />
                  <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup>
                      {categories.map((category) => (
                        <CommandItem
                          key={category.value}
                          onSelect={() => {
                            toggleCategory(category.value);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCategories.includes(category.value)
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {category.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <div
              onClick={handleImageClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                relative
                border-2 border-dashed rounded-lg p-4 
                min-h-[200px] flex items-center justify-center
                cursor-pointer
                transition-colors
                ${
                  isDragging
                    ? "border-primary bg-primary/10"
                    : "border-muted-foreground/25"
                }
                ${thumbnail ? "p-0 overflow-hidden" : ""}
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              {thumbnail ? (
                <div className="relative w-full h-[200px] group">
                  <Image
                    src={thumbnail || "/placeholder.svg"}
                    alt="Thumbnail preview"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="w-10 h-10"
                      onClick={removeThumbnail}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-2">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                  <div className="text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </div>
                  <div className="text-xs text-muted-foreground">
                    PNG, JPG or GIF (max. 2MB)
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audio">Podcast File</Label>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => audioInputRef.current?.click()}
              >
                Choose File
              </Button>
              <span className="text-sm text-muted-foreground">
                {audioFileName || "No file chosen"}
              </span>
              <input
                ref={audioInputRef}
                id="audio"
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Duration (in minutes)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              placeholder="Enter podcast duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={uploading}>
            {uploading
              ? `Thumbnail upload: ${thumbnailProgress}% / Podcast upload: ${podcastProgress}%`
              : "Upload Podcast"}
          </Button>
        </form>

        <Separator className="my-4" />
        <Input
          id="livePodcast"
          type="text"
          placeholder="Enter live podcast link"
          value={livePodcast}
          onChange={(e) => setLivePodcast(e.target.value)}
          className="mb-4"
        />
        <div className="flex flex-col gap-3">
          <Button
            onClick={handleUploadLive}
            className="w-full"
            disabled={uploadLiveLoading}
          >
            {uploadLiveLoading ? `Uploading live link...` : "Upload live link"}
          </Button>
          <Button
            onClick={handleDeleteLive}
            variant={"destructive"}
            className="w-full"
            disabled={deleteLiveLoading}
          >
            {deleteLiveLoading ? `Deleting live link...` : "Delete live link"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
