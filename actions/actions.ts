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

export const retieveUsers = async () => {
  const users = await prisma.user.findMany();
  console.log(users);
  return users;
};

export const postWriting = async (data: FormData) => {
  console.log(data);
  const name = data.get("name");
  const email = data.get("email");
  const subject = data.get("subject");
  const image = data.get("image");
  const writing = data.get("writing");
  console.log(name);
  console.log(email);
  console.log(subject);
  console.log(image);
  console.log(writing);
};
