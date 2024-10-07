"use server";
import prisma from "@/utils/db";
import { S3 } from "aws-sdk";
import { cookies } from "next/headers";
import { getSingleUser } from "./userActions";
import { User } from "@/utils/types";
import { requestToBodyStream } from "next/dist/server/body-streams";
import { ArrowUpward } from "@mui/icons-material";
import request from "request";
type WritingAnswerToSend = {
  band: string;
  writingSelf: string;
  writingId: string;
};
const { verify } = require("jsonwebtoken");
export const getToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("token");
};

export const verifyToken = (token: string) => {
  const validate = verify(token, process.env.NEXT_PUBLIC_TOKEN_SERCRET);
  if (validate) {
    return validate;
  } else {
    return "The token has problem";
  }
};

export const retieveUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const getWritings = async () => {
  const writings = await prisma.writing.findMany({
    include: {
      creator: true,
      writingAnswer: true,
    },
  });
  return writings;
};

export const postWriting = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const subject = formData.get("subject") as string;
  const image = formData.get("image") as File;
  const writing = formData.get("writing") as string;
  const writingFile = formData.get("writingFile") as File;
  const token = await getToken()!;
  const user = (await getSingleUser()!) as User;
  const creatorId = user?.id as string;
  console.log(writingFile);
  if (subject) {
    const newWriting = await prisma.writing.create({
      data: {
        name,
        creatorId,
        teacherId: "clx0ismqk0003kc7rl04s28r2",
        email: user?.email,
        subject,
        writing,
      },
    });
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const Key = newWriting.id + "." + image.type.split("/")[1];
      const s3 = new S3({
        accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
        endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
      });

      const params = {
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key,
        Body: buffer,
      };
      const response = await s3.upload(params).promise();
      if (response) {
        const permanentSignedUrl = s3.getSignedUrl("getObject", {
          Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
          Key,
          Expires: 31536000,
        });
        await prisma.writing.update({
          where: {
            id: newWriting.id,
          },
          data: {
            subjectImgURL: permanentSignedUrl,
          },
        });
        const decreaseCharge = await prisma.writingCharge.update({
          where: {
            userId: creatorId,
          },
          data: {
            writingCharge: {
              decrement: 1,
            },
          },
        });
        console.log(decreaseCharge);
        return `Writing with name ${newWriting.subject} created`;
      } else {
        await prisma.writing.delete({
          where: {
            id: newWriting.id,
          },
        });
        throw new Error("There is a problem in submitting your writing");
      }
    }
  } else {
    const newWritingFile = await prisma.writing.create({
      data: {
        teacherId: "clx0ismqk0003kc7rl04s28r2",
        creatorId: user?.id,
      },
    });
    if (newWritingFile) {
      const Key = newWritingFile.id + "." + writingFile.type.split("/")[1];
      const bytes = await writingFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const s3 = new S3({
        accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
        endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
      });
      const params = {
        Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
        Key,
        Body: buffer,
      };
      const response = await s3.upload(params).promise();
      if (response) {
        const permanentSignedUrl = s3.getSignedUrl("getObject", {
          Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
          Key,
          Expires: 31536000,
        });
        await prisma.writing.update({
          where: {
            id: newWritingFile.id,
          },
          data: {
            writingLink: permanentSignedUrl,
          },
        });
        const decreaseCharge = await prisma.writingCharge.update({
          where: {
            userId: creatorId,
          },
          data: {
            writingCharge: {
              decrement: 1,
            },
          },
        });
        console.log(decreaseCharge);
        return `Writing with name ${writingFile.name} created`;
      } else {
        await prisma.writing.delete({
          where: {
            id: newWritingFile.id,
          },
        });
        throw new Error("There is a problem in submitting your writing");
      }
    }
  }
};

