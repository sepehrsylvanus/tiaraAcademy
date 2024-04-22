"use server";
import prisma from "@/utils/db";
import { RadioButtonCheckedRounded } from "@mui/icons-material";
import { S3 } from "aws-sdk";
import { cookies } from "next/headers";
import { toast } from "react-toastify";

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
  const token = await getToken()!;
  console.log(token);
  const tokenPayload = await verifyToken(token.value);

  const name = data.get("name") as string;
  const subject = data.get("subject") as string;
  const image = data.get("image")! as File;
  const writing = data.get("writing") as string;
  const teacherId = data.get("teacherId")! as string;
  const email = tokenPayload.data;
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  console.log(image.name);
  const teacher = await prisma.user.findUnique({
    where: {
      id: teacherId,
    },
  });
  if (!teacher) {
    console.log("Teacher not found");
    return;
  } else if (teacher.role !== "teacher" && teacher.role !== "adminTeacher") {
    console.log("User with this id is not teacher");
    return;
  }
  try {
    const s3 = new S3({
      accessKeyId: process.env.LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.LIARA_ENDPOINT,
    });

    const params = {
      Bucket: process.env.LIARA_BUCKET_NAME!,
      Key: image?.name!,
      Body: buffer!,
    };
    const response = await s3.upload(params).promise();
    const permanentSignedUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: image?.name,
      Expires: 31536000, // 1 year
    });
    const data = {
      name,
      teacherId,
      email,
      subject,
      subjectImgURL: permanentSignedUrl,
      writing,
    };

    if (response) {
      await prisma.writing.create({
        data,
      });
    }

    return "Your user created sucessfully";
  } catch (error) {
    console.log(error);
  }

  console.log(name);
  console.log(email);
  console.log(subject);
  console.log(image);
  console.log(writing);
  console.log(teacherId);
};

export const postVideo = async (data: FormData) => {
  console.log(data);
  const title = data.get("title") as string;
  const time = data.get("time") as string;
  const video = data.get("video") as File;
  console.log(title);
  console.log(time);
  console.log(video);
  const bytes = await video.arrayBuffer();
  const buffer = await Buffer.from(bytes);
  const videoData = {
    title,
  };
  const newvideo = await prisma.video.create({
    data: videoData,
  });
  console.log(newvideo);
  console.log(video);
  const name = newvideo.id + "." + video.name.split(".").pop();
  console.log(name);

  try {
    const s3 = new S3({
      accessKeyId: process.env.LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.LIARA_ENDPOINT,
    });

    const params = {
      Bucket: process.env.LIARA_BUCKET_NAME!,
      Key: name,
      Body: buffer!,
    };
    const response = await s3.upload(params).promise();
    const permanentSignedUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: name,
      Expires: 31536000, // 1 year
    });
    await prisma.video.update({
      where: {
        id: newvideo.id,
      },
      data: {
        videoLink: permanentSignedUrl,
      },
    });
    console.log("loading...");
    if (response) {
    }
    console.log("Your video created sucessfully");
    return "Your video created sucessfully";
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideo = async (data: FormData) => {
  const id = data.get("id") as string;
  console.log(id);
  const s3 = new S3({
    accessKeyId: process.env.LIARA_ACCESS_KEY_ID,
    secretAccessKey: process.env.LIARA_SECRET_ACCESS_KEY,
    endpoint: process.env.LIARA_ENDPOINT,
  });
  const bucketName: string = process.env.LIARA_BUCKET_NAME!;
  console.log(bucketName);

  await s3.deleteObject({ Bucket: bucketName, Key: id }).promise();

  await prisma.video.delete({
    where: {
      id: id,
    },
  });

  console.log("delete");
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
  console.log(result);
  return result;
};

export const postWritingFile = async (data: FormData) => {
  const teacherId = data.get("teacherId") as string;
  const writingFile = data.get("writingFile") as File;
  const bytes = await writingFile.arrayBuffer();
  const buffer = await Buffer.from(bytes);

  const newWritingFile = await prisma.writingFile.create({
    data: {
      teacherId,
    },
  });

  try {
    const s3 = new S3({
      accessKeyId: process.env.LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.LIARA_ENDPOINT,
    });

    const params = {
      Bucket: process.env.LIARA_BUCKET_NAME!,
      Key: newWritingFile.id,
      Body: buffer!,
    };
    const response = await s3.upload(params).promise();
    const permanentSignedUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.LIARA_BUCKET_NAME,
      Key: newWritingFile.id,
      Expires: 31536000, // 1 year
    });
    await prisma.writingFile.update({
      where: {
        id: newWritingFile.id,
      },
      data: {
        writingLink: permanentSignedUrl,
      },
    });
    console.log("loading...");
    if (response) {
    }
    console.log("Your writing file created sucessfully");
    return "Your video created sucessfully";
  } catch (error) {
    console.log(error);
  }
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
