"use server";
import prisma from "@/utils/db";

import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const formData = await req.json();
    console.log(formData);
    formData.password = bcrypt.hashSync(formData.password, 12);
    console.log(formData);

    const newUser = await prisma.user.create({
      data: formData,
    });
    console.log(newUser);
    return new NextResponse(JSON.stringify({ newUser, message: "HI!" }));
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Creating user crashed" })
    );
  }
};