export const getStudentWritings = async () => {
  const token = await getToken()!;
  const user = await getSingleUser();
  const myWritings = await prisma.writing.findMany({
    where: {
      creatorId: user?.id,
    },
  });
  return myWritings;
};
export const getSingleWriting = async (id: string) => {
  const writing = await prisma.writing.findUnique({
    where: {
      id,
    },
  });
  return writing;
};
export const postTeacherAnswer = async (data: WritingAnswerToSend) => {
  const alreadyAnswer = await prisma.writingAnswer.findUnique({
    where: {
      writingId: data.writingId,
    },
  });
  if (alreadyAnswer) {
    await prisma.writingAnswer.delete({
      where: {
        writingId: data.writingId,
      },
    });
  }
  const writing = await getSingleWriting(data.writingId);

  const newAnswer = await prisma.writingAnswer.create({
    data,
  });
  const updatedWriting = await prisma.writing.update({
    where: {
      id: writing?.id,
    },
    data: {
      status: "checked",
    },
  });

  if (newAnswer && updatedWriting) {
    return "Your answer successfuly submitted";
  } else {
    throw new Error("There was an error in submitting answer");
  }
};

export const getTeacherAnswer = async (writingId: string) => {
  const teacherAnswer = await prisma.writingAnswer.findUnique({
    where: {
      writingId,
    },
  });
  return teacherAnswer;
};

export const deleteArticle = async (id: string) => {
  console.log(id);
  const s3 = new S3({
    accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
    endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
  });
  const article = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  const bucketName: string = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!;

  await s3
    .deleteObject({ Bucket: bucketName, Key: article?.bucketKey! })
    .promise();

  await prisma.blog.delete({
    where: {
      id: id,
    },
  });
};

export const getSingleClass = async (id: string) => {
  const result = await prisma.class.findUnique({
    where: {
      id,
    },
    include: {
      teacher: true,
    },
  });

  return result;
};

export const getSingleUserDetails = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const getClasses = async () => {
  try {
    const classes = await prisma.class.findMany({
      include: {
        teacher: true,
      },
    });
    console.log(classes);
    return classes;
  } catch (error: any) {
    console.log(error.message);
    return error;
  }
};

export const postClassImg = async (formData: FormData, classId: string) => {
  const classPic = formData.get("classPic") as File;
  const buffer = await classPic?.arrayBuffer();
  const picToSend = await Buffer.from(buffer);

  console.log(classPic);
  const now = new Date();
  const name = now.toString() + classPic.name;

  console.log(classId);
  try {
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
      Key: name,
      Body: picToSend,
    };
    const response = await s3.upload(params).promise();
    console.log(response);
    const permanentSignedUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
      Key: name,
      Expires: 31536000, // 1 year
    });
    await prisma.class.update({
      where: {
        id: classId,
      },
      data: {
        imageLink: permanentSignedUrl,
        imageName: name,
      },
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getRegisterdClasses = async (classId: string, userId: string) => {
  console.log(classId);
  console.log(userId);
  const registeredClass = await prisma.classUsers.findMany({
    where: {
      classId,
    },
    include: {
      class: true,
    },
  });

  const result = registeredClass.filter((item) => item.userId === userId);
  console.log(result);
  return { result, registeredClass };
};

export const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export const makeCategories = async (title: string) => {
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
  await prisma.category.create({
    data: {
      title: capitalizedTitle,

      value: title.toLowerCase(),
    },
  });
};

export const deleteCategory = async (title: string) => {
  console.log(title);
  try {
    const oneToDelete = await prisma.category.findUnique({
      where: {
        title,
      },
    });
    if (!oneToDelete) {
      throw new Error("Desired category hasn't been found");
    } else {
      const articlesToUpdate = await prisma.blog.findMany({
        where: {
          categories: title.toLowerCase(),
        },
      });
      console.log(articlesToUpdate);

      if (articlesToUpdate) {
        for (const article of articlesToUpdate) {
          await prisma.blog.updateMany({
            where: {
              id: article.id,
            },
            data: {
              categories: title.toLowerCase(),
            },
          });
        }
      }
      await prisma.category.delete({
        where: {
          title,
        },
      });
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const makeArticle = async (formData: FormData) => {
  const token = await getToken()!;
  const currentUser = await getSingleUser();
  const title = formData.get("title") as string;
  const categories = formData.get("playlists") as string;
  const image = formData.get("image") as File;
  const authorId = currentUser?.id as string;
  console.log(authorId);
  const text = formData.get("caption") as string;
  console.log(image);
  const bytes = await image.arrayBuffer();
  console.log(bytes);
  const buffer = await Buffer.from(bytes);
  console.log(buffer);
  const articleData = {
    title,

    authorId,

    categories: categories,
    text,
  };

  const { id } = await prisma.blog.create({
    data: articleData,
  });
  if (!id) {
    throw new Error("Your article creation interrupted");
  }
  const name = id + "." + image.name.split(".").pop();
  try {
    const s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_LIARA_SECRET_ACCESS_KEY,
      endpoint: process.env.NEXT_PUBLIC_LIARA_ENDPOINT,
    });

    const params = {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME!,
      Key: name,
      Body: buffer!,
    };
    const response = await s3.upload(params).promise();
    const permanentSignedUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME,
      Key: name,
      Expires: 31536000, // 1 year
    });
    await prisma.blog.update({
      where: {
        id,
      },
      data: {
        bucketKey: name,
        image: permanentSignedUrl,
      },
    });
  } catch (error: any) {
    throw new Error("There is an error in server: ", error);
  }
};

export const getArticles = async () => {
  const articles = await prisma.blog.findMany({
    include: {
      author: true,
    },
  });

  return articles;
};

export const getSignleArticle = async (id: string) => {
  const article = await prisma.blog.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  });
  return article;
};

