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
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useTranslations } from "next-intl";
const Sidebar = () => {
  const t = useTranslations("SideBar");
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<UserProps>();

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
    console.log(user);
  }, [user]);

  useEffect(() => {
    const getUserInformation = async () => {
      const userInfo = await getSingleUser()!;

      if (userInfo) {
        setUser(userInfo);
      }
    };
    if (token) {
      getUserInformation();
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
          <p className={styles.menuText}>{t("hub")}</p>
        </Link>
        <Link href={"/hub/classes"} className={styles.iconContainer}>
          <AccessTimeIcon />
          <p className={styles.menuText}>{t("classes")}</p>
        </Link>
        <Link href={"/hub/writing"} className={styles.iconContainer}>
          <EditNoteIcon />
          <p className={styles.menuText}>{t("writing")}</p>
        </Link>
        <Link href={"/hub/teachers"} className={styles.iconContainer}>
          <PeopleIcon />
          <p className={styles.menuText}>{t("teachers")}</p>
        </Link>
        <Link href={"/hub/blogs"} className={styles.iconContainer}>
          <NoteAltIcon />
          <p className={styles.menuText}>{t("blog")}</p>
        </Link>
        <Link href={"/hub/videos"} className={styles.iconContainer}>
          <OndemandVideoIcon />
          <p className={styles.menuText}>{t("videos")}</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
