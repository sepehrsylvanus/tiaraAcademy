"use server";
const { verify } = require("jsonwebtoken");
export const getToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("token");
};

export const verifyToken = (token: string) => {
  const validate = verify(token, process.env.TOKEN_SERCRET);
  if (validate) {
    return validate;
  } else {
    return "The token has problem";
  }
};

import prisma from "@/utils/db";
import { Instructure } from "@/utils/types";
import { cookies } from "next/headers";
export const getFeaturedClasses = async () => {
  const result = await prisma.class.findMany({
    where: { featured: true },
    include: {
      classInstructors: {
        include: {
          instructor: true,
        },
      },
    },
  });
  return result;
};

export const getSingleClass = async (id: string) => {
  const singleClass = await prisma.class.findUnique({
    where: {
      id: id,
    },
  });
  return singleClass;
};

// export const retrieveAdminStatus = async (userId: string) => {
//   const isAdmin = (await clerkClient.users.getUser(userId)).privateMetadata
//     .isAdmin;
//   if (isAdmin) {
//     return true;
//   } else {
//     return false;
//   }
// };

export const retrieveTeacherName = async () => {
  const teachers = await prisma.instructure.findMany();

  const teachersName = teachers
    ? teachers.map((teacher: Instructure) => teacher.name)
    : [];

  return teachersName;
};

export const retrieveAllClasses = async (
  className?: string,
  teacherName?: string
) => {
  const classes = await prisma.class.findMany({
    where: {
      AND: [
        className ? { title: className } : {},
        teacherName
          ? {
              classInstructors: {
                some: {
                  instructor: {
                    name: teacherName,
                  },
                },
              },
            }
          : {},
      ],
    },
    include: {
      classInstructors: {
        include: {
          instructor: true,
        },
      },
    },
  });

  return classes;
};

export const retrieveTeachers = async () => {
  const teachers = await prisma.instructure.findMany();

  return teachers;
};

export const exampleRetireveStudents = async () => {
  const students = await prisma.user.findMany();
  console.log(students);
  return students;
};
