"use server";

import prisma from "@/utils/db";
import { User } from "@/utils/types";

import axios from "axios";
import { NextResponse } from "next/server";

export const createNewPayment = async (
  price: number,
  classBackUrl: string,
  user: User,
  classId?: string,
  playlistId?: string,
  className?: string,
  playlistName?: string
) => {
  console.log(price, classBackUrl, user, classId, className);
  try {
    const data = {
      merchant_id: process.env.NEXT_PUBLIC_MERCHANT_CODE,
      amount: price * 10,
      description: `ثبت نام ${playlistName ?? ""} ${className ?? ""}`,
      callback_url: `http://localhost:4000/hub/classes/${classBackUrl}`,
      metadata: {
        email: user.email,
        phone: user.pNumber,
      },
    };

    const targetedClass = await prisma.class.findUnique({
      where: {
        id: classId,
      },
    });

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
        },
      });
      if (newPayment) {
        if (classId) {
          if (targetedClass?.type !== "placement") {
            await prisma.classUsers.create({
              data: {
                classId,
                userId: user.id,
                capacity: targetedClass!.capacity! - 1,
                time: "fixed",
                date: "fixed",
              },
            });
          }
        }
        await prisma.notifs.create({
          data: {
            title: `${user.fName} ${user.lName} registered in ${targetedClass?.title} class`,
            type: "joinClass",
          },
        });
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
