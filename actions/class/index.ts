"use server";

import request from "request";
import axios from "axios";
import prisma from "@/utils/db";
export const sendClassSms = async (
  className: string,
  link: string,
  userPhone: string
) => {
  try {
    let smsData = JSON.stringify({
      code: "hd02udgv2i77muw",
      sender: "+983000505",
      recipient: userPhone,
      variable: {
        className,
        link,
      },
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api2.ippanel.com/api/v1/sms/pattern/normal/send",
      headers: {
        apikey: process.env.NEXT_PUBLIC_SMS_API_KEY,
        "Content-Type": "application/json",
      },
      data: smsData,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error: any) => {
        console.log(error.message);
      });
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
export const editClass = async (
  id: string,
  title: string,
  price: string,
  discount: string
) => {
  const discountNumber = Number(discount);
  try {
    const teargetedClass = await prisma.class.findUnique({
      where: {
        id,
      },
    });
    await prisma.class.update({
      where: {
        id,
      },
      data: {
        title,

        price,
        discountedPrice:
          discountNumber > 0
            ? String(Number(price) - (Number(price) * discountNumber) / 100)!
            : teargetedClass!.price!,
        discount,
      },
    });
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
