"use client";
import { sendMessageforTeacher } from "@/actions/teachers";
import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { useGetUser } from "@/hooks/useUsers";

interface SendToTeacherProps {
  teacherId: string;
  teacherName: string;
}

const SendToTeacher: FC<SendToTeacherProps> = ({ teacherId, teacherName }) => {
  const [message, setMessage] = useState("");
  const { data: currentUser } = useGetUser();
  const t = useTranslations("TeacherProfile");
  const sendMessage = async () => {
    if (!currentUser) return;
    const sentMessage = await sendMessageforTeacher(
      message,
      teacherId,
      teacherName,
      currentUser.id,
      teacherName
    );
    if (sentMessage) {
      toast.success(t("messageSentSuccess"));
    }
  };
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          id="message"
          placeholder="Enter your message"
        />
      </div>
      <Button onClick={sendMessage}>{t("sendMessage")}</Button>
    </>
  );
};

export default SendToTeacher;
