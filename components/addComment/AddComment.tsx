"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { postComments } from "@/actions/videos/videos.action";
import { useGetUser } from "@/hooks/useUsers";
import Swal from "sweetalert2";
import Link from "next/link";
import { useTranslations } from "next-intl";
interface AddCommentProps {
  setOpenComment: Dispatch<SetStateAction<boolean>>;
  isSession: boolean;
  isCourse: boolean;
  courseId?: string;
  sessionId?: string;
}

const AddComment: FC<AddCommentProps> = ({
  setOpenComment,
  isSession,
  isCourse,
  courseId,
  sessionId,
}) => {
  const t = useTranslations("VideoCourse");
  const [comment, setComment] = useState("");
  const { data: currentUser } = useGetUser();
  const handlePostComment = async () => {
    if (currentUser) {
      if (isCourse) {
        const ifCommentPosted = await postComments(
          comment,
          currentUser.id,
          courseId
        );
        if (ifCommentPosted) {
          Swal.fire({
            title: "Your comment submitted",
            text: "And will be published after admins accept it",
            icon: "success",
          });
        }
      } else {
        const ifCommentPosted = await postComments(
          comment,
          currentUser.id,
          undefined,
          sessionId
        );
        if (ifCommentPosted) {
          Swal.fire({
            title: "Your comment submitted",
            text: "And will be published after admins accept it",
            icon: "success",
          });
        }
      }
    }
  };
  if (currentUser) {
    return (
      <div>
        <p className="bg-red-500 py-2 px-4 rounded-md text-white mt-2">
          <ReportProblemIcon /> Please add the comment which is related to this
          course!
        </p>
        <Textarea
          className="mt-4 resize-none"
          placeholder="Write your comment..."
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-2">
          <Button variant={"outline"} onClick={() => setOpenComment(false)}>
            Cancel
          </Button>
          <Button onClick={handlePostComment}>Send</Button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p className="bg-red-500 py-2 px-4 rounded-md text-white mt-2">
          <ReportProblemIcon /> Please add the comment which is related to this
          course!
        </p>
        <Textarea
          className="mt-4 resize-none"
          placeholder="Write your comment..."
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end gap-2 mt-2">
          <Link href="/sign-in">
            <Button>{t("loginFirst")}</Button>
          </Link>
        </div>
      </div>
    );
  }
};

export default AddComment;
