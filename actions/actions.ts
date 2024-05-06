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

export const postWriting = async (data: FormData) => {
  const token = await getToken()!;

  const tokenPayload = await verifyToken(token.value);

  const name = data.get("name") as string;
  const subject = data.get("subject") as string;
  const image = data.get("image")! as File;
  const writing = data.get("writing") as string;
  const teacherId = data.get("teacherId")! as string;
  const email = tokenPayload.data;
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const user = await getSingleUser(token.value);
  const creatorId = user?.id as string;

  const teacher = await prisma.user.findUnique({
    where: {
      id: teacherId,
    },
  });
  if (!teacher) {
    return;
  } else if (teacher.role !== "teacher" && teacher.role !== "adminTeacher") {
    return;
  }
  try {
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
      Key: image?.name!,
      Body: buffer!,
    };
    const response = await s3.upload(params).promise();
    const permanentSignedUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
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
      creatorId,
    };

    if (response) {
      await prisma.writing.create({
        data,
      });
    }

    return "Your user created sucessfully";
  } catch (error) {}
};

export const getWritings = async () => {
  const result = [];
  const token = await getToken()!;
  const user = await getSingleUser(token?.value);
  const writings = await prisma.writing.findMany();
  result.push(...writings);
  const writingFiles = await prisma.writingFile.findMany();
  result.push(...writingFiles);
  const thisUserWritings = writings.filter(
    (writing) => writing.teacherId === user?.id
  );
  return thisUserWritings;
};

export const getSingleWriting = async (id: string) => {
  const myWriting = await prisma.writing.findUnique({
    where: {
      id,
    },
  });
  const myFileWriting = await prisma.writingFile.findUnique({
    where: {
      id,
    },
  });

  if (myWriting) {
    return myWriting;
  } else if (myFileWriting) {
    return myFileWriting;
  } else {
    return null;
  }
};

export const getStudentWritings = async () => {
  const result = [];
  const writings = await prisma.writing.findMany();
  const token = await getToken()!;
  const user = (await getSingleUser(token?.value)) as User;
  const studentWritings = writings.filter(
    (writing) => writing.creatorId === user.id
  );
  result.push(...studentWritings);
  const writingFiles = await prisma.writingFile.findMany();
  const studentWritingFiles = writingFiles.filter(
    (writingFile) => writingFile.creatorId === user.id
  );
  result.push(...studentWritingFiles);

  return result;
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

export const postWritingFile = async (data: FormData) => {
  const teacherId = data.get("teacherId") as string;
  const writingFile = data.get("writingFile") as File;
  const bytes = await writingFile.arrayBuffer();
  const buffer = await Buffer.from(bytes);
  const token = await getToken()!;
  const user = await getSingleUser(token?.value);
  const creatorId = user?.id as string;
  const newWritingFile = await prisma.writingFile.create({
    data: {
      teacherId,
      creatorId,
    },
  });

  try {
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
      Key: newWritingFile.id,
      Body: buffer!,
    };
    const response = await s3.upload(params).promise();
    const permanentSignedUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
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

    if (response) {
    }

    return "Your video created sucessfully";
  } catch (error) {}
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

export const postTeacherAnswer = async (data: WritingAnswerToSend) => {
  console.log(data);
  const newWritingAnswer = await prisma.writingAnswer.create({
    data,
  });
  if (data.writingId) {
    await prisma.writing.update({
      where: {
        id: data.writingId,
      },
      data: {
        status: "checked",
      },
    });
  } else {
    await prisma.writingFile.update({
      where: {
        id: data.writingFileId,
      },
      data: {
        status: "checked",
      },
    });
  }
};
