"use client";
import { Table } from "@mui/material";
import React from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { getTeacherComments } from "@/actions/teachers";
import { useTranslations } from "next-intl";
import { useDeletecomment, useGetTeacherComments } from "@/hooks/useTeacher";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const TeacherContactTable = () => {
  const t = useTranslations("Hub");
  const { data: comments } = useGetTeacherComments();
  const { mutate: deleteComment, isPending: deleteLoading } =
    useDeletecomment();
  if (!comments) return;
  const handleDeleteComment = (id: string) => {
    deleteComment(id);
  };
  return (
    <>
      <p className="font-bold mt-4">{t("teacherMessages")}</p>
      <div className="overflow-x-auto">
        <Table className="mt-2 bg-cardBg w-fit">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Message ID</TableHead>
              <TableHead className="text-center">Message</TableHead>
              <TableHead className="text-center">For Teacher ID</TableHead>
              <TableHead className="text-center">For Teacher Name</TableHead>
              <TableHead className="text-center">From Sender ID</TableHead>
              <TableHead className="text-center">From Sender Name</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.map((comment) => (
              <TableRow key={comment.id}>
                <TableCell className="font-medium text-center">
                  {comment.id}
                </TableCell>

                <TableCell className="text-center">
                  <Dialog>
                    <DialogTrigger>
                      {comment.message.split(" ").slice(0, 3).join(" ") + "..."}
                    </DialogTrigger>
                    <DialogContent className="pt-10">
                      {comment.message}
                    </DialogContent>
                  </Dialog>
                </TableCell>

                <TableCell className="text-center">
                  {comment.teacherId}
                </TableCell>

                <TableCell className="text-center">
                  {comment.teacherName}
                </TableCell>

                <TableCell className="text-center">{comment.userId}</TableCell>

                <TableCell className="text-center">
                  {comment.userName}
                </TableCell>

                <TableCell className="flex gap-4 justify-center">
                  <Button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="bg-red-500"
                  >
                    {deleteLoading ? "Deleting..." : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TeacherContactTable;
