import { retieveUsers, getToken } from "@/actions/actions";
import StudentHub from "@/components/studentHub/StudentHub";
import { columns } from "@/components/studentsTable/columns";
import { DataTable } from "@/components/studentsTable/data-table";
import { Avatar, Divider } from "@mui/material";
import React from "react";

import DeleteVideo from "@/components/reusableComponents/DeleteVideo";
import CreateVideo from "@/components/reusableComponents/teacherWriting/CreateVideo";
import DeleteClass from "@/components/reusableComponents/DeleteClass";
import CreateClass from "@/components/reusableComponents/CreateClass";
import { getSingleUser } from "@/actions/userActions";

import PdfSection from "@/components/PdfSection";
import { User } from "@/utils/types";
const Hub = async () => {
  const users = await retieveUsers();
  const token = await getToken();
  const currentUser: User | null = await getSingleUser(token?.value!);

  const students = users.filter((user) => user.role === "student");
  const teachers = users.filter(
    (user) => user.role === "adminTeacher" || user.role === "teacher"
  );
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
    <div className=" lg:pl-[5em] ">
      {(currentUser?.role.includes("teacher") ||
        currentUser?.role.includes("admin") ||
        currentUser?.role.includes("adminTeacher")) && (
        <div className="container   px-4 pt-4 pb-4 flex flex-col items-start  text-lightText">
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
            <p className=" font-bold text-lg">Content Management</p>
            <div className="grid lg:grid-cols-3 gap-4 mb-4">
              <div className="space-y-4 text-center border shadow-md rounded-md p-4 bg-extraText text-lightPrime">
                <p className="text-2xl">Videos Section</p>
                <p className="my-2">Post or delete videos</p>

                <div>
                  <p className="mb-2 text-start font-bold">Delete video</p>
                  <DeleteVideo />
                </div>
                <div>
                  <p className="mb-2 text-start font-bold">Create Video</p>
                  <CreateVideo />
                </div>
              </div>

              <div className="rounded-md h-fit shadow-md p-2 space-y-2 flex flex-col  bg-extraText text-lightPrime">
                <p className="text-2xl">Classes Section</p>
                <DeleteClass />
                <Divider />
                <CreateClass />
              </div>
            </div>
          </div>

          <div className="w-full">
            <p className=" font-bold text-lg mb-2">Uploaded Writings</p>
            <PdfSection />
          </div>

          <div className=" w-full mt-4">
            <p className=" font-bold text-xl">User Management</p>

            <div className="space-y-2 flex-grow">
              <p className="font-semibold">Students</p>
              <DataTable columns={columns} data={students} />
            </div>

            {(currentUser?.role.includes("admin") ||
              currentUser?.role.includes("adminTeacher")) && (
              <div className="col-span-3 row-span-1 overflow-auto mt-4">
                <div className="space-y-2">
                  <p className="font-semibold">Teachers</p>
                  <DataTable columns={columns} data={teachers} />
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
