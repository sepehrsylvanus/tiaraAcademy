"use client";

import { ColumnDef } from "@tanstack/react-table";

export type StudentsShow = {
  id: string;
  fName: string;
  lName: string | null;
  email: string;
  createdAt?: Date;
};

export const columns: ColumnDef<StudentsShow>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "fName",
    header: "First Name",
  },
  {
    accessorKey: "lName",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
];
