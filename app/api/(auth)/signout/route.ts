import { getSingleUser } from "@/actions/userActions";
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  if (req.headers.get("apiKey")) {
    const currentUser = await getSingleUser();
    const newDevices = currentUser?.agents.filter(
      (device) => device !== data.userAgent
    );
    await prisma.user.update({
      where: {
        email: currentUser!.email,
      },
      data: {
        agents: newDevices,
      },
    });
    const res = NextResponse.json({ message: "You logged out" });
    res.cookies.delete("token");
    return res;
  } else {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }
};
