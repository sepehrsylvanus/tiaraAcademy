'use client'
import React from 'react'
import styles from './sidebar.module.css'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link';
import { Avatar } from '@mui/material';
import PersonIcon from "@mui/icons-material/Person";
import GridViewIcon from "@mui/icons-material/GridView";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PeopleIcon from "@mui/icons-material/People";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

const Sidebar = () => {
  const { user } = useUser();
  return (
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
      <Link href={"/"} className={styles.iconContainer}>
        <GridViewIcon />
        <p className={styles.menuText}>Overview</p>
      </Link>
      <Link href={"/myClass"} className={styles.iconContainer}>
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
  )
}

export default Sidebar