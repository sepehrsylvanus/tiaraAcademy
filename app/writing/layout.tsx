import styles from "./writing.module.css";
import { Divider } from "@mui/material";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  AccessTime,
  EditNote,
  GridView,
  NoteAlt,
  OndemandVideo,
  People,
} from "@mui/icons-material";
import CustomHamburger from "@/components/hamburger/CustomHamburger";
import { retrieveTeachers } from "@/actions/actions";

import Links from "./Links";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const teachers = await retrieveTeachers();
  return (
    <div className="flex flex-col px-4 md:pl-[5em] pb-6">
      <div className="ml-auto fixed top-0 right-0 md:hidden">
        <Popover>
          <PopoverTrigger>
            <div className="block lg:hidden">
              <CustomHamburger />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-fit
          "
          >
            <div className="flex flex-col w-fit justify-around px-6 gap-2">
              <Link href={"/home"} className="navLinkContainer">
                <span>Profile</span>
                <GridView />
              </Link>
              <Link href={"/classes"} className="navLinkContainer">
                <span>Classes</span>
                <AccessTime />
              </Link>
              <Link href={"/writing"} className="navLinkContainer">
                <span>Writing</span>
                <EditNote />
              </Link>
              <Link href={"/teachers"} className="navLinkContainer">
                <span>Teachers</span>
                <People />
              </Link>
              <Link href={"/blogs"} className="navLinkContainer">
                <span>Blogs</span>
                <NoteAlt />
              </Link>
              <Link href={"#"} className="navLinkContainer">
                <span>Videos</span>
                <OndemandVideo />
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <h1 className="my-4 h1 text-center text-2xl">Writing Section</h1>
      <p className="text-center">
        Welcome to the writing center. Here you can upload your writing file,
        write your writing here directly or even share with other learners
      </p>

      <Links teachers={teachers} />

      <div className="mt-6">{children}</div>
    </div>
  );
}
