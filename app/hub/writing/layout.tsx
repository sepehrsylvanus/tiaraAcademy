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

  return (
    <div className="flex flex-col px-4 md:pl-[5em] pb-6">
      <h1 className="my-4 h1 text-center text-2xl">Writing Section</h1>
      <p className="text-center">
        Welcome to the writing center. Here you can upload your writing file,
        write your writing here directly or even share with other learners
      </p>

      <Links teachers={teachers} />

      <div className="mt-6">{children}</div>
    </div>
  );
}
