"use client";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Divider, Hidden } from "@mui/material";
import { Squash as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useState } from "react";
import {
  AccessTime,
  EditNote,
  GridView,
  NoteAlt,
  OndemandVideo,
  People,
} from "@mui/icons-material";

const CustomHamburger = ({
  sidebar,
  navbar,
}: {
  sidebar: boolean;
  navbar: boolean;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="md:hidden">
      <Hamburger onToggle={() => setOpenMenu((prev) => !prev)} />

      <div
        className={` ${
          openMenu ? "block" : "hidden"
        } absolute bg-white p-6 rounded-md shadow-xl right-0 transition flex flex-col z-[999]`}
      >
        <div
          className={`   pb-2 gap-1 text-base md:gap-3  md:text-xl ${
            navbar ? "flex flex-col " : "hidden"
          }`}
        >
          {" "}
          <Link href={"/home"}>Services</Link>
          <Divider className="my-2" />
          <Link href={"/home"}>Levels</Link>
          <Divider className="my-2" />
          <Link href={"/home"}>Testimonials</Link>
          <Divider className="my-2" />
          <Link href={"/home"}>Enter Main Website</Link>
        </div>

        <SignedOut>
          <div
            className={` mb-3 pt-6 ${
              navbar ? "border-t-2 border-dashed" : ""
            } `}
          >
            <Link
              href={"/sign-in"}
              className="bg-[#81403e]   text-white px-2 py-4 font-bold w-fit "
            >
              Sign in / Sign up
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <div
            className={` mb-3 ${
              navbar ? "border-t-2 border-dashed pt-4" : ""
            } flex items-center justify-between`}
          >
            <Link
              href={"/hub"}
              className="bg-[#81403e] text-white px-2 py-4 font-bold w-fit "
            >
              Enter Hub
            </Link>

            <div className=" scale-150">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </SignedIn>
        <div
          className={` ${
            sidebar ? "flex" : "hidden"
          } w-full justify-around border-t border-dashed   pt-4 gap-2`}
        >
          <Link href={"/hub/home"} className="navLinkContainer">
            <GridView />
          </Link>
          <Link href={"/hub/classes"} className="navLinkContainer">
            <AccessTime />
          </Link>
          <Link href={"/hub/writing"} className="navLinkContainer">
            <EditNote />
          </Link>
          <Link href={"/hub/teachers"} className="navLinkContainer">
            <People />
          </Link>
          <Link href={"/hub/blogs"} className="navLinkContainer">
            <NoteAlt />
          </Link>
          <Link href={"/hub/videos"} className="navLinkContainer">
            <OndemandVideo />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomHamburger;