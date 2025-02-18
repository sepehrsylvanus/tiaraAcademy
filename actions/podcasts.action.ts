"use server";

import prisma from "@/utils/db";
import { PodcastLevel } from "@prisma/client";
import { S3 } from "aws-sdk";

export const getAllPodcasts = async () => {
  try {
    const podcasts = await prisma.podcast.findMany();
    return podcasts;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const createNewPodcast = async (data: FormData) => {
  let imageName: string | undefined;
  let voiceName: string | undefined;

  try {
    const name = data.get("name") as string;
    const imageLink = data.get("imageLink") as string;
    imageName = data.get("imageName") as string;
    const voiceLink = data.get("voiceLink") as string;
    voiceName = data.get("voiceName") as string;
    const stringDuration = data.get("duration") as string;
    const duration = Number(stringDuration);
    const stringCategories = data.get("categories") as string;
    const categories = stringCategories.split(",");

    const description = data.get("description") as string;
    const level = data.get("level") as PodcastLevel;
    const newPodcast = await prisma.podcast.create({
      data: {
        name,
        imageLink,
        imageName,
        voiceLink,
        voiceName,
        duration,
        categories,
        description,
        level,
      },
    });
    if (newPodcast) {
      return "New podcast posted successfully";
    }
  } catch (error: any) {
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    });

    if (imageName) {
      await s3
        .deleteObject({
          Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
          Key: imageName,
        })
        .promise();
    }

    if (voiceName) {
      await s3
        .deleteObject({
          Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
          Key: voiceName,
        })
        .promise();
    }

    console.error(error.message);
    throw new Error(error.message);
  }
};

export const makePodcastTrend = async (id: string) => {
  try {
    const podcast = await prisma.podcast.findUnique({
      where: {
        id,
      },
      select: { trend: true },
    });
    const newTrend = !podcast?.trend;
    await prisma.podcast.update({
      where: {
        id,
      },
      data: {
        trend: newTrend,
      },
    });
    if (newTrend) {
      return "Podcast marked as trend";
    } else {
      return "Podcast unmarked as trend";
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
export const uploadLivePodcast = async (link: string) => {
  try {
    const podcastLive = await prisma.livePodcast.create({
      data: {
        link,
      },
    });
    if (podcastLive) {
      return "Live podcast uploaded successfully";
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const deleteLivePodcast = async (link: string) => {
  try {
    const deleteLivePodcast = await prisma.livePodcast.delete({
      where: {
        link,
      },
    });
    if (deleteLivePodcast) {
      return "You live podcast deleted successfully";
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
export const getLivePodcastLink = async () => {
  const liveLink = await prisma.livePodcast.findMany();
  return liveLink;
};
export const deletePodcast = async (id: string) => {
  try {
    const desiredPodcast = await prisma.podcast.findUnique({
      where: {
        id,
      },
    });
    if (!desiredPodcast) {
      throw new Error("Podcast not found");
    }
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    });
    const deleteThumbnail = await s3
      .deleteObject({
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key: desiredPodcast.imageName,
      })
      .promise();
    const deletePodcast = await s3
      .deleteObject({
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key: desiredPodcast.voiceName,
      })
      .promise();
    if (!deletePodcast || !deleteThumbnail) {
      throw new Error("An error happened in deleting files from cloud storage");
    }
    const deletedPodcast = await prisma.podcast.delete({
      where: {
        id,
      },
    });
    if (deletedPodcast) {
      return "Desired podcast deleted successfully";
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
