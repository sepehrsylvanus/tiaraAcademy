import { getMessages } from "next-intl/server";
import Links from "./Links";
import { getRegisterdClasses, retieveUsers } from "@/actions/actions";
import { chargeWriting, getMyWritingCharge } from "@/actions/writing";
import { getSingleUser } from "@/actions/userActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WritingCharge from "@/components/writingCharge/WritingCharge";
import { User } from "@/utils/types";
import WritingToken from "@/components/writingToken/WritingToken";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const teachers = await (
    await retieveUsers()
  ).filter((user) => user.role === "teacher");
  const messages = (await getMessages()) as any;
  const writingT = messages.Writing;
  const user = (await getSingleUser()) as User;
  const writingCharge = await getMyWritingCharge(user?.id!);
  const writingChargeEmpty = writingCharge?.length === 0;
  const writingChargeRunOut = writingCharge?.[0]?.writingCharge === 0;
  console.log(writingCharge.length === 0);
  console.log(writingT.notCharge);
  const chargeAgain = writingChargeEmpty || writingChargeRunOut;

  return (
    <div className="flex flex-col px-4 md:pl-[5em] pb-6">
      <h1 className="my-4 h1 text-center text-2xl">{writingT.writingTitle}</h1>
      <p className="text-center">{writingT.layoutDesc}</p>
      <WritingToken />

      <Links />

      <div className="mt-6">{children}</div>
    </div>
  );
}
