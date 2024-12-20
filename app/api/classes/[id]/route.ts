import prisma from "@/utils/db";
import { S3 } from "aws-sdk";
import { NextRequest, NextResponse } from "next/server";
type ParamsProps = {
  params: {
    id: string;
  };
};
export const DELETE = async (req: NextRequest, { params }: ParamsProps) => {
  if (req.headers.get("apiKey")) {
    try {
      const cls = await prisma.class.findUnique({
        where: {
          id: params.id,
        },
      });

      if (!cls) {
        return NextResponse.json(
          { message: "Class with this id doesn't exist" },
          { status: 404 }
        );
      }

      try {
        await prisma.classUsers.deleteMany({
          where: {
            classId: params.id,
          },
        });

        const classToDelete = await prisma.class.delete({
          where: {
            id: params.id,
          },
        });

        if (classToDelete?.imageName) {
          const s3 = new S3({
            accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
            secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
            endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
          });

          await s3
            .deleteObject({
              Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
              Key: cls?.imageName!,
            })
            .promise();
        }
        return NextResponse.json({
          message: "Your desired class successfully deleted!",
        });
      } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
          { message: "There is an error in server" },
          { status: 500 }
        );
      }
    } catch (error: any) {
      console.log(error.message);
      return NextResponse.json(
        { message: "There is an error in server" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Access denied", status: 401 });
  }
};
