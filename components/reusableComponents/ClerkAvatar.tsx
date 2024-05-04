"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { UserProps } from "@/utils/types";
import { getToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import { Avatar } from "@mui/material";
const ClerkAvatar = () => {
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<UserProps>();
  const router = useRouter();

  const signout = async () => {
    axios
      .get("/api/signout", {
        headers: {
          apiKey: process.env.NEXT_PUBLIC_API_KEY,
        },
      })
      .then((res) => {
        console.log(res);
        toast(res.data);
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
    <Popover>
      <PopoverTrigger>
        <Avatar />
      </PopoverTrigger>
      <PopoverContent className=" w-[374px] z-[11] relative left-4 space-y-4 p-5">
        <div className="flex gap-4">
          <Avatar />
          <div>
            {user && (
              <>
                <p>{`${user?.fName} ${user?.lName}`}</p>
                <p>{user?.email}</p>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            className="bg-white shadow-sm
          shadow-slate-400 transition hover:ring-4 hover:ring-slate-400 hover:text-black text-black rounded-xl text-[11px] py-[2px] px-4 flex gap-1"
          >
            <SettingsIcon sx={{ width: ".8em" }} /> Manage account
          </Button>
          <Button
            className="bg-white shadow-sm
          shadow-slate-400 transition hover:ring-4 hover:ring-slate-400 hover:text-black text-black rounded-xl text-[11px] py-[2px] px-4 flex gap-1"
            onClick={signout}
          >
            <LogoutIcon sx={{ width: ".8em" }} /> Sign out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ClerkAvatar;
