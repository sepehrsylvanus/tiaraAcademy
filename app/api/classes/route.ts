// ============== CREATE CLASS ==============

import { getToken, verifyToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import prisma from "@/utils/db";
import { User } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  console.log(data);

  const newClass = await prisma.class.create({
    data,
  });

  return NextResponse.json({
    message: `Your new class created => ${newClass.title}`,
  });
};
