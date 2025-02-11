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
