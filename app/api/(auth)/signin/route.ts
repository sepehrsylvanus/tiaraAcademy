import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
import prisma from "@/utils/db";
import { getMessages } from "next-intl/server";
const { sign } = require("jsonwebtoken");

type FormDataProps = {
  email: string;
  password: string;
  userAgent: string;
};

export const POST = async (req: NextRequest) => {
  const formData: FormDataProps = await req.json();
  const messages = (await getMessages()) as any;
  const signInT = messages.SignIn;

  const user = await prisma.user.findUnique({
    where: {
      email: formData.email,
    },
    select: {
      password: true,
      agents: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: signInT.notFound }, { status: 404 });
  }

  const isPassValid = bcrypt.compareSync(formData.password, user.password);
  if (!isPassValid) {
    return NextResponse.json(
      { error: signInT.wrongCredentials },
      { status: 403 }
    );
  }

  // Check if the current device is already registered
  if (user.agents.includes(formData.userAgent)) {
    const token = sign(
      { data: formData.email },
      process.env.NEXT_PUBLIC_TOKEN_SECRET!,
      { expiresIn: "30d" }
    );

    const response = NextResponse.json({ message: signInT.success });
    response.cookies.set("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return response;
  }

  // If the user has more than 2 devices registered, deny the login
  if (user.agents.length >= 2) {
    return NextResponse.json({ error: signInT.tooManyDevice }, { status: 403 });
  }

  // Otherwise, add the new device and update the user record
  await prisma.user.update({
    where: { email: formData.email },
    data: {
      agents: {
        push: formData.userAgent,
      },
    },
  });

  const token = sign(
    { data: formData.email },
    process.env.NEXT_PUBLIC_TOKEN_SECRET!,
    { expiresIn: "30d" }
  );

  const response = NextResponse.json({ message: signInT.success });
  response.cookies.set("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return response;
};
