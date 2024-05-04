"use client";

import { useGetUsers } from "@/hooks/useGetUsers";
import { columns } from "../studentsTable/columns";
import { DataTable } from "../studentsTable/data-table";

const TeachersTable = () => {
  const { data: users } = useGetUsers();

  const teachers = users?.filter(
    (user) => user.role === "adminTeacher" || user.role === "teacher"
  )!;
  if (teachers) {
    return <DataTable columns={columns} data={teachers} />;
  }
};

export default TeachersTable;
