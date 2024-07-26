import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
type DeleteOTP = {
  otp: string;
};
export const DELETE = async (
  req: NextRequest,
  { params }: { params: DeleteOTP }
) => {
  console.log(params);
  console.log("Hi");
  try {
    await prisma.otp.delete({
      where: {
        otp: params.otp,
      },
    });
    return NextResponse.json({
      message: "Your OTP expired\nTry generate a new one",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "There is Error in server\nCheck console for more details",
        message: error,
      },
      { status: 500 }
    );
  }
};
