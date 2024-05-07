"use server";
import prisma from "@/utils/db";
import { RadioButtonCheckedRounded } from "@mui/icons-material";
import { Repostspace, S3 } from "aws-sdk";
import { cookies } from "next/headers";
import { toast } from "react-toastify";
import { getSingleUser } from "./userActions";
import { User } from "@/utils/types";
type WritingAnswerToSend = {
  band: string;
  writingSelf: string;
  writingId?: string;
  writingFileId?: string;
};
const { verify } = require("jsonwebtoken");
export const getToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("token");
};

export const verifyToken = (token: string) => {
  const validate = verify(token, process.env.NEXT_PUBLIC_TOKEN_SERCRET);
  if (validate) {
    return validate;
  } else {
    return "The token has problem";
  }
};

export const retieveUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const getWritings = async () => {
  const writings = await prisma.writing.findMany({
    include: {
      creator: true,
      writingAnswer: true,
    },
  });
  return writings;
};

export const postWriting = async (formData: FormData) => {
  console.log(formData);
  const name = formData.get("name") as string;
  const teacherId = formData.get("teacherId") as string;
  const subject = formData.get("subject") as string;
  const image = formData.get("image") as File;
  const writing = formData.get("writing") as string;
  const token = await getToken()!;
  const user = await getSingleUser(token?.value)!;
  const creatorId = user?.id as string;
  const teacherWhoHasWriting = await prisma.user.findUnique({
    where: {
      id: teacherId,
    },
  });
  console.log(teacherWhoHasWriting?.role);
  if (!teacherWhoHasWriting) {
    throw new Error("User with this ID doesn't exist");
  } else if (
    !teacherWhoHasWriting.role.includes("teacher") &&
    !teacherWhoHasWriting.role.includes("adminTeacher")
  ) {
    throw new Error("User with this ID is not teacher");
  } else {
    if (subject) {
      const newWriting = await prisma.writing.create({
        data: {
          name,
          creatorId,
          teacherId,
          email: user?.email,
          subject,
          writing,
        },
      });
      if (image) {
        console.log(image);
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const Key = newWriting.id + "." + image.type.split("/")[1];

        const s3 = new S3({
          accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
          secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
          endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
        });

        const params = {
          Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
          Key,
          Body: buffer,
        };
        const response = await s3.upload(params).promise();
        if (response) {
          const permanentSignedUrl = s3.getSignedUrl("getObject", {
            Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
            Key,
            Expires: 31536000,
          });
          await prisma.writing.update({
            where: {
              id: newWriting.id,
            },
            data: {
              subjectImgURL: permanentSignedUrl,
            },
          });

          return `Writing with name ${newWriting.subject} created`;
        } else {
          await prisma.writing.delete({
            where: {
              id: newWriting.id,
            },
          });
          throw new Error("There is a problem in submitting your writing");
        }
      }
    }
  }
};

export const postVideo = async (data: FormData) => {
  const title = data.get("title") as string;

  const video = data.get("video") as File;

  const bytes = await video.arrayBuffer();
  const buffer = await Buffer.from(bytes);
  const videoData = {
    title,
  };
  const newvideo = await prisma.video.create({
    data: videoData,
  });

  const name = newvideo.id + "." + video.name.split(".").pop();

  try {
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
      Key: name,
      Body: buffer!,
    };
    const response = await s3.upload(params).promise();
    const permanentSignedUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
      Key: name,
      Expires: 31536000, // 1 year
    });
    await prisma.video.update({
      where: {
        id: newvideo.id,
      },
      data: {
        bucketKey: name,
        videoLink: permanentSignedUrl,
      },
    });

    if (response) {
    }

    return "Your video created sucessfully";
  } catch (error) {}
};

export const deleteVideo = async (data: FormData) => {
  const id = data.get("id") as string;

  const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
    endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
  });
  const video = await prisma.video.findUnique({
    where: {
      id,
    },
  });

  const bucketName: string = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!;

  await s3
    .deleteObject({ Bucket: bucketName, Key: video?.bucketKey! })
    .promise();

  await prisma.video.delete({
    where: {
      id: id,
    },
  });
};

export const getSingleClass = async (id: string) => {
  const result = await prisma.class.findUnique({
    where: {
      id,
    },
    include: {
      creator: true,
    },
  });

  return result;
};

export const getSingleUserDetails = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const getClasses = async () => {
  return prisma.class.findMany({
    include: {
      creator: true,
    },
  });
};
