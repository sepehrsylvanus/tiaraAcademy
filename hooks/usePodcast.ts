import {
  deleteLivePodcast,
  deletePodcast,
  getAllPodcasts,
  getLivePodcastLink,
  makePodcastTrend,
  uploadLivePodcast,
} from "@/actions/podcasts.action";
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
export const useGetLivePodcast = () => {
  return useQuery({
    queryKey: ["getLivePodcastLink"],
    queryFn: async () => {
      const liveLink = await getLivePodcastLink();
      return liveLink;
    },
  });
};
export const useUploadLivePodcast = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (link: string) => {
      const uploadLink = await uploadLivePodcast(link);
      return uploadLink;
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["getLivePodcastLink"] });
    },
  });
};
export const useDeleteLivePodcast = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (link: string) => {
      const deleteLink = await deleteLivePodcast(link);
      return deleteLink;
    },
    onSuccess: (data) => {
      toast.warning(data);
      queryClient.invalidateQueries({ queryKey: ["getLivePodcastLink"] });
    },
  });
};
export const useDeletePodcast = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const deletedPodcast = await deletePodcast(id);
      return deletedPodcast;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getPodcasts"] });
      toast.warning(data);
    },
  });
};
