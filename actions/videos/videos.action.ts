"use server";

import prisma from "@/utils/db";
import { S3 } from "aws-sdk";
import { getSingleUser } from "../userActions";
import { VideoCourse } from "@prisma/client";

export const getAllVideos = async (name?: string, category?: string) => {
  const videos = await prisma.videoCourse.findMany({
    include: {
      teacher: true,
      videoCourseSession: true,
    },
  });

  return videos;
};
export const getSingleVideo = async (id: string) => {
  console.log(id);
  const videoDetails = await prisma.videoCourse.findUnique({
    where: {
      id,
    },
    include: {
      videoCourseSession: true,
      teacher: true,
      Comment: {
        include: {
          CommentAnswer: {
            include: {
              answerCreator: true,
              comment: true,
            },
          },
          commentCreator: true,
        },
      },
    },
  });
  return videoDetails;
};
export const getSingleVideoSession = async (id: string) => {
  const sessionDetails = await prisma.videoCourseSession.findUnique({
    where: {
      id,
    },
    include: {
      Comment: {
        include: {
          CommentAnswer: {
            include: {
              answerCreator: true,
            },
          },
          commentCreator: true,
        },
      },
    },
  });
  return sessionDetails;
};
export const postComments = async (
  content: string,
  commentCreatorId: string,
  videoCourseId?: string,
  videoCourseSessionId?: string
) => {
  try {
    if (videoCourseId) {
      await prisma.comment.create({
        data: {
          content,
          commentCreatorId,
          videoCourseId,
        },
      });
    } else {
      await prisma.comment.create({
        data: {
          content,
          commentCreatorId,
          videoCourseSessionId,
        },
      });
    }
    return "Your new comment submitted";
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const createVideoCourse = async (formData: FormData) => {
  const normalValues = JSON.parse(formData.get("normalValues") as string);
  const image = formData.get("image") as File;
  const language = formData.get("language") as
    | "english"
    | "spanish"
    | "general";
  const materials = formData.get("materials") as File;
  const prerequisities = JSON.parse(formData.get("tags") as string) as string[];
  console.log(normalValues, image, language, materials);
  try {
    const currentUser = await getSingleUser();
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    });
    const imageName = new Date().getTime() + image.name;
    const materialsName = new Date().toString() + materials.name;
    const thumbnailBit = await image.arrayBuffer();

    const thumbnailBuffer = Buffer.from(thumbnailBit);
    const materialbut = await materials.arrayBuffer();
    const materialsBuffer = Buffer.from(materialbut);
    console.log(process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME);
    if (process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME) {
      const params = {
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key: imageName,
        Body: thumbnailBuffer,
      };
      const params2 = {
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key: materialsName,
        Body: materialsBuffer,
      };

      const response1 = await s3.upload(params).promise();
      const response2 = await s3.upload(params2).promise();
      const thumbnailLink = s3.getSignedUrl("getObject", {
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key: imageName,
        Expires: 31536000, // 1 year
      });
      const materialsLink = s3.getSignedUrl("getObject", {
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key: materialsName,
        Expires: 31536000, // 1 year
      });
      const newVideoCourse = await prisma.videoCourse.create({
        data: {
          title: normalValues.title,
          description: normalValues.description,
          teacherId: currentUser!.id,
          explenation: normalValues.explenation,
          thumbnailLink,
          price: normalValues.price,
          materialsLink,
          category: language,
          prerequisities,
        },
      });
      return "Your video course has been created";
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const createVideoCourseSession = async (formData: FormData) => {
  console.log(formData);
  const video = formData.get("video") as File;
  const title = formData.get("title") as string;
  const duration = formData.get("duration") as string;
  const useFullDuration = parseInt(duration);
  const videoCourseId = formData.get("videoCourseId") as string;
  console.log(video, title, useFullDuration);
  const rawDuration = Number(duration);
  try {
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    });
    const videoName = new Date().getTime() + video.name;
    const videoBit = await video.arrayBuffer();
    const videoBuffer = Buffer.from(videoBit);
    const params = {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
      Key: videoName,
      Body: videoBuffer,
    };
    const response = await s3.upload(params).promise();
    const videoLink = s3.getSignedUrl("getObject", {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
      Key: videoName,
      Expires: 31536000, // 1 year
    });
    const newSession = await prisma.videoCourseSession.create({
      data: {
        title,
        videoCourseId,
        duration: rawDuration,
        video: videoLink,
      },
    });
    if (newSession) {
      return "Session added successfully";
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const postVideoCourse = async (
  id: string,
  type: string,
  content: string
) => {
  const currentUser = await getSingleUser();
  try {
    if (type === "videoCourse") {
      await prisma.comment.create({
        data: {
          content,
          videoCourseId: id,
          commentCreatorId: currentUser?.id!,
        },
      });
    } else if (type === "videoCourseSession") {
      await prisma.comment.create({
        data: {
          content,
          videoCourseSessionId: id,
          commentCreatorId: currentUser?.id!,
        },
      });
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
