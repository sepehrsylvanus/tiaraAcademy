import { exampleRetireveStudents } from "@/actions/actions";
import StudentHub from "@/components/studentHub/StudentHub";
import { columns } from "@/components/studentsTable/columns";
import { DataTable } from "@/components/studentsTable/data-table";
import { Button } from "@/components/ui/button";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Divider } from "@mui/material";
import React from "react";

const Hub = async () => {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata.isAdmin!;
  const isTeacher = user?.privateMetadata.isTeacher!;
  const students = await exampleRetireveStudents();
  console.log(students);

  return (
    <div>
      {isAdmin || isTeacher ? (
        <div className="container px-4 mt-4 pb-4 ">
          {/* ========== */}

          <div className="space-y-6" id="students-videos">
            <div className="flex gap-4 items-center justify-center">
              <Avatar src="/khashayar.jpg" sx={{ width: 80, height: 80 }} />
              <div className=" space-y-2">
                <p className="font-bold">Admin | Teacher</p>
                <h1 className="font-bold text-xl">Khashayar Mohammadi</h1>
              </div>
            </div>

            {/* ========== */}

            <div className="space-y-2">
              <p className="font-semibold">Students</p>
              <DataTable columns={columns} data={students} />
            </div>

            {/* ========== */}
            <div className="space-y-4 text-center border shadow-md rounded-md p-4">
              <p>
                Click button below You will be redirect to videos page with
                extra options
              </p>
              <Button>Take me to videos</Button>
            </div>
          </div>
          {/* ========== */}
          <div className="my-6">
            <Divider />
          </div>
          <div id="pdf-article-classes">
            <div className="pdfs rounded-md shadow-md">
              <p className="text-2xl">PDF Section</p>
              <p className="my-2">Send and view PDFs.</p>
              <Divider />
              <div className="flex px-2 gap-3 items-center py-3 m-2  rounded-md shadow-md">
                <Avatar sx={{ width: 50, height: 50 }} />
                <div>
                  <p>Sepehr</p>
                  <p>Section 1</p>
                  <Button>Open</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {!isAdmin && !isTeacher && <StudentHub />}
    </div>
  );
};

export default Hub;
