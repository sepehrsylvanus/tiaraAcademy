"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { getSingleUser } from "@/actions/userActions";
import { getToken } from "@/actions/actions";
import { User } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Axios } from "@/utils/axiosIn";

export type StudentsShow = {
  id: string;
  role: string;
  fName: string;
  lName: string | null;
  email: string;
  createdAt?: Date;
};

export const columns: ColumnDef<StudentsShow>[] = [
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const role = user.role;

      const [sending, setSending] = useState(false);
      const [currentUser, setCurrentUser] = useState<User>();
      useEffect(() => {
        const getCurrentUser = async () => {
          const token = await getToken()!;
          const currentUser = await getSingleUser(token?.value);
          if (currentUser) {
            setCurrentUser(currentUser);
          }
        };
        getCurrentUser();
      }, []);

      const changeRole = async (role: string) => {
        setSending(true);
        return Axios.put(`/users/${user.id}`, { role })
          .then((res) => {
            toast.success(res.data.message, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setSending(false);
            return res;
          })
          .catch((e) => {
            toast.error(e.response.data.error, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setSending(false);
            throw e;
          });
      };

      const queryClient = useQueryClient();
      const mutation = useMutation({
        mutationFn: async (role: string) => await changeRole(role),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
      });
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className={`h-8 w-8 p-0 ${
                currentUser?.role === "admin" || "adminTeacher" ? "" : "hidden"
              }`}
            >
              <span className="sr-only">Open menu</span>
              {sending ? (
                <div style={{ transform: "scale(.7)" }}>
                  <CircularProgress sx={{ color: "white" }} />
                </div>
              ) : (
                <MoreHorizontal className={`h-4 w-4 `} />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Change role</DropdownMenuLabel>
            {role !== "student" && (
              <DropdownMenuItem onClick={() => mutation.mutate("student")}>
                Student
              </DropdownMenuItem>
            )}

            {role !== "teacher" && (
              <DropdownMenuItem onClick={() => mutation.mutate("teacher")}>
                Teacher
              </DropdownMenuItem>
            )}
            {role !== "admin" && (
              <DropdownMenuItem onClick={() => mutation.mutate("admin")}>
                Admin
              </DropdownMenuItem>
            )}
            {role !== "adminTeacher" && (
              <DropdownMenuItem onClick={() => mutation.mutate("adminTeacher")}>
                Admin - Teacher
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "role",
    header: "Role",
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
