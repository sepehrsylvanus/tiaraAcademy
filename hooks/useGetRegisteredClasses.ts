import { getRegisterdClasses } from "@/actions/actions";
import prisma from "@/utils/db";
import { Class } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";

export const useGetRegisteredClasses = (classId: string, userId: string) => {
  return useQuery({
    queryKey: ["getRegisteredClass"],
    queryFn: async () => {
      const myRegisteredClasses = await getRegisterdClasses(classId, userId);
      return myRegisteredClasses;
    },
  });
};
