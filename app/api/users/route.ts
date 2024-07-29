"use server";
import prisma from "@/utils/db";
import { getMessages } from "next-intl/server";

import { NextRequest, NextResponse } from "next/server";
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
  const t = await getMessages({ locale: "SignUp" });
  console.log(t);
  if (req.headers.get("apiKey")) {
    try {
      const formData: FormDataProps = await req.json();

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
          { error: "User Already there!" },
          { status: 409 }
        );
      }

      const newUser = await prisma.user.create({
        data: formData,
      });

      return NextResponse.json({
        message: `New user successfully created: ${newUser.fName} ${newUser.lName}`,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Creating user crashed" },
        { status: 500 }
      );
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
