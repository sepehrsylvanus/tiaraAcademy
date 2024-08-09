import { getMessages } from "next-intl/server";
import Links from "./Links";
import { retieveUsers } from "@/actions/actions";

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
  return (
    <div className="flex flex-col px-4 md:pl-[5em] pb-6">
      <h1 className="my-4 h1 text-center text-2xl">{writingT.writingTitle}</h1>
      <p className="text-center">{writingT.layoutDesc}</p>

      <Links teachers={teachers} />

      <div className="mt-6">{children}</div>
    </div>
  );
}
