import { retieveUsers } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import { useQuery } from "@tanstack/react-query";
import { Cagliostro } from "next/font/google";

export function useGetTeacherNames() {
  return useQuery({
    queryKey: ["getTeacherNames"],
    queryFn: async () => {
      const users = await retieveUsers();
      const teachers = users.filter(
        (user) => user.role === "teacher" || user.role === "adminTeacher"
      );
      const names = teachers.map(
        (teacher) => `${teacher.fName} ${teacher.lName}`
      ) as string[];
      console.log(names);
      return names;
    },
  });
}

export function useGetUser() {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: async () => {
      const currentUser = await getSingleUser();
      return currentUser;
    },
  });
}
