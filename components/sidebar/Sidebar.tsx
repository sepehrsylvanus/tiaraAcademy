"use client";
import React, { useEffect, useState } from "react";
import styles from "./sidebar.module.css";
import Link from "next/link";

import GridViewIcon from "@mui/icons-material/GridView";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleIcon from "@mui/icons-material/People";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { getToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import { UserProps } from "@/utils/types";

import ClerkAvatar from "../reusableComponents/ClerkAvatar";
import { CircularProgress } from "@mui/material";
import { useGetPlaylists } from "@/hooks/usePlayList";

const Sidebar = () => {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<UserProps>();

  const { data: playlists, isLoading, error } = useGetPlaylists();
  useEffect(() => {
    const retrieveToken = async () => {
      const token = await getToken();

      if (token) {
        setToken(token?.value);
      }
    };

    retrieveToken();
  }, []);

  useEffect(() => {
    const getUserInformation = async (token: string) => {
      const userInfo = await getSingleUser(token)!;

      if (userInfo) {
        setUser(userInfo);
      }
    };
    if (token) {
      getUserInformation(token);
    }
  }, [token]);

  return (
    <div className={styles.sidebar}>
      <div className={styles.userContainer}>
        <div className={styles.accountInfo}>
          <ClerkAvatar />

          <div className={styles.accountInfoDetails}>
            {user ? (
              <>
                <span>{`${user?.fName} ${user?.lName}`}</span>
                <span>{user?.email}</span>
              </>
            ) : (
              <CircularProgress
                sx={{ color: "black", transform: "scale(.7)" }}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.iconsContainer}>
        <Link href={"/hub"} className={styles.iconContainer}>
          <GridViewIcon />
          <p className={styles.menuText}>Hub</p>
        </Link>
        <Link href={"/hub/classes"} className={styles.iconContainer}>
          <AccessTimeIcon />
          <p className={styles.menuText}>Classes</p>
        </Link>
        <Link href={"/hub/writing"} className={styles.iconContainer}>
          <EditNoteIcon />
          <p className={styles.menuText}>Writing</p>
        </Link>
        <Link href={"/hub/teachers"} className={styles.iconContainer}>
          <PeopleIcon />
          <p className={styles.menuText}>Teachers</p>
        </Link>
        <Link href={"/hub/blogs"} className={styles.iconContainer}>
          <NoteAltIcon />
          <p className={styles.menuText}>Blog</p>
        </Link>
        <Link href={"/hub/videos"} className={styles.iconContainer}>
          <OndemandVideoIcon />
          <p className={styles.menuText}>Videos</p>
        </Link>

        <div className="w-full">
          <div className="flex justify-center border-b border-dashed border-white">
            <h3 className="h3  inline ">P</h3>
            <h3 className={`${styles.menuText}  h3 `}>laylists</h3>
          </div>
          <div className="flex flex-col space-y-2 pt-4 overflow-y-scroll ">
            {isLoading ? (
              <CircularProgress
                sx={{ color: "black", transform: "scale(.7)" }}
              />
            ) : (
              playlists?.map((playlist) => (
                <Link
                  href={`/hub/videos/playlist/${playlist.value}`}
                  className=" hover:bg-white transition px-2"
                >
                  {playlist.title}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
