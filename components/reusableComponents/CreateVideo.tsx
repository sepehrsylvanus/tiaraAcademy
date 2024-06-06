"use client";

import { Button } from "@/components/ui/button";

import React, { ChangeEvent, useEffect, useState } from "react";
import {
  deletePlaylist,
  getPlaylists,
  makePlaylist,
  postVideo,
} from "@/actions/actions";
import { toast } from "react-toastify";
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { SelectChangeEvent, selectClasses } from "@mui/material/Select";
import { root } from "postcss";
import styles from "./components.module.css";
import { playlists } from "@/constants";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Add, Delete } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Playlist } from "@/utils/types";
import { useGetPlaylists } from "@/hooks/usePlayList";
import { Type } from "@prisma/client";

const CreateVideo = ({ title }: { title: string }) => {
  const [loading, setLoading] = useState(false);
  const [playlist, setPlaylist] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState<string>();
  const [playlistType, setPlaylistType] = useState<Type>("public");
  const [playlistPrice, setPlaylistPrice] = useState("");
  const handlePlaylistChange = (e: SelectChangeEvent<string[]>) => {
    const selectedPlaylists = Array.isArray(e.target.value)
      ? e.target.value
      : [e.target.value];

    setPlaylist(selectedPlaylists);
  };
  const { data: playlists, isLoading, error } = useGetPlaylists();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({
      title,
      type,
      price,
    }: {
      title: string;
      type: Type;
      price: string;
    }) => makePlaylist(title, type, price),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPlaylist"] });
      toast.success("New playlist added");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: (title: string) => deletePlaylist(title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPlaylist"] });
      toast.success("Your desired deleted");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });
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
      const playlistData = {
        title: playlistTitle,
        type: playlistType!,
        price: playlistPrice,
      };
      mutation.mutate(playlistData);
    } else {
      console.error("Playlist title is undefined.");
    }
  };
  const handleDeletePlayList = () => {
    if (playlistTitle) {
      deleteMutation.mutate(playlistTitle);
    } else {
      console.error("There is error in deletion");
    }
  };

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
        <div className="flex flex-col w-full">
          <input
            type="text"
            placeholder="Add a new playlist then choose"
            name=""
            id=""
            className="w-full bg-transparent border-none outline-none"
            onChange={(e) => setPlaylistTitle(e.target.value)}
          />
          <RadioGroup
            row
            defaultValue={playlistType}
            onChange={(e) => {
              if (e.target.value === "private" || e.target.value === "public") {
                setPlaylistType(e.target.value);
              }
            }}
          >
            <FormControlLabel
              value="public"
              control={<Radio />}
              label="Public"
            />
            <FormControlLabel
              value="private"
              control={<Radio />}
              label="Private"
            />
          </RadioGroup>
          {playlistType === "private" && (
            <input
              type="text"
              placeholder="Price"
              name=""
              id=""
              className="w-full bg-transparent border-none outline-none"
              onChange={(e) => setPlaylistPrice(e.target.value)}
            />
          )}
        </div>
        <div
          onClick={handleDeletePlayList}
          className=" hover:scale-125 transition cursor-pointer"
        >
          <Delete />
        </div>
        <div
          onClick={handleMakePlayList}
          className=" hover:scale-125 transition cursor-pointer"
        >
          <Add />
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
