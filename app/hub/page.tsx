import StudentHub from "@/components/studentHub/StudentHub";

import { Avatar, Divider } from "@mui/material";
import React from "react";

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
import Notifs from "@/components/Notifs";
import CreateVideo from "@/components/reusableComponents/CreateVideo";
import DeleteArticle from "@/components/reusableComponents/DeleteArticle";
import DeleteVideoCourse from "@/components/videoCourseComponents/DeleteVideoCourse";
import AddVideoCourse from "@/components/videoCourseComponents/AddVideoCourse";
import CommentsTable from "@/components/commentsTable/CommentsTable";
import TeacherContactTable from "@/components/TeacherContactTable";
import EmailTest from "@/components/EmailTest";
import { Input } from "@/components/ui/input";
import PodcastForm from "@/components/PodcastForm";

const Hub = async () => {
  const currentUser: User | null = await getSingleUser();
  const messages = (await getMessages()) as any;
  const hubT = messages.Hub;

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
    <div className=" lg:pl-[5em] pb-[3em] ">
      {(currentUser?.role.includes("teacher") ||
        currentUser?.role.includes("admin") ||
        currentUser?.role.includes("adminTeacher")) && (
        <div className="container   px-4  pb-4 flex flex-col items-start  text-lightText">
          <div className="flex justify-between w-full">
            <Link
              href={"/"}
              className=" text-lightText font-bold mb-4 hidden lg:block"
            >
              <ArrowBackIosNewIcon />
              {hubT.landingPage}
            </Link>

            <div className="hidden md:block">
              <Notifs />
            </div>
          </div>
          {/* ========= */}
          <div className="avatrContainer  flex gap-4 items-center justify-center mt-[5em]">
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
              <div
                id="videoEdit"
                className="space-y-4 text-center border shadow-md rounded-md p-4 bg-extraText text-lightPrime"
              >
                <p className="text-2xl">{hubT.videoSec}</p>
                <p className="my-2">{hubT.pdVideos}</p>

                <div>
                  <p className="mb-2 text-start font-bold">{hubT.dVideo}</p>
                  <DeleteVideoCourse />
                </div>
                <div>
                  <p className="mb-2 text-start font-bold">{hubT.cVideos}</p>
                  <AddVideoCourse />
                </div>
              </div>

              <div className="rounded-md h-fit shadow-md p-2 space-y-2 flex flex-col  bg-extraText text-lightPrime">
                <p className="text-2xl">{hubT.classesSec}</p>
                <DeleteClass />
                <Divider />
                <CreateClass />
              </div>

              <div
                id="articleEdit"
                className="space-y-4 text-center border shadow-md rounded-md p-4 bg-extraText text-lightPrime"
              >
                <p className="text-2xl">{hubT.articleSec}</p>
                <p className="my-2">{hubT.pdArticles}</p>

                <div>
                  <p className="mb-2 text-start font-bold">{hubT.dAticle}</p>
                  <DeleteArticle />
                </div>
                <div>
                  <p className="mb-2 text-start font-bold">{hubT.cArticle}</p>
                  <CreateVideo title="article" />
                </div>
              </div>
              <div className="space-y-4 text-center border shadow-md rounded-md p-4 bg-extraText text-lightPrime">
                <p>Upload podcast</p>

                <PodcastForm />
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

            {(currentUser?.role.includes("admin") ||
              currentUser?.role.includes("adminTeacher")) && <CommentsTable />}

            {(currentUser?.role.includes("admin") ||
              currentUser?.role.includes("adminTeacher")) && (
              <TeacherContactTable />
            )}
          </div>
          <div className="mt-4">
            <EmailTest />
          </div>
        </div>
      )}

      {currentUser?.role === "student" && <StudentHub />}
    </div>
  );
};

export default Hub;
