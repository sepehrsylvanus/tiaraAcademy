// ============== CREATE CLASS ==============

import { getToken, verifyToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import prisma from "@/utils/db";
import { User } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  if (req.headers.get("apiKey")) {
    console.log("triggered");
    try {
      const data = await req.json();
      const token = await getToken();
      const user = (await getSingleUser(token?.value!)) as User;
      console.log(data);
      const newClass = await prisma.class.create({
        data: {
          ...data,
          creatorId: user?.id,
        },
      });
      console.log(newClass);
      return NextResponse.json({
        message: `Your new class created => ${newClass.title}`,
      });
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "access denied" }, { status: 401 });
  }
};

export const GET = async (req: NextRequest) => {
  if (req.headers.get("apiKey")) {
    try {
      const classes = await prisma.class.findMany({
        include: {
          creator: true,
        },
      });

      return NextResponse.json({ classes });
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Access denied" }, { status: 401 });
  }
};
