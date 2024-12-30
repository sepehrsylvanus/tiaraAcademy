import {
  deleteTeacherComment,
  getOneTeacherProfile,
  getTeacherComments,
} from "@/actions/teachers";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useGetTeacherComments = () => {
  return useQuery({
    queryKey: ["getTeacherComments"],
    queryFn: async () => {
      const teacherComments = await getTeacherComments();
      return teacherComments;
    },
  });
};

export const useDeletecomment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await deleteTeacherComment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTeacherComments"] });
      toast.warning("Comment deleted successfully");
    },
  });
};
