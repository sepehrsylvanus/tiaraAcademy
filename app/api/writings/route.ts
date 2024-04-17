import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  try {
    console.log(body);
    console.log(body.selectedImage);
    return NextResponse.json({ message: "HI!" });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};

export const GET = async () => {
  try {
    const writings = await prisma.writing.findMany();
    console.log(writings);
    return NextResponse.json(writings);
  } catch (error) {
    return NextResponse.json(
      { message: "There is an error in server" },
      { status: 500 }
    );
  }
};