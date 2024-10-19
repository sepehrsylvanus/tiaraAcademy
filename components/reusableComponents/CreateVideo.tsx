"use client";

import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";

import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import styles from "./components.module.css";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useQueryClient } from "@tanstack/react-query";

import { useGetCategory } from "@/hooks/useCategory";
import { useTranslations } from "next-intl";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "../ui/form";
import { createArticle } from "@/actions/article";
import { toast } from "react-toastify";
const CreateVideo = ({ title }: { title: string }) => {
  const [articleImg, setArticleImg] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const t = useTranslations("videoBox");

  const { data: categories } = useGetCategory();

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

        <FormControl>
          <InputLabel
            classes={{
              focused: styles.selectLabel,
            }}
            id="playlist"
          >
            {t("Category")}
          </InputLabel>

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => {
              return (
                <Select
                  defaultValue={field.value}
                  onChange={field.onChange}
                  label={t("selectPlaylist")}
                  name="playlists"
                  sx={{ backgroundColor: "#c6d9e6", textAlign: "start" }}
                >
                  {title === "article" &&
                    categories?.map((category) => (
                      <MenuItem key={category.value} value={category.value}>
                        {category.title}
                      </MenuItem>
                    ))}
                </Select>
              );
            }}
          />
        </FormControl>

        <CKEditor
          editor={ClassicEditor}
          data={`<p>${t("eraseWriteArticle")} ❤️</p> `}
          onChange={(event, editor) => {
            setText(editor.getData());
          }}
        />
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
