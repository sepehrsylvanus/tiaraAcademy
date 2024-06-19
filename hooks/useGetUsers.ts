"use client";
import { getToken, retieveUsers } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";

import { useQuery } from "@tanstack/react-query";

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
      const currentUser = await getSingleUser(token?.value);
      return currentUser;
    },
  });
}
