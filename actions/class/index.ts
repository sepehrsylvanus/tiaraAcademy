"use server";

import request from "request";
import axios from "axios";
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
      .catch((error) => {
        console.log(error);
      });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
