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
