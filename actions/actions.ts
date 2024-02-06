"use server";
import prisma from "@/utils/db";
export const getFeaturedClasses = async () => {
  const result = await prisma.class.findMany({
    where: { featured: true },
    include: {
      classInstructors: {
        include: {
          instructor: true,
        },
      },
    },
  });
  return result;
};

export const getSingleClass = async (id: string) => {
  const singleClass = await prisma.class.findUnique({
    where: {
      id: id,
    },
  });
  return singleClass;
};
