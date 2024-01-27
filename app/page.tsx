import Image from "next/image";
import styles from "./page.module.css";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GridViewIcon from "@mui/icons-material/GridView";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import PeopleIcon from "@mui/icons-material/People";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Link from "next/link";
export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.userContainer}>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
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
          <div className={styles.iconContainer}>
            <GridViewIcon />
          </div>
          <div className={styles.iconContainer}>
            <AccessTimeIcon />
          </div>
          <div className={styles.iconContainer}>
            <WorkspacePremiumIcon />
          </div>
          <div className={styles.iconContainer}>
            <PeopleIcon />
          </div>
          <div className={styles.iconContainer}>
            <NoteAltIcon />
          </div>
        </div>
      </div>
      <div className={styles.main}>main content</div>
    </div>
  );
}
