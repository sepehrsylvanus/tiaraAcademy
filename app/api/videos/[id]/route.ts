import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
type ParamsProps = {
  params: {
    id: string;
  };
};
export const GET = async (req: NextRequest, { params }: ParamsProps) => {
  console.log(params);
  if (req.headers.get("apiKey")) {
    const singleVideo = await prisma.video.findUnique({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json(singleVideo);
  } else {
    return NextResponse.json({ message: "Access denied" }, { status: 401 });
  }
};
