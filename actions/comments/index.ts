"use server";

import prisma from "@/utils/db";

export const getAllComments = async () => {
  const comments = await prisma.comment.findMany({
    include: {
      commentCreator: true,
      videoCourseSession: true,
      video: true,
    },
  });
  return comments;
};
export const approveComment = async (id: string) => {
  await prisma.comment.update({
    where: {
      id,
    },
    data: {
      verified: true,
    },
  });
};
export const deleteComment = async (id: string) => {
  try {
    await prisma.teacherComment.delete({
      where: {
        id,
      },
    });
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
