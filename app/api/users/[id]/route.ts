import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
const bcryptjs = require("bcryptjs");
type ParamsProps = {
  params: {
    id: string;
  };
};
export const PUT = async (req: NextRequest, { params }: ParamsProps) => {
  if (req.headers.get("apiKey") && !req.headers.get("forgetPass")) {
    try {
      const userId = params.id;
      const body = await req.json();
      const role = body.role;

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: { role },
      });
      return NextResponse.json({ message: `User role changed to ${role}` });
    } catch (error) {
      return NextResponse.json(
        { message: `There is an error in server` },
        { status: 500 }
      );
    }
  } else if (req.headers.get("apiKey") && req.headers.get("forgetPass")) {
    try {
      const body = await req.json();
      console.log(body);
      const ifOtpValid = await prisma.otp.findMany({
        where: {
          AND: [{ otp: body.verification }, { pNumber: params.id }],
        },
      });
      let phoneToSearch = params.id;
      if (params.id.startsWith("+")) {
        phoneToSearch = "0" + params.id.split("").slice(3).join("");
      }
      const ifUserValid = await prisma.user.findUnique({
        where: {
          pNumber: phoneToSearch,
        },
      });
      console.log(ifUserValid);
      if (ifOtpValid && ifUserValid) {
        console.log("valid");
        const newPssword = bcryptjs.hashSync(body.password, 12);
        await prisma.user.update({
          where: {
            pNumber: phoneToSearch,
          },
          data: {
            password: newPssword,
          },
        });
        await prisma.otp.delete({
          where: {
            otp: body.verification,
          },
        });
        return NextResponse.json({
          message: "Your password changed successfully",
        });
      } else if (!ifOtpValid) {
        return NextResponse.json(
          { message: "You entered wrong otp" },
          { status: 404 }
        );
      } else if (ifUserValid) {
        return NextResponse.json(
          { message: "There is no user with this phone number" },
          { status: 404 }
        );
      }
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
