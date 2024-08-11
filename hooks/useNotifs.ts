import { getNotifs, readNotif } from "@/actions/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetNotifs() {
  return useQuery({
    queryKey: ["getNotifs"],
    queryFn: async () => {
      const notifs = await getNotifs();
      return notifs;
    },
  });
}

export function useReadNotif() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await readNotif(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getNotifs"] });
    },
  });
}
