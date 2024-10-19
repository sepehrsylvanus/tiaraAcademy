"use server";

import prisma from "@/utils/db";
import { getSingleUser } from "../userActions";
import { S3 } from "aws-sdk";

export const createArticle = async (
  language: boolean,
  title: string,
  category: string,
  formData: FormData
) => {
  const currentUser = await getSingleUser();
  const image = formData.get("articleImg");
  const text = formData.get("text") as string;
  const arrayBuffer = await (image as File).arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const name = new Date() + (image as File).name;
  try {
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    });
    const params = {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
      Key: name,
      Body: buffer,
    };
    const response = await s3.upload(params).promise();

    const imageLink = s3.getSignedUrl("getObject", {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
      Key: name,
      Expires: 31536000, // 1 year
    });

    const newArticle = await prisma.blog.create({
      data: {
        title,
        image: imageLink,
        authorId: currentUser!.id,
        categories: category,
        text,
        bucketKey: name,
        english: language,
      },
    });
    if (newArticle) {
      return "New article created successfully";
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const deleteArticle = async (id: string) => {
  const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
    endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
  });
  const targetedArticle = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  try {
    const deletedFile = await s3
      .deleteObject({
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key: targetedArticle?.bucketKey!,
      })
      .promise();

    if (deletedFile) {
      const deleteArticle = await prisma.blog.delete({
        where: {
          id,
        },
      });
      return deleteArticle;
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
