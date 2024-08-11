import { getNotifs, getToken } from "@/actions/actions";
import StudentHub from "@/components/studentHub/StudentHub";

import { Avatar, Divider } from "@mui/material";
import React from "react";

import DeleteVideo from "@/components/reusableComponents/DeleteVideo";
import CreateVideo from "@/components/reusableComponents/CreateVideo";
import DeleteClass from "@/components/reusableComponents/DeleteClass";
import CreateClass from "@/components/reusableComponents/CreateClass";
import { getSingleUser } from "@/actions/userActions";

import PdfSection from "@/components/PdfSection";
import { User } from "@/utils/types";
import TeachersTable from "@/components/table/TeachersTable";
import StudentTable from "@/components/studentTable/StudentTable";

import Link from "next/link";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getMessages } from "next-intl/server";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Badge from "@mui/material/Badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatTimeFromNow } from "@/utils/helperFunctions";
import { NotifType } from "@prisma/client";

const Hub = async () => {
  const token = await getToken();
  const currentUser: User | null = await getSingleUser(token?.value!);
  const messages = (await getMessages()) as any;
  const hubT = messages.Hub;
  const notifs = await getNotifs();
  const renderRole = () => {
    switch (currentUser?.role) {
      case "teacher":
        return <p className="font-bold text-xl">Teacher</p>;
        break;
      case "admin":
        return <p className="font-bold text-xl">Admin</p>;
        break;
      case "adminTeacher":
        return <p className="font-bold text-xl">Admin | Teacher</p>;
        break;
    }
  };

  return (
    <div className=" lg:pl-[5em] pb-[3em]">
      {(currentUser?.role.includes("teacher") ||
        currentUser?.role.includes("admin") ||
        currentUser?.role.includes("adminTeacher")) && (
        <div className="container   px-4 pt-4 pb-4 flex flex-col items-start  text-lightText">
          <div className="flex justify-between w-full">
            <Link href={"/"} className=" text-lightText font-bold mb-4">
              <ArrowBackIosNewIcon />
              {hubT.landingPage}
            </Link>

            <Popover>
              <PopoverTrigger>
                <Badge badgeContent={notifs.length} color="primary">
                  <NotificationsNoneOutlinedIcon color="action" />
                </Badge>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-[400px] animate-slide-in-right bg-background shadow-lg border rounded-lg bg-white"
              >
                <div className="p-4 space-y-4">
                  {notifs.map((notif, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-muted rounded-md flex items-center justify-center p-2">
                        {notif.type === NotifType.joinClass ? (
                          <UserPlusIcon className="w-5 h-5" />
                        ) : (
                          <UserCheckIcon className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{notif.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatTimeFromNow(notif.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {notifs.length === 0 && (
                    <p className="text-center">{hubT.noNotif}</p>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
          {/* ========= */}
          <div className="avatrContainer  flex gap-4 items-center justify-center">
            <Avatar sx={{ width: 80, height: 80 }} />
            <div className="space-y-2">
              {renderRole()}
              <h1 className="font-bold text-2xl">{`${currentUser.fName} ${currentUser.lName}`}</h1>
            </div>
          </div>
          {/* =========== */}

          <div className="mt-6">
            <p className=" font-bold text-lg">{hubT.contentM}</p>
            <div className="grid  grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="space-y-4 text-center border shadow-md rounded-md p-4 bg-extraText text-lightPrime">
                <p className="text-2xl">{hubT.videoSec}</p>
                <p className="my-2">{hubT.pdVideos}</p>

                <div>
                  <p className="mb-2 text-start font-bold">{hubT.dVideo}</p>
                  <DeleteVideo title="video" />
                </div>
                <div>
                  <p className="mb-2 text-start font-bold">{hubT.cVideos}</p>
                  <CreateVideo title="video" />
                </div>
              </div>

              <div className="rounded-md h-fit shadow-md p-2 space-y-2 flex flex-col  bg-extraText text-lightPrime">
                <p className="text-2xl">{hubT.classesSec}</p>
                <DeleteClass />
                <Divider />
                <CreateClass />
              </div>

              <div className="space-y-4 text-center border shadow-md rounded-md p-4 bg-extraText text-lightPrime">
                <p className="text-2xl">{hubT.articleSec}</p>
                <p className="my-2">{hubT.pdArticles}</p>

                <div>
                  <p className="mb-2 text-start font-bold">{hubT.dAticle}</p>
                  <DeleteVideo title="article" />
                </div>
                <div>
                  <p className="mb-2 text-start font-bold">{hubT.cArticle}</p>
                  <CreateVideo title="article" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            <p className=" font-bold text-lg mb-2">{hubT.uWritings}</p>
            <PdfSection />
          </div>

          <div className=" w-full mt-4">
            <p className=" font-bold text-xl">{hubT.userM}</p>

            <div className="space-y-2 flex-grow">
              <p className="font-semibold">{hubT.students}</p>
              <StudentTable />
            </div>

            {(currentUser?.role.includes("admin") ||
              currentUser?.role.includes("adminTeacher")) && (
              <div className="col-span-3 row-span-1 overflow-auto mt-4">
                <div className="space-y-2">
                  <p className="font-semibold">{hubT.teachers}</p>

                  <TeachersTable />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {currentUser?.role === "student" && <StudentHub />}
    </div>
  );
};

export default Hub;

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
