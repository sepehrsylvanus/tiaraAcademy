import { getVideos } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetVideos = () => {
  return useQuery({
    queryKey: ["getVideos"],
    queryFn: async () => {
    const videos = await getVideos();
      return videos;
    },
  });
};
