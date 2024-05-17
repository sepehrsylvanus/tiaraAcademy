import { getToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import prisma from "@/utils/db";
import { User } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";
type registerClassProps = {
  date: Date;
  time: string;
  classId: string;
};
export const POST = async (req: NextRequest) => {
  const data = (await req.json()) as registerClassProps;
  const token = await getToken()!;
  const user = (await getSingleUser(token?.value)) as User;
  console.log(user.id);
  console.log(data);

  await prisma.classUsers.create({
    data: {
      classId: data.classId,
      userId: user.id,
      date: data.date,
      time: data.time,
    },
  });

  return NextResponse.json({ message: "You successfuly registered" });
};