export const makeItTrend = async (id: string) => {
  const article = await prisma.blog.findUnique({
    where: {
      id,
    },
  });
  await prisma.blog.update({
    where: {
      id,
    },
    data: {
      trend: !article?.trend,
    },
  });
};

export const getNotifs = async () => {
  try {
    const unreadNotifs = await prisma.notifs.findMany({
      where: {
        status: "unread",
      },
    });

    return unreadNotifs;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllNotifs = async (userId: string) => {
  const notifs = await prisma.notifs.findMany({
    where: {
      userId: {
        startsWith: userId,
      },
    },
  });
  return notifs;
};

export const readNotif = async (id: string) => {
  try {
    await prisma.notifs.update({
      where: {
        id,
      },
      data: {
        status: "read",
      },
    });
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const sendOtp = async (pNumber: string, code: number) => {
  console.log(pNumber);
  if (pNumber[0] === "0") {
    pNumber = pNumber.replace(/^0/, "+98");
  }
  console.log(pNumber, code);
  try {
    const sendCode = await request.post(
      {
        url: "http://ippanel.com/api/select",
        body: {
          op: "pattern",
          user: process.env.NEXT_PUBLIC_SMS_USERNAME,
          pass: process.env.NEXT_PUBLIC_SMS_PASS,
          fromNum: "+983000505",
          toNum: pNumber,
          patternCode: "x8grjno23nhyml6",
          inputData: [{ "verification-code": code }],
        },
        json: true,
      },
      async function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE
          console.log(response.body);
          console.log(body);
          await prisma.otp.create({
            data: {
              pNumber,
              otp: code,
            },
          });
          return response.body;
        } else {
          console.log("whatever you want");
        }
      }
    );

    console.log(sendCode);
    return sendCode.body;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const reserveFreePlacement = async (
  classId: string,
  userId: string,
  date: string,
  time: string
) => {
  const registeredClass = await prisma.classUsers.findMany({
    orderBy: [
      {
        capacity: "asc",
      },
    ],
  });
  const targetedClass = await prisma.class.findUnique({
    where: {
      id: classId,
    },
  });
  await prisma.classUsers.create({
    data: {
      classId,
      userId,
      date,
      time,
      capacity:
        registeredClass[0]?.capacity - 1 || targetedClass?.capacity! - 1,
    },
  });
  return `https://tiaraacademy.com/hub/classes/${classId}`;
};
