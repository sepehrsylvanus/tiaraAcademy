"use server";

import prisma from "@/utils/db";
import { User } from "@/utils/types";
import { Payment } from "@prisma/client";

import axios from "axios";
import { sendClassSms } from "../class";
import { time } from "console";
import { date } from "zod";
import { getSingleUser } from "../userActions";

export const createNewPayment = async (
  price: number,

  user: User,
  type: "class" | "writingCharge" | "placement",
  chosenTime?: string,
  chosenDate?: Date,
  classId?: string,

  className?: string
) => {
  console.log(user);
  console.log(price, user, type, chosenTime, classId, chosenDate, className);

  try {
    if (type === "writingCharge") {
      const data = {
        merchant_id: process.env.NEXT_PUBLIC_MERCHANT_CODE,
        amount: price * 10,
        description: `ثبت نام ${className ?? ""}`,
        callback_url:
          "https://tiaraacademy.com/hub/paymentRedirect?type=writingCharge",
        metadata: {
          email: user.email,
          phone: user.pNumber,
        },
      };
      const res = await axios.post(
        "https://api.zarinpal.com/pg/v4/payment/request.json",
        data
      );
      if (res.data.data.code === 100) {
        console.log(chosenDate);
        const newPayment = await prisma.payment.create({
          data: {
            user: {
              connect: { id: user.id },
            },
            resnumber: res.data.data.authority,
            price,

            time: chosenTime,
            date: chosenDate,
            type: "writingCharge",
          },
        });
        if (newPayment) {
          return `https://www.zarinpal.com/pg/StartPay/${res.data.data.authority}`;
        } else {
          throw new Error("Error in creating payment");
        }
      } else {
        throw new Error("Error in connecting with payment gateway");
      }
    }

    const targetedClass = await prisma.class.findUnique({
      where: {
        id: classId,
      },
    });
    // HANDLE FREE CLASSES
    if (price === 0) {
      if (classId) {
        const alreadyRegistered = await prisma.classUsers.findMany({
          where: {
            AND: [{ classId }, { time: chosenTime }],
          },
          orderBy: {
            capacity: "asc",
          },
        });
        if (alreadyRegistered.length > 0 && chosenTime && chosenDate) {
          await prisma.classUsers.create({
            data: {
              classId,
              userId: user.id,
              capacity: alreadyRegistered[0].capacity - 1,
              time: chosenTime,
              date: chosenDate.toLocaleDateString(),
            },
          });
        } else {
          if (chosenTime && chosenDate) {
            await prisma.classUsers.create({
              data: {
                classId,
                userId: user.id,
                capacity: targetedClass!.capacity! - 1,
                time: chosenTime,
                date: chosenDate.toLocaleDateString(),
              },
            });
          }
        }
        const registeredClass = await prisma.classUsers.findMany({
          where: {
            AND: [{ classId: targetedClass?.id }, { userId: user.id }],
          },
        });
        await prisma.notifs.create({
          data: {
            title: `${user.fName} ${user.lName} with id ${user.id} registered in ${targetedClass?.title} class`,
            type: "joinClass",
            userId: user.id,
            classId: targetedClass?.id,
            classTime: registeredClass[0].time,
          },
        });
      }
      return classId;
    }

    const data = {
      merchant_id: process.env.NEXT_PUBLIC_MERCHANT_CODE,
      amount: price * 10,
      description: `ثبت نام ${className ?? ""}`,
      callback_url:
        type === "class" || type === "placement"
          ? `https://tiaraacademy.com/hub/classes/${classId}/paymentRedirect?type=class`
          : type === "writingCharge" &&
            `https://tiaraacademy.com/hub/paymentRedirect?type=writingCharge`,
      metadata: {
        email: user.email,
        phone: user.pNumber,
      },
    };

    const res = await axios.post(
      "https://api.zarinpal.com/pg/v4/payment/request.json",
      data
    );
    console.log(res.data);
    if (res.data.data.code === 100) {
      console.log(chosenDate);
      const newPayment = await prisma.payment.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          resnumber: res.data.data.authority,
          price,
          class: {
            connect: { id: classId },
          },
          time: chosenTime,
          date: chosenDate,
          type: "class",
        },
      });
      if (newPayment) {
        return `https://www.zarinpal.com/pg/StartPay/${res.data.data.authority}`;
      } else {
        throw new Error("Error in creating payment");
      }
    } else {
      throw new Error("Error in connecting with payment gateway");
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const verifyPayment = async ({
  user,
  authority,
  type,
  classId,
}: {
  classId?: string;
  user: User;
  authority: string;
  type: "class" | "playlist" | "writingCharge";
}) => {
  try {
    const targetedPayment = await prisma.payment.findUnique({
      where: {
        resnumber: authority,
      },
    });
    console.log(targetedPayment);
    let targetedClass;

    if (classId) {
      targetedClass = await prisma.class.findUnique({
        where: {
          id: classId,
        },
      });
    }

    const verifyData = {
      merchant_id: process.env.NEXT_PUBLIC_MERCHANT_CODE,
      amount: Number(targetedPayment?.price) * 10,
      authority,
    };
    console.log(verifyData);
    const res = await axios.post(
      "https://api.zarinpal.com/pg/v4/payment/verify.json",
      verifyData
    );
    console.log(res.data);
    if (res.data.data.code === 100 || res.data.data.code === 101) {
      const updatedPayment = await prisma.payment.update({
        where: {
          resnumber: authority,
        },
        data: {
          payed: true,
        },
      });

      if (updatedPayment) {
        await sendClassSms(
          targetedClass?.title!,
          targetedClass?.link!,
          user?.pNumber
        );
        if (updatedPayment.time) {
          if (classId) {
            const alreadyRegistered = await prisma.classUsers.findMany({
              where: {
                AND: [{ classId }, { time: updatedPayment.time }],
              },
              orderBy: {
                capacity: "asc",
              },
            });
            if (alreadyRegistered.length > 0) {
              await prisma.classUsers.create({
                data: {
                  classId,
                  userId: updatedPayment.userId,
                  capacity: alreadyRegistered[0].capacity - 1,
                  time: updatedPayment.time,
                  date:
                    targetedClass?.date?.toString()! ||
                    targetedPayment?.date?.toString()!,
                },
              });
            } else {
              await prisma.classUsers.create({
                data: {
                  classId,
                  userId: updatedPayment.userId,
                  capacity: targetedClass!.capacity! - 1,
                  time: updatedPayment.time,
                  date:
                    targetedClass?.date?.toString()! ||
                    targetedPayment?.date?.toString()!,
                },
              });
            }
            const registeredClass = await prisma.classUsers.findMany({
              where: {
                AND: [{ classId: targetedClass?.id }, { userId: user.id }],
              },
            });
            await prisma.notifs.create({
              data: {
                title: `${user.fName} ${user.lName} with id ${user.id} registered in ${targetedClass?.title} class`,
                type: "joinClass",
                userId: user.id,
                classId: targetedClass?.id,
                classTime: registeredClass[0].time,
              },
            });
          }
        }
        if (type === "writingCharge") {
          const chargeNumber = updatedPayment.price / 199000;
          const alreadyCharged = await prisma.writingCharge.findUnique({
            where: {
              userId: user.id,
            },
          });
          if (alreadyCharged) {
            await prisma.writingCharge.update({
              where: {
                userId: user.id,
              },
              data: {
                writingCharge: {
                  increment: updatedPayment.price / 199000,
                },
              },
            });
          } else {
            await prisma.writingCharge.create({
              data: {
                userId: user.id,
                writingCharge: chargeNumber,
              },
            });
          }
        }
        return "payment verified";
      }
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const fetchUserPayments = async (userId: string) => {
  console.log(userId);
  try {
    const payments = await prisma.payment.findMany({
      where: {
        userId,
      },
      include: {
        class: true,
      },
    });
    console.log(payments);
    return payments;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const buyVideoCourse = async (
  price: number,
  courseName: string,
  courseId: string
) => {
  try {
    const user = await getSingleUser();
    const data = {
      merchant_id: process.env.NEXT_PUBLIC_MERCHANT_CODE,
      amount: price * 10,
      description: `ثبت نام ${courseName ?? ""}`,
      callback_url:
        "https://tiaraacademy.com/hub/paymentRedirect?type=videoCourse",
      metadata: {
        email: user?.email,
        phone: user?.pNumber,
      },
    };
    const res = await axios.post(
      "https://api.zarinpal.com/pg/v4/payment/request.json",
      data
    );
    if (res.data.data.code === 100) {
      const newPayment = await prisma.coursePayment.create({
        data: {
          courseId,
          userId: user!.id,
          resnumber: res.data.data.authority,
        },
      });
      if (newPayment) {
        return `https://www.zarinpal.com/pg/StartPay/${res.data.data.authority}`;
      } else {
        throw new Error("Error in creating payment");
      }
    } else {
      throw new Error("Error in connecting with payment gateway");
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
export const verifyCoursePayment = async (authority: string) => {
  console.log(authority);
  try {
    const targetedPayment = await prisma.coursePayment.findUnique({
      where: {
        resnumber: authority,
      },
    });
    const currentVideoCourse = await prisma.videoCourse.findUnique({
      where: {
        id: targetedPayment!.courseId,
      },
    });
    const currentUser = await getSingleUser();
    console.log(targetedPayment);
    if (targetedPayment) {
      const updatedPayment = await prisma.coursePayment.update({
        where: {
          resnumber: authority,
        },
        data: {
          verified: true,
        },
      });
      if (updatedPayment) {
        console.log("here");
        await prisma.notifs.create({
          data: {
            title: `${currentUser?.fName} ${currentUser?.lName} with id ${currentUser?.id} paid for ${currentVideoCourse?.title} course`,
            type: "videoCourse",
            userId: currentUser?.id,
          },
        });
        return updatedPayment;
      }
    }
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getVerifiedCoursePayment = async ({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) => {
  const verifiedCourse = await prisma.coursePayment.findMany({
    where: {
      AND: [{ courseId: id }, { verified: true }, { userId }],
    },
  });
  console.log(verifiedCourse);
  return verifiedCourse;
};
