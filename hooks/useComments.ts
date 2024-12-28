import {
  approveComment,
  deleteComment,
  getAllComments,
} from "@/actions/comments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetAllComments = () => {
  return useQuery({
    queryKey: ["getAllComments"],
    queryFn: async () => {
      const comments = await getAllComments();
      return comments;
    },
  });
};
export const useApproveComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await approveComment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllComments"] });
      toast.success("Comment approved");
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      console.log(id);
      // await deleteComment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllComments"] });
      toast.error("Comment deleted");
    },
  });
};
