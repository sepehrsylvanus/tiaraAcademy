"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GridViewIcon from "@mui/icons-material/GridView";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PeopleIcon from "@mui/icons-material/People";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Link from "next/link";
import { useEffect } from "react";
import FeaturedCourse from "@/components/featuredCourses/FeaturedCourse";
export default function Home() {
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      console.log(user.primaryEmailAddress?.emailAddress);
    }
  }, [user]);
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.userContainer}>
          <SignedIn>
            <div className={styles.accountInfo}>
              <UserButton afterSignOutUrl="/" />
              <div className={styles.accountInfoDetails}>
                <span>{user?.fullName}</span>
                <span>{user?.primaryEmailAddress?.emailAddress}</span>
              </div>
            </div>
          </SignedIn>
          <SignedOut>
            <Link href={"/sign-in"}>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </Link>
          </SignedOut>
        </div>

        <div className={styles.iconsContainer}>
          <Link href={"#"} className={styles.iconContainer}>
            <GridViewIcon />
            <p className={styles.menuText}>Overview</p>
          </Link>
          <Link href={"#"} className={styles.iconContainer}>
            <AccessTimeIcon />
            <p className={styles.menuText}>Classes</p>
          </Link>
          <Link href={"#"} className={styles.iconContainer}>
            <WorkspacePremiumIcon />
            <p className={styles.menuText}>Grades</p>
          </Link>
          <Link href={"#"} className={styles.iconContainer}>
            <PeopleIcon />
            <p className={styles.menuText}>Teachers</p>
          </Link>
          <Link href={"#"} className={styles.iconContainer}>
            <NoteAltIcon />
            <p className={styles.menuText}>Notes</p>
          </Link>
        </div>
      </div>
      <div className={styles.main}>
       <section className={styles.featuredCourses}>
     <FeaturedCourse/>

       </section>
      </div>
    </div>
  );
}
