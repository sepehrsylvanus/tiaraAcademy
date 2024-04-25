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

    formData.password = bcrypt.hashSync(formData.password, 12);

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

    return NextResponse.json({
      message: `New user successfully created: ${newUser.fName} ${newUser.lName}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Creating user crashed" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: `There is an error in server` },
      { status: 500 }
    );
  }
};
