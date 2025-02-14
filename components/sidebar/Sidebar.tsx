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

import ClerkAvatar from "../reusableComponents/ClerkAvatar";
import { CircularProgress } from "@mui/material";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { useGetUser } from "@/hooks/useUsers";
import { Podcast } from "lucide-react";
const Sidebar = () => {
  const t = useTranslations("SideBar");
  const { data: user, isLoading: userLoading } = useGetUser();
  if (!userLoading) {
    return (
      <div>
        <div
          className={`${styles.sidebar} ${
            !user ? "opacity-20 relative pointer-events-none" : ""
          }`}
        >
          <div className={styles.userContainer}>
            <div className={styles.accountInfo}>
              <ClerkAvatar />

              <div className={styles.accountInfoDetails}>
                {!userLoading ? (
                  <>
                    {user ? (
                      <>
                        <span>{`${user?.fName} ${user?.lName}`}</span>
                        <span>{user?.email}</span>
                      </>
                    ) : (
                      <>
                        <span></span>
                        <span></span>
                      </>
                    )}
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
            <Link href={"/hub/videos"} className={styles.iconContainer}>
              <OndemandVideoIcon />
              <p className={styles.menuText}>{t("videos")}</p>
            </Link>
            <Link href={"/hub/writing"} className={styles.iconContainer}>
              <EditNoteIcon />
              <p className={styles.menuText}>{t("writing")}</p>
            </Link>
            <Link href={"/hub/podcasts"} className={styles.iconContainer}>
              <Podcast />
              <p className={styles.menuText}>{t("podcast")}</p>
            </Link>
            <Link href={"/hub/blogs"} className={styles.iconContainer}>
              <NoteAltIcon />
              <p className={styles.menuText}>{t("blog")}</p>
            </Link>

            <Link href={"/hub/teachers"} className={styles.iconContainer}>
              <PeopleIcon />
              <p className={styles.menuText}>{t("teachers")}</p>
            </Link>
          </div>
        </div>
        {!user && (
          <p className="z-10 rotate-90 fixed ltr:-left-[11.3rem] rtl:-right-[13.7rem] top-1/2 flex gap-4 items-center">
            {t("haveToLogin")}
            <Link href={"/sign-in"}>
              <Button>{t("login")}</Button>
            </Link>
          </p>
        )}
      </div>
    );
  }
};

export default Sidebar;
