import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
import prisma from "@/utils/db";
const { sign } = require("jsonwebtoken");

type formDataProps = {
  email: string;
  password: string;
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const formData: formDataProps = await req.json();

  console.log(formData);

  const user = await prisma.user.findUnique({
    where: {
      email: formData.email,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isPassValid = bcrypt.compareSync(formData.password, user.password);

  if (!isPassValid) {
    return NextResponse.json(
      { error: "Email or password is wrong" },
      { status: 403 }
    );
  }

  const token = sign(
    {
      data: formData.email,
    },
    process.env.TOKEN_SERCRET,
    {
      expiresIn: "1d",
    }
  );

  console.log(token);

  const response = NextResponse.json({
    message: "User logged in successfully",
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 60 * 24 ,
  });

  return response;
};
