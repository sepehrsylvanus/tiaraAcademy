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

const Sidebar = () => {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<UserProps>();

  useEffect(() => {
    const retrieveToken = async () => {
      const token = await getToken();
      console.log(token?.value);
      if (token) {
        setToken(token?.value);
      }
    };

    retrieveToken();
  }, []);

  useEffect(() => {
    const getUserInformation = async (token: string) => {
      const userInfo = await getSingleUser(token)!;
      console.log(userInfo);
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
            <span>{`${user?.fName} ${user?.lName}`}</span>
            <span>{user?.email}</span>
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
      </div>
    </div>
  );
};

export default Sidebar;
