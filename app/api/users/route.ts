"use server";
import prisma from "@/utils/db";

import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcryptjs");

type FormDataProps = {
  fName: string;
  lName: string;
  email: string;
  password: string;
};

// ============ REGISTER USER ============
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const formData: FormDataProps = await req.json();
    console.log(formData);
    formData.password = bcrypt.hashSync(formData.password, 12);
    console.log(formData);
    const alreadyRegistered = await prisma.user.findFirst({
      where: {
        email: formData.email,
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
    console.log(newUser);

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
};

// ============ GET MULTIPLE OR SINGLE USER ============
