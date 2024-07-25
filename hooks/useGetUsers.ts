import { getToken, retieveUsers } from "@/actions/actions";
import {
  addEmail,
  addPhone,
  editProf,
  getSingleUser,
  removeEmail,
  removeProf,
} from "@/actions/userActions";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const getUsers = async () => {
  const users = await retieveUsers();
  return users;
};

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
}
export function useGetCurrentUser() {
  return useQuery({
    queryKey: ["getCurrentUser"],
    queryFn: async () => {
      const token = await getToken()!;
      console.log(token);
      const currentUser = await getSingleUser(token?.value);
      console.log(currentUser);
      return currentUser;
    },
  });
}
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      await editProf(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
      toast.success("User details updated");
    },
  });
}
export function useRemoveProf() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await removeProf();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
      toast.success("Profile picture removed");
    },
  });
}
export function useAddEmail() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (additionalEmail: string) => {
      await addEmail(additionalEmail);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
    },
  });
}
export function useRemoveEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (emailToDelete: string) => {
      console.log(emailToDelete);
      await removeEmail(emailToDelete);
      return `${emailToDelete} deleted`;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
      console.log(data);
      toast.success(data);
    },
  });
}
export function useAddPhone() {
  return useMutation({
    mutationFn: async (additionalPhone: string) => {
      await addPhone(additionalPhone);
    },
  });
}
