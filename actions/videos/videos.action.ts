"use server";

import prisma from "@/utils/db";
import { NetworkFirewall, S3 } from "aws-sdk";
import { getSingleUser } from "../userActions";
import { VideoCourse } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { del, put } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
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
  const language = formData.get("language") as
    | "english"
    | "spanish"
    | "general";
  const prerequisities = JSON.parse(formData.get("tags") as string) as string[];
  const thumbnailLink = formData.get("thumbnailLink") as string;
  const materialsLink = formData.get("materialsLink") as string;
  try {
    const currentUser = await getSingleUser();

    // Convert files to buffers

    // =========== VERCEL UPLOAD =================

    // =========== END OF VERCEL UPLOAD =================

    await prisma.videoCourse.create({
      data: {
        title: normalValues.title,
        description: normalValues.description,
        teacherId: currentUser!.id,
        explenation: normalValues.explenation,
        thumbnailLink: thumbnailLink,
        price: normalValues.price,
        materialsLink: materialsLink,
        category: language,
        prerequisities: prerequisities,
      },
    });

    return "Your video course has been created";
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
export const createVideoCourseSession = async (formData: FormData) => {
  const videoLink = formData.get("videoLink") as string;
  const title = formData.get("title") as string;
  const duration = formData.get("duration") as string;
  const useFullDuration = parseInt(duration);
  const videoCourseId = formData.get("videoCourseId") as string;
  const index = formData.get("index") as string;
  const videoName = formData.get("videoName") as string;
  const rawDuration = Number(duration);
  try {
    // const s3 = new S3({
    //   accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
    //   secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
    //   endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    // });

    const newSession = await prisma.videoCourseSession.create({
      data: {
        title,
        videoCourseId,
        duration: rawDuration,
        video: videoLink,
        index: parseInt(index),
        videoName,
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

export const deleteVideoSession = async (id: string) => {
  try {
    const targetedVideo = await prisma.videoCourseSession.findUnique({
      where: {
        id,
      },
    });
    await del(targetedVideo!.video!);
    await prisma.videoCourseSession.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const deleteVideoCourse = async (id: string) => {
  const course = await prisma.videoCourse.findUnique({
    where: {
      id,
    },
    include: {
      videoCourseSession: true,
    },
  });

  const sessions = course?.videoCourseSession;
  const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
    endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
  });
  // s3
  // .deleteObject({
  //   Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
  //   Key: course.,
  // })
  // .promise()

  if (course) {
    await del(course.thumbnailLink!);
    await del(course.materialsLink!);
  }
  try {
    if (sessions?.length) {
      await Promise.all(
        sessions.map((session) =>
          s3
            .deleteObject({
              Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
              Key: session.videoName!,
            })
            .promise()
        )
      );
      await Promise.all(
        sessions.map((session) =>
          prisma.videoCourseSession.delete({
            where: {
              id: session.id,
            },
          })
        )
      );
    }

    await prisma.videoCourse.delete({
      where: {
        id,
      },
    });

    return "The desired video delete successfully";
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const fetchRegisteredVideoCourse = async (
  userId: string,
  courseId: string
) => {
  try {
    const registeredVideoCourse = await prisma.freeVideoCourseUser.findMany({
      where: {
        AND: [{ videoCourseId: courseId }, { userId }],
      },
    });
    return registeredVideoCourse;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const adddFreeVideoCourse = async ({
  videoCourseId,
  userId,
}: {
  videoCourseId: string;
  userId: string;
}) => {
  const newFreeVideoCoruse = await prisma.freeVideoCourseUser.create({
    data: {
      videoCourseId,
      userId,
    },
  });
  if (newFreeVideoCoruse) {
    return newFreeVideoCoruse;
  }
};
export const fetchAllMyVideos = async (userId: string) => {
  const videos = [];

  const freeVideos = await prisma.freeVideoCourseUser.findMany({
    where: {
      userId,
    },
  });

  const verifiedVideosPayment = await prisma.coursePayment.findMany({
    where: {
      userId,
    },
  });

  const freeVideosPromises = freeVideos.map(async (video) => {
    const eachVideo = await prisma.videoCourse.findUnique({
      where: {
        id: video.videoCourseId,
      },
      include: {
        teacher: true,
        videoCourseSession: true,
      },
    });
    return eachVideo;
  });

  const verifiedVideosPromises = verifiedVideosPayment.map(async (video) => {
    const eachVideo = await prisma.videoCourse.findUnique({
      where: {
        id: video.courseId,
      },
      include: {
        teacher: true,
        videoCourseSession: true,
      },
    });
    return eachVideo;
  });

  const resolvedFreeVideos = await Promise.all(freeVideosPromises);
  const resolvedVerifiedVideos = await Promise.all(verifiedVideosPromises);

  // Filter out null values
  const allVideos = [...resolvedFreeVideos, ...resolvedVerifiedVideos].filter(
    (video): video is NonNullable<typeof video> => video !== null
  );

  return allVideos;
};

export const editVideoCourse = async (FormData: FormData) => {
  const id = FormData.get("id") as string;
  const title = FormData.get("title") as string;
  const priceString = FormData.get("price") as string;
  const discount = FormData.get("discount") as string;
  const description = FormData.get("description") as string;
  const explenation = FormData.get("explenation") as string;
  const price = Number(priceString);
  try {
    await prisma.videoCourse.update({
      where: {
        id,
      },
      data: {
        title,
        price,
        discount,
        discountedPrice: (price - (price * Number(discount)) / 100).toString(),
        description,
        explenation,
      },
    });
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getFreeVideoUsers = async (userId: string) => {
  const freeVideoUser = await prisma.freeVideoCourseUser.findMany({
    where: {
      userId,
    },
  });
  return freeVideoUser;
};
