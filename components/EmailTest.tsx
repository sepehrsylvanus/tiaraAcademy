"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { sendEmail } from "@/actions/actions";
import { toast } from "react-toastify";
import { useGetNewsEmails } from "@/hooks/useEmails";

const EmailTest = () => {
  const [loading, setLoading] = useState(false);
  const { data: emails } = useGetNewsEmails();
  const justEmails = emails?.map((email) => email.email);
  const emailsString = justEmails?.join(", ");
  console.log({ emailsString, emails });
  const sendTest = async () => {
    try {
      setLoading(true);
      if (emailsString) {
        const ifSend = await sendEmail(
          emailsString,
          "Welcome to Our Newsletter!",
          "<h1>Thank you for subscribing!</h1><p>You will now receive our latest updates.</p>"
        );
        if (ifSend) {
          toast.success("Email sent successfully!");
        } else {
          toast.error("Email failed to send!");
        }
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  if (emails) {
    return (
      <Button onClick={sendTest}>
        {loading ? "Sending..." : "Send Email"}
      </Button>
    );
  }
};

export default EmailTest;
