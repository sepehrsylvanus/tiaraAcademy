"use client";
import { getToken } from "@/actions/actions";

import { Card, CardContent, Chip, Skeleton } from "@mui/material";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { getSingleUser } from "@/actions/userActions";
import { toast } from "react-toastify";
import { User } from "@/utils/types";
import { userGetPlaylist } from "@/hooks/usePlayList";
import styles from "@/app/hub/teachers/teacher.module.css";

type ParamsProps = {
  params: {
    playlistName: string;
  };
};
const PlayListPage = async ({ params }: ParamsProps) => {
  const [currentUser, setCurrentUser] = useState<User>();

  // const [thisPlaylist, setThisPlaylist] = useState<PlaylistUsers[]>();
  // const [isLoading, setIsLoading] = useState();
  const { data: thisPlaylist, isLoading } = userGetPlaylist(
    params.playlistName.replace("%20", " ").charAt(0).toUpperCase() +
      params.playlistName.slice(1)
  );
  console.log(params.playlistName.split("%20").join(" "));

  console.log(thisPlaylist);

  useEffect(() => {
    const renderPage = async () => {
      const token = await getToken()!;
      const currentUser = (await getSingleUser()) as User;

      setCurrentUser(currentUser);

      // const { data: thisPlaylist, isLoading } = userGetPlaylist(
      //   params.playlistName.charAt(0).toUpperCase() +
      //     params.playlistName.slice(1)
      // );
      // console.log(thisPlaylist);
      // setThisPlaylist(thisPlaylist);
    };
    renderPage();
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="lg:pl-[3.5em] pt-8">
      <h1 className="h1 text-center">
        {params.playlistName.toUpperCase().split("%20").join(" ")}
      </h1>
    </div>
  );
};

export default PlayListPage;
