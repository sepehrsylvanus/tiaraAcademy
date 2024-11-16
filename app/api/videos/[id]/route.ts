import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
type ParamsProps = {
  params: {
    id: string;
  };
};

export const PATCH = async (req: NextRequest, { params }: ParamsProps) => {
  console.log(params.id);
  try {
    const videoCourseSessions = await prisma.videoCourseSession.findMany({
      where: { videoCourseId: params.id },
    });

    await Promise.all(
      videoCourseSessions.map((session, index) => {
        return prisma.videoCourseSession.update({
          where: {
            id: session.id,
          },
          data: {
            index: index + 1,
          },
        });
      })
    );

    return NextResponse.json("Hello");
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  // console.log(course);
};
