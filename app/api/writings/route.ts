import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  // try {
  //   if (!selectedImage) {
  //     console.log("first");
  //     return;
  //   }
  //   const s3 = new S3({
  //     accessKeyId: process.env.LIARA_ACCESS_KEY_ID,
  //     secretAccessKey: process.env.LIARA_SECRET_ACCESS_KEY,
  //     endpoint: process.env.LIARA_ENDPOINT,
  //   });
  //   const params = {
  //     Bucket: process.env.LIARA_BUCKET_NAME!,
  //     Key: selectedImage.name!,
  //     Body: selectedImage!,
  //   };
  //   console.log(params);
  //   const res = await s3.upload(params).promise();
  //   const permanentSignedUrl = s3.getSignedUrl("getObject", {
  //     Bucket: process.env.LIARA_BUCKET_NAME!,
  //     Key: selectedImage.name,
  //     Expires: 31536000, // 1 year
  //   });
  //   console.log(res);
  //   console.log(permanentSignedUrl);
  // } catch (error) {}

  try {
    console.log(body);
    console.log(body.selectedImage);
    return NextResponse.json({ message: "HI!" });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
};
