"use client";
import NotifTab from "@/components/notifTab/NotifTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllNotifs, useGetNotifs } from "@/hooks/useNotifs";
import { formatTimeFromNow } from "@/utils/helperFunctions";
import { debounce } from "@mui/material";
import { NotifType } from "@prisma/client";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

const Notifications = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: notifs } = useGetAllNotifs(searchQuery);

  return (
    <div className="container">
      <Tabs defaultValue="all">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="classRegister">Class register</TabsTrigger>
            <TabsTrigger value="websiteAccount">Website account </TabsTrigger>
          </TabsList>

          <div
            className="border-[3px]
         border-extraItem rounded-md w-[40%] flex py-2 px-4 rtl:flex-row-reverse gap-4"
          >
            <Search />
            <input
              className="border-none outline-none rtl:text-end w-full"
              placeholder="Search your notification "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <NotifTab data={notifs} value="all" />
        <NotifTab
          data={notifs?.filter((notif) => notif.type === "joinClass")}
          value="classRegister"
        />
        <NotifTab
          data={notifs?.filter((notif) => notif.type === "register")}
          value="websiteAccount"
        />
      </Tabs>
    </div>
  );
};

export default Notifications;

function UserCheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </svg>
  );
}

function UserPlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}
