import { getToken, retieveUsers } from "@/actions/actions";
import {
  addEmail,
  addPhone,
  editProf,
  getSingleUser,
  removeEmail,
  removePhone,
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
      const currentUser = await getSingleUser();
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
      toast.success("New email added");
    },
  });
}
export function useRemoveEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (emailToDelete: string) => {
      await removeEmail(emailToDelete);
      return `${emailToDelete} deleted`;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
      toast.warning("Email deleted");
    },
  });
}
export function useAddPhone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (additionalPhone: string) => {
      await addPhone(additionalPhone);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });
      toast.success("New phone number added");
    },
  });
}
export function useRemovePhone() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (phoneToDelete: string) => {
      await removePhone(phoneToDelete);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getCurrentUser"] });

      toast.warning("Additional phone number deleted");
    },
  });
}
