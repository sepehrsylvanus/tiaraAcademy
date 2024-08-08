"use client";

import { z } from "zod";
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
import { deleteArticle, deleteVideo } from "@/actions/actions";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";

const DeleteVideo = ({ title }: { title: string }) => {
  const [loading, setLoading] = useState(false);
  const [videoId, setvideoId] = useState("");
  const t = useTranslations("videoBox");
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const id = formData.get("id") as string;
    try {
      if (title === "video") {
        await deleteVideo(formData);
        toast.success(`-${id}- ${t("dSuccessfully")}`);
        setvideoId("");
      } else if (title === "article") {
        await deleteArticle(id);
        toast.success(`-${id}- ${t("dSuccessfully")}`);
        setvideoId("");
      }
    } catch (error) {
      toast.error(`${t("sError")} ${title}:` + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-between">
      <input
        className="formInput"
        placeholder={`${t("enter")} ${
          title === "video" ? t("video") : t("article")
        } ${t("id")}`}
        name="id"
        onChange={(e) => setvideoId(e.target.value)}
        value={videoId}
      />

      {loading ? (
        <Button disabled type="submit">
          <CircularProgress sx={{ color: "white", transform: "scale(.7)" }} />
        </Button>
      ) : (
        <Button type="submit">{t("delete")}</Button>
      )}
    </form>
  );
};

export default DeleteVideo;
