"use server";

import prisma from "@/utils/db";
import { verifyToken } from "../actions";
import { UserProps } from "@/utils/types";

export const getSingleUser = async (token: string) => {
  const tokenPayload = verifyToken(token);

  const user = await prisma.user.findUnique({
    where: {
      email: tokenPayload.data,
    },
  });

  return user;
};
