// ============== CREATE CLASS ==============

import { getToken, verifyToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import prisma from "@/utils/db";
import { User } from "@/utils/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  if (req.headers.get("apiKey")) {
    try {
      const data = await req.json();
      console.log(data);

      const user = (await getSingleUser()) as User;
      const newClass = await prisma.class.create({
        data: {
          ...data,
          teacherId: user?.id,
        },
      });
      return NextResponse.json({
        message: `Your new class created => ${newClass.title}`,
        classId: newClass.id,
      });
    } catch (error: any) {
      console.log(error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "access denied" }, { status: 401 });
  }
};
