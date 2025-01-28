"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { sendEmail } from "@/actions/actions";
import { toast } from "react-toastify";
import { useGetNewsEmails } from "@/hooks/useEmails";
import { Mail, Loader2 } from "lucide-react";

const EmailTest = () => {
  const [loading, setLoading] = useState(false);
  const { data: emails } = useGetNewsEmails();
  const justEmails = emails?.map((email) => email.email);
  const emailsString = justEmails?.join(", ");

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
      <Button
        onClick={sendTest}
        size="lg"
        className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 min-w-[200px] justify-center"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Mail className="h-5 w-5" />
            <span>Send Newsletter</span>
          </>
        )}
      </Button>
    );
  }
};

export default EmailTest;
