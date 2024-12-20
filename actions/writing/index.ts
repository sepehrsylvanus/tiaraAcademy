"use server";

import prisma from "@/utils/db";

export const getMyWritingCharge = async (userId: string) => {
  try {
    const myCharges = await prisma.writingCharge.findMany({
      where: {
        userId: userId,
      },
    });

    return myCharges;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const chargeWriting = async (
  writingCharge: number,
  userId: string,
  chargeId?: string
) => {
  try {
    if (chargeId) {
      await prisma.writingCharge.update({
        where: {
          id: chargeId,
        },
        data: {
          writingCharge,
        },
      });
    } else {
      await prisma.writingCharge.create({
        data: {
          userId,
          writingCharge,
        },
      });
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const spendWriting = async (id: string) => {
  try {
    await prisma.writingCharge.update({
      where: {
        id,
      },
      data: {
        writingCharge: {
          decrement: 1,
        },
      },
    });
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
