import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
type ParamsProps = {
  params: {
    id: string;
  };
};
export const GET = async (req: NextRequest, { params }: ParamsProps) => {
  console.log(params);
  const singleVideo = await prisma.video.findUnique({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(singleVideo);
};
