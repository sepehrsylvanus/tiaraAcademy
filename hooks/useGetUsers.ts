"use client";
import { retieveUsers } from "@/actions/actions";

import { useQuery } from "@tanstack/react-query";

const getCurrentUser = async () => {
  const users = await retieveUsers();
  return users;
};

export function useGetUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getCurrentUser,
  });
}
