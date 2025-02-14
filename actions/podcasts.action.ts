"use server";

import prisma from "@/utils/db";

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
  try {
    const name = data.get("name") as string;
    const imageLink = data.get("imageLink") as string;
    const imageName = data.get("imageName") as string;
    const voiceLink = data.get("voiceLink") as string;
    const voiceName = data.get("voiceName") as string;
    const stringDuration = data.get("duration") as string;
    const duration = Number(stringDuration);
    const stringCategories = data.get("categories") as string;
    const categories = stringCategories.split(",");
    console.log({
      name,
      imageLink,
      imageName,
      voiceLink,
      voiceName,
      duration,
      categories,
    });
    const newPodcast = await prisma.podcast.create({
      data: {
        name,
        imageLink,
        imageName,
        voiceLink,
        voiceName,
        duration,
        categories,
      },
    });
    if (newPodcast) {
      return "New podcast posted successfully";
    }
  } catch (error: any) {
    console.log(error.message);
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
