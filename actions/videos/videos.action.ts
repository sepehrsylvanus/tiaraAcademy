"use server";

import { S3 } from "aws-sdk";

export const testVideoUpload = async (data: FormData) => {
  const video = data.get("video") as File;
  console.log(video);
  const bytes = await video.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
    endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
  });
  const params = {
    Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
    Key: video.name,
    Body: buffer,
  };
  const response = await s3.upload(params).promise();
  console.log(response);
  return "Hi";
};
