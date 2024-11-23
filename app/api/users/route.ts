"use server";
import prisma from "@/utils/db";
import { getMessages } from "next-intl/server";

import { NextRequest, NextResponse } from "next/server";
import request from "request";
const bcrypt = require("bcryptjs");

type FormDataProps = {
  fName: string;
  lName: string;
  email: string;
  password: string;
  pNumber: string;
};

// ============ REGISTER USER ============
export const POST = async (req: NextRequest, res: NextResponse) => {
  const t = (await getMessages()) as any;
  const signUpT = t.SignUp;
  let rawPass: string;
  console.log(signUpT);
  if (req.headers.get("apiKey")) {
    try {
      const formData: FormDataProps = await req.json();
      rawPass = formData.password;
      formData.password = bcrypt.hashSync(formData.password, 12);
      if (formData.pNumber.startsWith("+98")) {
        formData.pNumber = "0" + formData.pNumber.split("").slice(3).join("");
        console.log(formData.pNumber);
      }

      console.log(formData.pNumber);
      const alreadyRegistered = await prisma.user.findFirst({
        where: {
          OR: [
            {
              email: formData.email,
            },
            { pNumber: formData.pNumber },
          ],
        },
      });

      if (alreadyRegistered) {
        return NextResponse.json(
          { error: signUpT.allreadyUser },
          { status: 409 }
        );
      }
      console.log(formData.pNumber, rawPass);
      try {
        const sendCode = await request.post(
          {
            url: "http://ippanel.com/api/select",
            body: {
              op: "pattern",
              user: process.env.NEXT_PUBLIC_SMS_USERNAME,
              pass: process.env.NEXT_PUBLIC_SMS_PASS,
              fromNum: "+983000505",
              toNum: formData.pNumber,
              patternCode: "xwukn10tpe6mhp7",
              inputData: [
                { phoneNumber: formData.pNumber as string },
                { password: rawPass as string },
              ],
            },
            json: true,
          },
          async function (error, response, body) {
            if (error) {
              console.log(error);
              throw new Error(error);
            } else if (!error && response.statusCode === 200) {
              console.log(response.body);
            } else {
              console.log("whatever you want");
            }
          }
        );

        console.log(sendCode);
        console.log(sendCode.body);
      } catch (error: any) {
        console.log(error);
        throw new Error(error);
      }
      const newUser = await prisma.user.create({
        data: formData,
      });

      await prisma.notifs.create({
        data: {
          title: `${newUser.fName} ${newUser.lName} registered`,
          type: "joinClass",
          userId: newUser.id,
        },
      });

      return NextResponse.json({
        message: `${signUpT.user} ${newUser.fName} ${newUser.lName} ${signUpT.created}`,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: signUpT.crashed }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Access denied" }, { status: 401 });
  }
};

export const GET = async (req: NextRequest) => {
  if (req.headers.get("apiKey")) {
    try {
      const users = await prisma.user.findMany();
      return NextResponse.json(users);
    } catch (error) {
      return NextResponse.json(
        { message: `There is an error in server` },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Access denied" }, { status: 401 });
  }
};
