import { fetchUserPayments } from "@/actions/payment";

import { useQuery } from "@tanstack/react-query";

export function useGetMyPayments(userId: string) {
  return useQuery({
    queryKey: ["getMyPayments"],
    queryFn: async () => {
      const payments = await fetchUserPayments(userId);
      return payments;
    },
  });
}
