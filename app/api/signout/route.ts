import { NextResponse } from "next/server";

export const GET = async () => {
  const res = NextResponse.json({ message: "You logged out" });
  res.cookies.delete("token");
  return res;
};
