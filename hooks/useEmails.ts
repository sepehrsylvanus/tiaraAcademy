import { getEmails } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetNewsEmails = () => {
  return useQuery({
    queryKey: ["getEmail"],
    queryFn: async () => {
      const emails = await getEmails();
      return emails;
    },
  });
};
