import { getMessages } from "next-intl/server";
import Links from "./Links";
import { retieveUsers } from "@/actions/actions";
import { getMyWritingCharge } from "@/actions/writing";
import { getSingleUser } from "@/actions/userActions";

import { User } from "@/utils/types";
import WritingToken from "@/components/writingToken/WritingToken";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = (await getMessages()) as any;
  const writingT = messages.Writing;

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
