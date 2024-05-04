"use client";

import { useGetUsers } from "@/hooks/useGetUsers";
import { columns } from "../studentsTable/columns";
import { DataTable } from "../studentsTable/data-table";

const StudentTable = () => {
  const { data: users } = useGetUsers();
  const students = users?.filter((user) => user.role === "student");
  if (students) {
    return <DataTable columns={columns} data={students} />;
  }
};

export default StudentTable;
