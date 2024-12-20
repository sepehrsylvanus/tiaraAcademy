import { getSingleClass, getToken } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import { useGetCurrentUser } from "@/hooks/useGetUsers";
import { S3 } from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const body = await req.json();
  const token = await getToken()!;
  const currentUser = await getSingleUser();

  const image = await body.buffer;

  try {
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
      Key: currentUser?.fName!,
      Body: image,
    };

    const response = await s3.upload(params).promise();
  } catch (error: any) {
    console.log(error.message);
  }
  return NextResponse.json("HEllo");
};
