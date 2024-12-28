"use server";

import prisma from "@/utils/db";

export const sendMessageforTeacher = async (
  message: string,
  teacherId: string,
  teacherName: string,
  userId: string,
  userName: string
) => {
  try {
    const sentMessage = await prisma.teacherComment.create({
      data: {
        message,
        teacherId,
        teacherName,
        userId,
        userName,
      },
    });
    if (sentMessage) {
      return true;
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getTeacherComments = async () => {
  const teacherComments = await prisma.teacherComment.findMany();

  return teacherComments;
};
export const deleteTeacherComment = async (id: string) => {
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
