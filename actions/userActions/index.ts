"use server";

import prisma from "@/utils/db";
import { getToken, verifyToken } from "../actions";

import { S3 } from "aws-sdk";

export const getSingleUser = async (token: string) => {
  const tokenPayload = verifyToken(token);

  const user = await prisma.user.findUnique({
    where: {
      email: tokenPayload.data,
    },
  });

  return user;
};
export const editProf = async (data: FormData) => {
  console.log(data);
  const token = await getToken()!;
  const email = await verifyToken(token.value).data;
  const currentUser = await getSingleUser(token.value);
  const profPic = data.get("profPic") as File;
  const firstName = data.get("firstName") as string;
  const lastName = data.get("lastName") as string;
  const imageToSend = await profPic.arrayBuffer()!;
  console.log(profPic);
  const buffer = Buffer.from(imageToSend);

  try {
    if (profPic) {
      try {
        const s3 = new S3({
          accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
          secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
          endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
        });

        const params = {
          Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
          Key: `${currentUser?.fName}prof.${profPic.type.split("/")[1]}`,
          Body: buffer,
        };
        if (currentUser?.image) {
          await s3
            .deleteObject({
              Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
              Key: `${currentUser?.fName}prof.${profPic.type.split("/")[1]}`,
            })
            .promise();
        }
        const response = await s3.upload(params).promise();
        console.log(response);
        const permanentSignedUrl = s3.getSignedUrl("getObject", {
          Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
          Key: `${currentUser?.fName}prof.${profPic.type.split("/")[1]}`,
          Expires: 31536000,
        });
        await prisma.user.update({
          where: {
            email,
          },
          data: {
            image: permanentSignedUrl,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
    if (firstName) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          fName: firstName,
        },
      });
    }

    if (lastName) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          lName: lastName,
        },
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return "There is an error in server";
  }
};
export const removeProf = async () => {
  const token = await getToken()!;
  const email = await verifyToken(token.value).data;
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      image: "",
    },
  });
};
export const addEmail = async (additionalEmail: string) => {
  console.log(additionalEmail);

  const token = await getToken()!;
  const email = await verifyToken(token.value).data;

  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      additionalEmails: { push: additionalEmail },
    },
  });
  if (updatedUser) {
    console.log(updatedUser);
  } else {
    console.log("nothing");
  }
};
export const removeEmail = async () => {
  const token = await getToken()!;
  const email = await verifyToken(token.value).data;
  const currentUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  currentUser?.additionalEmails.pop();
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      additionalEmails: currentUser?.additionalEmails,
    },
  });
};
