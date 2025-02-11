"use client";

import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";

import { CircularProgress } from "@mui/material";

import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import { createArticle } from "@/actions/article";
import { toast } from "react-toastify";
import TextEditor from "../TextEditor";
const CreateVideo = ({ title }: { title: string }) => {
  const [articleImg, setArticleImg] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const t = useTranslations("videoBox");

  const formSchema = z.object({
    english: z.boolean(),
    title: z.string(),
    category: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      english: true,
      title: "",
      category: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const formData = new FormData();
    const language = values.english;
    const title = values.title;
    const category = values.category;
    formData.set("text", text);
    formData.set("articleImg", articleImg!);

    const ifCreated = await createArticle(language, title, category, formData);

    if (ifCreated) {
      toast.success("Article created successfully");
    }
    setLoading(false);
    form.reset();
    setText("");
    setArticleImg(undefined);
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col space-y-3"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-2">
          <FormField
            control={form.control}
            name="english"
            render={({ field }) => (
              <>
                <Label htmlFor="articleLanguage">Persian</Label>
                <Checkbox
                  id="articleLanguage"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <input
              {...field}
              className="formInput w-full"
              placeholder={t("title")}
              name="title"
            />
          )}
        />
        <input
          className="formInput w-full "
          type="file"
          placeholder={t("articleTitle")}
          name={title === "video" ? "video" : "image"}
          accept={".jpg, .jpeg, .png"}
          required
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setArticleImg(e.target.files[0]);
            }
          }}
        />

        <TextEditor textEditorContent={text} setTextEditorContent={setText} />
        {loading ? (
          <Button disabled type="submit">
            <CircularProgress sx={{ color: "white", transform: "scale(.7)" }} />
          </Button>
        ) : (
          <Button type="submit">{t("create")}</Button>
        )}
      </form>
    </Form>
  );
};

export default CreateVideo;
