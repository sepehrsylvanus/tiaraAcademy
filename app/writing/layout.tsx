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
          <PopoverContent>
            <div className="flex flex-col  border-b-2 border-dashed mb-2 pb-2 gap-1 text-base md:gap-3  md:text-xl">
              {" "}
              <Link href={"/home"}>Services</Link>
              <Divider className="my-2" />
              <Link href={"/home"}>Levels</Link>
              <Divider className="my-2" />
              <Link href={"/home"}>Testimonials</Link>
              <Divider className="my-2" />
              <Link href={"/home"}>Enter Main Website</Link>
            </div>

            <div className="mt-7 mb-3">
              <Link
                href={"/sign-in"}
                className="bg-[#81403e] text-white px-2 py-4 font-bold w-fit "
              >
                Sign in / Sign up
              </Link>
            </div>

            <div className="flex w-full justify-around mt-8 border-t border-dashed pt-4 gap-2">
              <Link href={"/home"} className="navLinkContainer">
                <GridView />
              </Link>
              <Link href={"/classes"} className="navLinkContainer">
                <AccessTime />
              </Link>
              <Link href={"/writing"} className="navLinkContainer">
                <EditNote />
              </Link>
              <Link href={"/teachers"} className="navLinkContainer">
                <People />
              </Link>
              <Link href={"/blogs"} className="navLinkContainer">
                <NoteAlt />
              </Link>
              <Link href={"#"} className="navLinkContainer">
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
