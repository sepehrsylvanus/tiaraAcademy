import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
import prisma from "@/utils/db";
import { getMessages } from "next-intl/server";
const { sign } = require("jsonwebtoken");

type formDataProps = {
  email: string;
  password: string;
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const formData: formDataProps = await req.json();
  const messages = (await getMessages()) as any;
  const signInT = messages.SignIn;
  const user = await prisma.user.findUnique({
    where: {
      email: formData.email,
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

  const token = sign(
    {
      data: formData.email,
    },
    process.env.NEXT_PUBLIC_TOKEN_SERCRET,
    {
      expiresIn: "30d",
    }
  );
  if (req.headers.get("apiKey")) {
    const response = NextResponse.json({
      message: signInT.success,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return response;
  } else {
    return NextResponse.json({ message: "Access denied" }, { status: 401 });
  }
};
