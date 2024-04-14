import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const formData = await req.json();
  console.log(formData);
};
