import { getToken, retieveUsers } from "@/actions/actions";
import {
  addEmail,
  editProf,
  getSingleUser,
  removeProf,
} from "@/actions/userActions";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
