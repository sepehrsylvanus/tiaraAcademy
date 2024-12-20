import { postWriting } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import { getMyWritingCharge } from "@/actions/writing";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useGetMyCharge() {
  return useQuery({
    queryKey: ["getMyWritingCharge"],
    queryFn: async () => {
      const user = await getSingleUser();
      const myCharge = await getMyWritingCharge(user?.id!);
      return myCharge;
    },
  });
}

export function usePostWriting() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const writing = await postWriting(formData);
      return writing;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getMyWritingCharge"] });
      toast.success(data);
    },
  });
}
