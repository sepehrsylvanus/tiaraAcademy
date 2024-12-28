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

const TeacherContactTable = () => {
  return (
    <>
      <p className="font-bold mt-4">{t("commentsTable")}</p>
      <Table className="mt-2 bg-cardBg ">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">User ID</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">For Teacher</TableHead>

            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {comments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell className="font-medium text-center">
                {comment.id}
              </TableCell>
              <TableCell className="text-center">{`${comment.commentCreator.fName} ${comment.commentCreator.lName}`}</TableCell>
              <TableCell className="text-center">
                {comment.video
                  ? comment.video.title
                  : comment.videoCourseSession &&
                    comment.videoCourseSession.title}
              </TableCell>
              <TableCell className="text-center">
                {comment.verified ? (
                  <Badge className="bg-green-500">Approved</Badge>
                ) : (
                  <Badge className="bg-yellow-500">Pending</Badge>
                )}
              </TableCell>
              <TableCell className=" flex gap-4 justify-center">
                {!comment.verified && (
                  <Button
                    onClick={() => approveComment(comment.id)}
                    className="bg-green-500"
                  >
                    Approve
                  </Button>
                )}

                <Button
                  onClick={() => deleteComment(comment.id)}
                  className="bg-red-500"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TeacherContactTable;
