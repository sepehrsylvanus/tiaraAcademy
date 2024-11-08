"use client";
import React, { useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import LogoutIcon from "@mui/icons-material/Logout";

import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

import { toast } from "react-toastify";
import { UserProps } from "@/utils/types";
import { getToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import { Avatar, CircularProgress } from "@mui/material";
import { Axios } from "@/utils/axiosIn";
import ManageAccount from "../clerckManage/ManageAccount";
import { useGetCurrentUser } from "@/hooks/useGetUsers";
import PaymentsIcon from "@mui/icons-material/Payments";
import Link from "next/link";
import { useGetMyPayments } from "@/hooks/usePayments";
import { useTranslations } from "next-intl";
const ClerkAvatar = () => {
  const { data: currentUser } = useGetCurrentUser();
  const { data: myPayments } = useGetMyPayments(currentUser?.id!);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string>();
  const [user, setUser] = useState<UserProps>();

  const router = useRouter();
  const pathName = usePathname();
  const t = useTranslations("ClerkPanel");
  const signout = async () => {
    setLoading(true);
    Axios.get("/signout")
      .then((res) => {
        toast(res.data);
        if (pathName !== "/") {
          router.push("/");
        } else {
          router.refresh();
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };

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
    const getUserInformation = async (token: string) => {
      const userInfo = await getSingleUser()!;

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
        <Avatar src={currentUser?.image!} />
      </PopoverTrigger>
      <PopoverContent className=" w-[400px] z-[11] relative left-4 space-y-4 p-5">
        <div className="flex gap-4">
          <Avatar src={currentUser?.image!} />
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
          <ManageAccount />
          {loading ? (
            <Button
              className="bg-white shadow-sm
         shadow-slate-400 transition hover:ring-4 hover:ring-slate-400 hover:text-black text-black rounded-xl text-[11px] py-[2px] px-4 flex gap-1"
              onClick={signout}
            >
              <CircularProgress sx={{ color: "black" }} />
            </Button>
          ) : (
            <Button
              className="bg-white shadow-sm
         shadow-slate-400 transition hover:ring-4 hover:ring-slate-400 hover:text-black text-black rounded-xl text-[11px] py-[2px] px-4 flex gap-1"
              onClick={signout}
            >
              <LogoutIcon sx={{ width: ".8em" }} /> {t("signOut")}
            </Button>
          )}
          <Link
            href={"/hub/payments"}
            className={`${myPayments?.length === 0 && "pointer-events-none"}`}
          >
            <Button
              type="button"
              role="link"
              disabled={myPayments?.length === 0}
              className="bg-white shadow-sm
         shadow-slate-400 transition hover:ring-4 hover:ring-slate-400 hover:text-black text-black rounded-xl text-[11px] py-[2px] px-4 flex gap-1"
            >
              <PaymentsIcon sx={{ width: ".8em" }} /> {t("myPayments")}
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ClerkAvatar;
