import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
type ParamsProps = {
  params: {
    id: string;
  };
};
export const PUT = async (req: NextRequest, { params }: ParamsProps) => {
  if (req.headers.get("apiKey")) {
    try {
      const userId = params.id;
      const body = await req.json();
      const role = body.role;

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: { role },
      });
      return NextResponse.json({ message: `User role changed to ${role}` });
    } catch (error) {
      return NextResponse.json(
        { message: `There is an error in server` },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Access denied" }, { status: 401 });
  }
};
