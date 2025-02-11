import { getAllPodcasts, makePodcastTrend } from "@/actions/podcasts.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetPodcasts = () => {
  return useQuery({
    queryKey: ["getPodcasts"],
    queryFn: async () => {
      const podcasts = await getAllPodcasts();
      return podcasts;
    },
  });
};
export const useTrendPodcast = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const trendMessage = await makePodcastTrend(id);
      return trendMessage;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getPodcasts"] });
      toast.success(data);
    },
  });
};
