"use server";

import prisma from "@/utils/db";
import { getToken, verifyToken } from "../actions";

import { S3 } from "aws-sdk";

export const getSingleUser = async () => {
  const token = await getToken()!;
  const tokenPayload = verifyToken(token?.value);

  const user = await prisma.user.findUnique({
    where: {
      email: tokenPayload.data,
    },
    include: {
      ClassUsers: true,
      Class: true,
    },
  });

  return user;
};
export const getTeachers = async () => {
  const teachers = await prisma.user.findMany({
    where: {
      OR: [{ role: "teacher" }, { role: "adminTeacher" }],
    },
  });
  return teachers;
};
export const editProf = async (data: FormData) => {
  const token = await getToken()!;
  const email = await verifyToken(token.value).data;
  const currentUser = await getSingleUser();
  const profPic = data.get("profPic") as File;
  const firstName = data.get("firstName") as string;
  const lastName = data.get("lastName") as string;
  const imageToSend = profPic && (await profPic?.arrayBuffer()!);

  const buffer = Buffer.from(imageToSend);

  try {
    if (profPic) {
      try {
        const s3 = new S3({
          accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
          secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
          endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
        });

        const params = {
          Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
          Key: `${currentUser?.fName}prof.${profPic.type.split("/")[1]}`,
          Body: buffer,
        };
        if (currentUser?.image) {
          await s3
            .deleteObject({
              Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
              Key: `${currentUser?.fName}prof.${profPic.type.split("/")[1]}`,
            })
            .promise();
        }
        const response = await s3.upload(params).promise();
        const permanentSignedUrl = s3.getSignedUrl("getObject", {
          Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
          Key: `${currentUser?.fName}prof.${profPic.type.split("/")[1]}`,
          Expires: 31536000,
        });
        await prisma.user.update({
          where: {
            email,
          },
          data: {
            image: permanentSignedUrl,
          },
        });
      } catch (error: any) {
        console.log(error.message);
      }
    }
    if (firstName) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          fName: firstName,
        },
      });
    }

    if (lastName) {
      await prisma.user.update({
        where: {
          email,
        },
        data: {
          lName: lastName,
        },
      });
    }
    return true;
  } catch (error: any) {
    console.log(error.message);
    return "There is an error in server";
  }
};
export const removeProf = async () => {
  const token = await getToken()!;
  const email = await verifyToken(token.value).data;
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      image: "",
    },
  });
};
export const addEmail = async (additionalEmail: string) => {
  const token = await getToken()!;
  const email = await verifyToken(token.value).data;

  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: {
      additionalEmails: { push: additionalEmail },
    },
  });
};
export const removeEmail = async (emailToDelete: string) => {
  const token = await getToken()!;
  const email = await verifyToken(token.value).data;
  const currentUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const index = currentUser?.additionalEmails.findIndex(
    (item) => item === emailToDelete
  )!;
  currentUser?.additionalEmails.splice(index, 1);
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      additionalEmails: currentUser?.additionalEmails,
    },
  });
};
export const addPhone = async (additionalPhone: string) => {
  const token = await getToken()!;
  const email = await verifyToken(token.value).data;

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      addintionalPNumbers: { push: additionalPhone },
    },
  });
};
export const removePhone = async (phoneToDelete: string) => {
  const token = await getToken()!;
  const email = await verifyToken(token.value).data;
  const currentUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const index = currentUser?.addintionalPNumbers.findIndex(
    (item) => item === phoneToDelete
  )!;
  currentUser?.addintionalPNumbers.splice(index, 1);
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      addintionalPNumbers: currentUser?.addintionalPNumbers,
    },
  });
};

export const createTeacherProfile = async (formData: FormData) => {
  const description = formData.get("description") as string;
  const bio = formData.get("bio") as string;
  const persianBio = formData.get("persianBio") as string;
  const persianDescription = formData.get("persianDescription") as string;
  const teacherId = formData.get("teacherId") as string;
  console.log(description, bio, persianBio, persianDescription);
  try {
    const alreadyHasProfile = await prisma.teacherProfile.findUnique({
      where: {
        teacherId,
      },
    });
    if (alreadyHasProfile) {
      const newProfile = await prisma.teacherProfile.update({
        where: {
          teacherId,
        },
        data: {
          description,
          bio,
          persianBio,
          persianDescription,
          teacherId,
        },
      });
    }
    const newProfile = await prisma.teacherProfile.create({
      data: {
        description,
        bio,
        persianBio,
        persianDescription,
        teacherId,
      },
    });

    return "Your teacher profile successfully created";
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getTeacherProfile = async (teacherId: string) => {
  const teacherProfile = await prisma.teacherProfile.findUnique({
    where: {
      teacherId,
    },
  });
  const teacherUser = await prisma.user.findUnique({
    where: {
      id: teacherId,
    },
    include: {
      Class: true,
      Blog: true,
    },
  });
  return { ...teacherProfile, ...teacherUser };
};

export const getTeacherIds = async () => {
  const teachers = await prisma.teacherProfile.findMany();
  const ids = teachers.map((teacher) => teacher.teacherId);
  return ids;
};
