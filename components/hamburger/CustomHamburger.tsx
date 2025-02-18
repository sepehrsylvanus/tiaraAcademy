"use client";
import { Divider } from "@mui/material";
import { Squash as Hamburger } from "hamburger-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AccessTime,
  EditNote,
  GridView,
  NoteAlt,
  OndemandVideo,
  People,
} from "@mui/icons-material";

import ClerkAvatar from "../reusableComponents/ClerkAvatar";
import { getToken } from "@/actions/actions";
import Notifs from "../Notifs";
import { useGetUser } from "@/hooks/useUsers";
import { Podcast } from "lucide-react";

const CustomHamburger = ({
  sidebar,
  navbar,
}: {
  sidebar: boolean;
  navbar: boolean;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [token, setToken] = useState<string>();
  const { data: currentUser } = useGetUser();
  useEffect(() => {
    const gettingToken = async () => {
      const token = await getToken();
      setToken(token?.value);
    };
    gettingToken();
  }, []);

  return (
    <div className="md:hidden">
      <Hamburger
        color="#072d44"
        onToggle={() => setOpenMenu((prev) => !prev)}
      />

      <div
        className={` ${
          openMenu ? "block" : "hidden"
        } absolute bg-cardBg text-extraText p-6 rounded-md shadow-xl w-screen right-0  transition flex flex-col z-[999] `}
      >
        {token ? (
          <div className=" pt-4 mb-3 gap-8 flex items-center justify-between">
            <Link href={"/hub"} className="brownLink">
              Enter Hub
            </Link>

            {currentUser &&
              (currentUser.role === "admin" ||
                currentUser.role === "adminTeacher") && <Notifs />}

            <div className=" scale-150">
              <ClerkAvatar />
            </div>
          </div>
        ) : (
          <div className=" mb-3 pt-6  flex items-center justify-between ">
            <Link href={"/sign-in"} className="brownLink">
              Sign in / Sign up
            </Link>
          </div>
        )}

        <div
          className={` ${
            sidebar ? "flex" : "hidden"
          } w-full justify-around border-t border-dashed   pt-4 gap-2`}
        >
          <Link href={"/hub"} className="navLinkContainer">
            <GridView />
          </Link>
          <Link href={"/hub/classes"} className="navLinkContainer">
            <AccessTime />
          </Link>
          <Link href={"/hub/videos"} className="navLinkContainer">
            <OndemandVideo />
          </Link>

          <Link href={"/hub/writing"} className="navLinkContainer">
            <EditNote />
          </Link>
          <Link href={"/hub/podcasts"} className="navLinkContainer">
            <Podcast />
          </Link>
          <Link href={"/hub/blogs"} className="navLinkContainer">
            <NoteAlt />
          </Link>
          <Link href={"/hub/teachers"} className="navLinkContainer">
            <People />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomHamburger;
