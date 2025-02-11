import { getAllPodcasts } from "@/actions/podcasts.action";
import { useQuery } from "@tanstack/react-query";

export const useGetPodcasts = () => {
  return useQuery({
    queryKey: ["getPodcasts"],
    queryFn: async () => {
      const podcasts = await getAllPodcasts();
      return podcasts;
    },
  });
};
