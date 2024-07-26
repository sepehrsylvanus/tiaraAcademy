import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  if (req.headers.get("apiKey")) {
    const videos = await prisma.video.findMany();
    return NextResponse.json(videos);
  } else {
    return NextResponse.json({ message: "Access denied" }, { status: 401 });
  }
};
