"use server";
import prisma from "@/utils/db";
import { cookies } from "next/headers";
const { verify } = require("jsonwebtoken");
export const getToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("token");
};

export const verifyToken = (token: string) => {
  const validate = verify(token, process.env.TOKEN_SERCRET);
  if (validate) {
    return validate;
  } else {
    return "The token has problem";
  }
};

export const exampleRetireveStudents = async () => {
  const students = await prisma.user.findMany();
  console.log(students);
  return students;
};
