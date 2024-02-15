"use server";

import prisma from "@/utils/db";
import { clerkClient } from "@clerk/nextjs";
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

export const retrieveAdminStatus = async (userId: string) => {
  const isAdmin = (await clerkClient.users.getUser(userId)).privateMetadata
    .isAdmin;
  if (isAdmin) {
    return true;
  } else {
    return false;
  }
};

