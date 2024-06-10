import prisma from "@/utils/db";
import { useQuery } from "@tanstack/react-query";

async function fetchRegisteredClasses(classId: string, userId: string) {
  const myRegisteredClasses = await prisma.classUsers.findMany();
  console.log("My registered", myRegisteredClasses);
  return myRegisteredClasses;
}

export const useGetRegisteredClasses = (classId: string, userId: string) => {
  return useQuery({
    queryKey: ["getRegisteredClass"],
    queryFn: async () => await fetchRegisteredClasses(classId, userId),
  });
};
