import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  if (req.headers.get("apiKey")) {
    const res = NextResponse.json({ message: "You logged out" });
    res.cookies.delete("token");
    return res;
  } else {
    return NextResponse.json({ message: "Access Denied" }, { status: 401 });
  }
};
