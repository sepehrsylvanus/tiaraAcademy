"use client";

import { Button } from "@/components/ui/button";

import React, { ChangeEvent, useEffect, useState } from "react";
import { deleteCategory, makeArticle, makeCategories } from "@/actions/actions";
import { toast } from "react-toastify";
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
import { Add, Delete } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useGetCategory } from "@/hooks/useCategory";
import { useTranslations } from "next-intl";

const CreateVideo = ({ title }: { title: string }) => {
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState<string>();

  const [playlistPrice, setPlaylistPrice] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const t = useTranslations("videoBox");
  const handlePlaylistChange = (e: SelectChangeEvent<string[]>) => {
    const selectedPlaylists = Array.isArray(e.target.value)
      ? e.target.value
      : [e.target.value];

    setPlaylist(selectedPlaylists);
  };

  const { data: categories } = useGetCategory();
  useEffect(() => {
    console.log(playlistDescription);
  }, [playlistDescription]);

  const queryClient = useQueryClient();

  const deleteCatMutation = useMutation({
    mutationFn: async (title: string) => await deleteCategory(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCategory"] });
      toast.success(t("categoryDeleted"));
    },
  });
  const createCatMutation = useMutation({
    mutationFn: ({ title }: { title: string }) => makeCategories(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCategory"] });
      toast.success(t("categoryAdded"));
    },
  });

  return (
    <form className="flex flex-col space-y-3">
      <input
        className="formInput w-full"
        placeholder={t("title")}
        name="title"
      />
      <input
        className="formInput w-full "
        type="file"
        placeholder={t("articleTitle")}
        name={title === "video" ? "video" : "image"}
        accept={title === "video" ? ".mp4, .mkv" : ".jpg, .jpeg, .png"}
        required
      />
      <div className="formInput flex items-center">
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder={`${t("addANew")} ${
              title === "video" ? t("playlist") : t("category")
            } ${t("thenChoose")}`}
            className="w-full bg-transparent border-none outline-none"
            onChange={(e) => setPlaylistTitle(e.target.value)}
          />

          {title === "video" && (
            <input
              type="text"
              name="description"
              value={playlistDescription}
              onChange={(e) => setPlaylistDescription(e.target.value)}
              placeholder={t("description")}
              className="w-full bg-transparent border-none outline-none border-trans"
            />
          )}
        </div>
      </div>

      <FormControl>
        <InputLabel
          classes={{
            focused: styles.selectLabel,
          }}
          id="playlist"
        >
          {title === "video" ? t("Playlist") : t("Category")}
        </InputLabel>

        <Select
          defaultValue={playlist}
          onChange={handlePlaylistChange}
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
      </FormControl>

      <CKEditor
        editor={ClassicEditor}
        data={`<p>${t("eraseWriteArticle")} ❤️</p> `}
        onChange={(event, editor) => {
          console.log(editor.getData());
          setCaption(editor.getData());
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
  );
};

export default CreateVideo;
