"use server";

import prisma from "@/utils/db";
import { User } from "@/utils/types";

import axios from "axios";

export const createNewPayment = async (
  price: number,
  classBackUrl: string,
  user: User,
  chosenTime: string,
  classId?: string,
  playlistId?: string,
  className?: string,
  playlistName?: string
) => {
  console.log(chosenTime);
  console.log(price, classBackUrl, user, classId, className);
  let authority: string;
  try {
    const data = {
      merchant_id: process.env.NEXT_PUBLIC_MERCHANT_CODE,
      amount: price * 10,
      description: `ثبت نام ${playlistName ?? ""} ${className ?? ""}`,
      callback_url: `http://localhost:4000/hub/classes/${classId}/paymentRedirect`,
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
      authority = res.data.data.authority;
      const newPayment = await prisma.payment.create({
        data: {
          userId: user.id,
          resnumber: res.data.data.authority,
          price: price,
          playlistId,
          classId,
          time: chosenTime,
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
  classId,
  user,
  authority,
}: {
  classId: string;
  user: User;
  authority: string;
}) => {
  try {
    const targetedClass = await prisma.class.findUnique({
      where: {
        id: classId,
      },
    });
    if (classId) {
      const verifyData = {
        merchant_id: process.env.NEXT_PUBLIC_MERCHANT_CODE,
        amount: Number(targetedClass?.price)! * 10,
        authority,
      };
      const res = await axios.post(
        "https://api.zarinpal.com/pg/v4/payment/verify.json",
        verifyData
      );

      if (res.data.data.code === 101 || res.data.data.code === 100) {
        const updatedPayment = await prisma.payment.update({
          where: {
            resnumber: authority,
          },
          data: {
            payed: true,
          },
        });
        if (updatedPayment) {
          if (targetedClass?.type !== "placement") {
            const alreadyRegistered = await prisma.classUsers.findMany({
              where: {
                AND: [{ classId }, { time: updatedPayment.time }],
              },
              orderBy: {
                capacity: "asc",
              },
            });
            console.log(alreadyRegistered);
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
          }
          return "payment verified";
        }
      }
    }
    await prisma.notifs.create({
      data: {
        title: `${user.fName} ${user.lName} registered in ${targetedClass?.title} class`,
        type: "joinClass",
      },
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
