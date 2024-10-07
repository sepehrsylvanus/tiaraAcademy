"use server";

import prisma from "@/utils/db";

export const getAllVideos = async () => {
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
