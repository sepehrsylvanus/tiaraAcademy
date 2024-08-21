"use server";

import prisma from "@/utils/db";
import { User } from "@/utils/types";

import axios from "axios";

export const createNewPayment = async (
  price: number,

  user: User,
  type: "class" | "playlist" | "writingCharge",
  chosenTime?: string,
  classId?: string,
  playlistId?: string,
  className?: string,
  playlistName?: string
) => {
  console.log(chosenTime);
  console.log(price, user, classId, className);

  try {
    const data = {
      merchant_id: process.env.NEXT_PUBLIC_MERCHANT_CODE,
      amount: price * 10,
      description: `ثبت نام ${playlistName ?? ""} ${className ?? ""}`,
      callback_url:
        type === "class"
          ? `http://localhost:4000/hub/classes/${classId}/paymentRedirect?type=class`
          : type === "writingCharge"
          ? `http://localhost:4000/hub/paymentRedirect?type=writingCharge`
          : `http://localhost:4000/hub/${playlistName}/paymentRedirect?type=playlist`,
      metadata: {
        email: user.email,
        phone: user.pNumber,
      },
    };

    const res = await axios.post(
      "https://api.zarinpal.com/pg/v4/payment/request.json",
      data
    );
    console.log(res.data);
    if (res.data.data.code === 100) {
      const newPayment = await prisma.payment.create({
        data: {
          userId: user.id,
          resnumber: res.data.data.authority,
          price: price,
          playlistId,
          classId,
          time: chosenTime,
          type,
        },
      });
      if (newPayment) {
        return `https://www.zarinpal.com/pg/StartPay/${res.data.data.authority}`;
      } else {
        throw new Error("Error in creating payment");
      }
    } else {
      throw new Error("Error in connecting with payment gateway");
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const verifyPayment = async ({
  user,
  authority,
  type,
  classId,
}: {
  classId?: string;
  user: User;
  authority: string;
  type: "class" | "playlist" | "writingCharge";
}) => {
  try {
    const targetedPayment = await prisma.payment.findUnique({
      where: {
        resnumber: authority,
      },
    });
    console.log(targetedPayment);
    let targetedClass;
    if (classId) {
      targetedClass = await prisma.class.findUnique({
        where: {
          id: classId,
        },
      });
    }
    const verifyData = {
      merchant_id: process.env.NEXT_PUBLIC_MERCHANT_CODE,
      amount: Number(targetedPayment?.price) * 10,
      authority,
    };
    console.log(verifyData);
    const res = await axios.post(
      "https://api.zarinpal.com/pg/v4/payment/verify.json",
      verifyData
    );
    console.log(res.data);
    if (res.data.data.code === 100) {
      const updatedPayment = await prisma.payment.update({
        where: {
          resnumber: authority,
        },
        data: {
          payed: true,
        },
      });

      if (updatedPayment) {
        if (targetedClass?.type !== "placement" && updatedPayment.time) {
          if (classId) {
            const alreadyRegistered = await prisma.classUsers.findMany({
              where: {
                AND: [{ classId }, { time: updatedPayment.time }],
              },
              orderBy: {
                capacity: "asc",
              },
            });
            if (alreadyRegistered.length > 0) {
              await prisma.classUsers.create({
                data: {
                  classId,
                  userId: updatedPayment.userId,
                  capacity: alreadyRegistered[0].capacity - 1,
                  time: updatedPayment.time,
                  date: targetedClass?.date?.toString()!,
                },
              });
            } else {
              await prisma.classUsers.create({
                data: {
                  classId,
                  userId: updatedPayment.userId,
                  capacity: targetedClass!.capacity! - 1,
                  time: updatedPayment.time,
                  date: targetedClass?.date?.toString()!,
                },
              });
            }
            await prisma.notifs.create({
              data: {
                title: `${user.fName} ${user.lName} registered in ${targetedClass?.title} class`,
                type: "joinClass",
              },
            });
          }
        }
        if (type === "writingCharge") {
          const chargeNumber = updatedPayment.price / 6000;
          const alreadyCharged = await prisma.writingCharge.findUnique({
            where: {
              userId: user.id,
            },
          });
          if (alreadyCharged) {
            await prisma.writingCharge.update({
              where: {
                userId: user.id,
              },
              data: {
                writingCharge: {
                  increment: updatedPayment.price / 6000,
                },
              },
            });
          } else {
            await prisma.writingCharge.create({
              data: {
                userId: user.id,
                writingCharge: chargeNumber,
              },
            });
          }
        }
        return "payment verified";
      }
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
