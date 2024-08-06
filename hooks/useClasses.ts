import { getClasses } from "@/actions/actions";
import { Class } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export function useGetClasses() {
  return useQuery({
    queryKey: ["getClasses"],
    queryFn: async () => {
      const classes = (await getClasses()) as Class[];
      return classes;
    },
  });
}
