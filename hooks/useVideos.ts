import {
  getSingleVideo,
  getSingleVideoSession,
} from "@/actions/videos/videos.action";
import { useQuery } from "@tanstack/react-query";

export const useGetCourseVideosDetails = (id: string) => {
  return useQuery({
    queryKey: ["getVideoCourseDetails"],

    queryFn: async () => {
      const videoDetails = await getSingleVideo(id);
      return videoDetails;
    },
  });
};

export const useGetSessionDetails = (id: string) => {
  return useQuery({
    queryKey: ["getVideoSessionDetails"],
    queryFn: async () => {
      const videoSessionDetails = getSingleVideoSession(id);
      return videoSessionDetails;
    },
  });
};
