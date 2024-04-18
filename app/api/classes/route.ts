// ============== CREATE CLASS ==============

import { getToken, verifyToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import prisma from "@/utils/db";
import { User } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const token = await getToken();
  const user = await getSingleUser(token?.value!);
  console.log(user);
  console.log(data);

  const newClass = await prisma.class.create({
    data: {
      ...data,
      creatorId: user?.id,
    },
  });

  return NextResponse.json({
    message: `Your new class created => ${newClass.title}`,
  });
};

export const GET = async () => {
  const classes = await prisma.class.findMany({
    include: {
      creator: true,
    },
  });
  console.log(classes);

  return NextResponse.json({ classes });
};
