"use client";

import { Button } from "@/components/ui/button";

import React, { ChangeEvent, useEffect, useState } from "react";
import { getPlaylists, makePlaylist, postVideo } from "@/actions/actions";
import { toast } from "react-toastify";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { SelectChangeEvent, selectClasses } from "@mui/material/Select";
import { root } from "postcss";
import styles from "./components.module.css";
import { playlists } from "@/constants";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Playlist } from "@/utils/types";
import { useGetPlaylists } from "@/hooks/usePlayList";

const CreateVideo = ({ title }: { title: string }) => {
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState<string>();
  const handlePlaylistChange = (e: SelectChangeEvent<string[]>) => {
    const selectedPlaylists = Array.isArray(e.target.value)
      ? e.target.value
      : [e.target.value];

    setPlaylist(selectedPlaylists);
  };
  const { data: playlists, isLoading, error } = useGetPlaylists();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;

    formData.set("caption", caption);
    const myCaption = formData.get("caption");
    console.log(myCaption);
    try {
      await postVideo(formData);
      toast.success(`-${title}- uploaded successfully`);
    } catch (error) {
      toast.error("There was an error in uploading video:" + error);
    } finally {
      setLoading(false);
    }
  };
  const handleMakePlayList = () => {
    if (playlistTitle) {
      mutation.mutate(playlistTitle);
    } else {
      console.error("Playlist title is undefined.");
    }
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (title: string) => makePlaylist(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPlaylist"] });
      toast.success("New playlist added");
    },
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
      <input className="formInput w-full" placeholder="Title..." name="title" />
      <input
        className="formInput w-full "
        type="file"
        placeholder="Enter Your article title"
        name="video"
        accept=".mp4, .mkv"
      />
      <div className="formInput flex items-center">
        <input
          type="text"
          placeholder="add a new playlist then choose"
          name=""
          id=""
          className="w-full bg-transparent border-none outline-none"
          onChange={(e) => setPlaylistTitle(e.target.value)}
        />
        <div
          onClick={handleMakePlayList}
          className=" hover:scale-125 transition cursor-pointer"
        >
          <AddIcon />
        </div>
      </div>
      <FormControl>
        <InputLabel
          classes={{
            focused: styles.selectLabel,
          }}
          id="playlist"
        >
          Playlist
        </InputLabel>

        <Select
          defaultValue={playlist}
          onChange={handlePlaylistChange}
          multiple
          label="Select your playlist"
          name="playlists"
          sx={{ backgroundColor: "#c6d9e6", textAlign: "start" }}
        >
          {playlists?.map((playlist) => (
            <MenuItem key={playlist.value} value={playlist.value}>
              {playlist.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <CKEditor
        editor={ClassicEditor}
        data="<p>Erase this and write your caption ❤️</p>"
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
        <Button type="submit">Create</Button>
      )}
    </form>
  );
};

export default CreateVideo;
