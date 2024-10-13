import {
  createVideoCourseSession,
  getSingleVideo,
  getSingleVideoSession,
} from "@/actions/videos/videos.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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

export const usePostSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      console.log(formData);
      await createVideoCourseSession(formData);
      return "session created succesfully";
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getVideoCourseDetails"] });
      toast.success("Session created successfully");
    },
  });
};
