import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
type ParamsProps = {
  params: {
    id: string;
  };
};
export const DELETE = async (req: NextRequest, { params }: ParamsProps) => {
  try {
    const user = await prisma.class.findUnique({
      where: {
        id: params.id,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "User with this id doesn't exist" },
        { status: 404 }
      );
    }

    try {
      await prisma.class.delete({
        where: {
          id: params.id,
        },
      });
      return NextResponse.json({
        message: "Your desired successfully deleted!",
      });
    } catch (error) {
      return NextResponse.json(
        { message: "There is an error in server" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "There is an error in server" },
      { status: 500 }
    );
  }
};
