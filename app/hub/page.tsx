import { retieveUsers, getToken } from "@/actions/actions";
import StudentHub from "@/components/studentHub/StudentHub";
import { columns } from "@/components/studentsTable/columns";
import { DataTable } from "@/components/studentsTable/data-table";
import { Button } from "@/components/ui/button";
import { Avatar, Divider } from "@mui/material";
import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReuableForm from "@/components/reusableComponents/teacherWriting/ReuableForm";

import DeleteVideo from "@/components/reusableComponents/DeleteVideo";
import CreateVideo from "@/components/reusableComponents/teacherWriting/CreateVideo";
import DeleteClass from "@/components/reusableComponents/DeleteClass";
import CreateClass from "@/components/reusableComponents/CreateClass";
import CustomHamburger from "@/components/hamburger/CustomHamburger";
import { getSingleUser } from "@/actions/userActions";
import { usePDF } from "@react-pdf/renderer";
import MyPdf from "@/components/reusableComponents/myPdf";
import PdfSection from "@/components/PdfSection";
const Hub = async () => {
  const users = await retieveUsers();
  const token = await getToken();
  const currentUser = await getSingleUser(token?.value!);
  console.log(currentUser);
  console.log(users);
  const students = users.filter((user) => user.role === "student");
  const teachers = users.filter(
    (user) => user.role === "adminTeacher" || user.role === "teacher"
  );

  return (
    <div className="pl-[5em] ">
      <div className="ml-auto z-10 fixed top-0 right-0 md:hidden bg-white  rounded-md m-2">
        <CustomHamburger navbar={false} sidebar={true} />
      </div>
      <div className="container   px-4 pt-4 pb-4 flex flex-col items-start  text-lightText">
        {/* ========= */}
        <div className="avatrContainer  flex gap-4 items-center justify-center">
          <Avatar src="/khashayar.jpg" sx={{ width: 80, height: 80 }} />
          <div className="space-y-2">
            <p className="font-bold text-xl">Admin | Teacher</p>
            <h1 className="font-bold text-2xl">Khashayar Mohammadi</h1>
          </div>
        </div>
        {/* =========== */}

        <div>
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

          {currentUser?.role === "admin" && (
            <div className="col-span-3 row-span-1 overflow-auto mt-4">
              <div className="space-y-2">
                <p className="font-semibold">Teachers</p>
                <DataTable columns={columns} data={teachers} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <StudentHub/> */}
    </div>
  );
};

export default Hub;
