"use client";
import { Student } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";

export type StudentsShow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: Date;
};

export const columns: ColumnDef<StudentsShow>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
