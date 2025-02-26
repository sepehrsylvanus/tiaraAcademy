"use client";
import styles from "../sign-in/login.module.css";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/accInput";
import { Label } from "@/components/ui/accLabel";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Axios } from "@/utils/axiosIn";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useTranslations } from "next-intl";
import { sendOtp } from "@/actions/actions";

const ForgetPass = () => {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState<number>(0);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [disableForm, setDisableForm] = useState(false);
  const banner = useTranslations("SignIn");
  const t = useTranslations("ForgetPass");
  const formSchema = z
    .object({
      verification: z
        .string()
        .min(6, { message: "Your one-time password must be 6 characters" })
        .refine((value) => value === otp, {
          message: "Your OTP is incorrect",
        }),
      password: z
        .string()
        .min(2, { message: "Your password is too short" })
        .max(10, {
          message: "Your password is too long",
        }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password does",
      path: ["confirmPassword"],
    });
  const signinForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      verification: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { errors: FormError } = signinForm.formState;

  async function changePass(values: z.infer<typeof formSchema>) {
    setSending(true);
    try {
      if (Object.keys(FormError).length === 0) {

        Axios.put(`/users/${phoneNumber}`, values, {
          headers: {
            forgetPass: true,
          },
        })
          .then((res) => {
            toast.success(res.data.message);
            setSending(false);
            Axios.delete(`/otp/${otp}`)
              .then((res) => {
                toast(res.data.message);
              })
              .catch((err) => {
                toast.error(err.response.data.err);
              });
            router.push("/sign-in");
          })
          .catch((err:any) => {
            console.log(err.message);
            setSending(false);
          });
      }
    } catch (error:any) {
      console.log(error.message);
      setSending(false);
    }
  }


  const generateCode = () => {
    setOtpSending(true);
    if (phoneNumber.length > 0) {
      setDisableForm(false);
      setTimeout(async () => {
        const otp = Math.floor(100000 + Math.random() * 900000);
        setOtp(otp.toString());
        const sendOTP = await sendOtp(phoneNumber, Number(otp));
        if (sendOTP) {
       

          setCountdown(120);
          setOtpSending(false);
        }
      }, 0);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId); // clear the timer if the component is unmounted
    } else {
      // clear the OTP when the countdown finishes

      if (otp) {
        Axios.delete(`/otp/${otp}`)
          .then((res) => {
            toast(res.data.message);
          })
          .catch((err:any) => {
            console.log(err.response.data.err);
            toast.error(err.response.data.err);
          });
      }
      setOtp("");
    }
  }, [countdown]);

  return (
    <div className={styles.container}>
      <div className={`${styles.details} bg-lightText text-lightPrime `}>
        <Image
          src="/login.png"
          alt="Login page"
          width={350}
          height={350}
          className={styles.loginImg}
        />

        <h1 className="text-center">{banner("title")}</h1>

        <p className="w-[80%] text-center mt-4">{t("description")}</p>
      </div>
      <div className={styles.loginForm}>
        <div className="max-w-md w-full mx-auto  rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            {t("changePassword")}
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            {t("formDescription")}
          </p>

          <LabelInputContainer className="mt-4">
            <Label htmlFor="pNumber" className="font-bold text-lg">
              {t("enterPnumber")}
            </Label>
            <form>
              <Input
                id="pNumber"
                placeholder="Enter your phone number"
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {countdown === 0 ? (
                !otpSending ? (
                  <p
                    className={`underline ${
                      phoneNumber.length > 5
                        ? "text-extraBg cursor-pointer"
                        : "text-blue-200 cursor-default pointer-events-none"
                    }  `}
                    onClick={generateCode}
                  >
                    {t("generateCode")}
                  </p>
                ) : (
                  <div className=" w-full">
                    <div className="scale-50 ">
                      <CircularProgress />
                    </div>
                  </div>
                )
              ) : (
                <p className="underline text-extraBg mb-4 cursor-default">
                  {t("codeExpire1")} {countdown} {t("codeExpire2")}
                </p>
              )}
            </form>
          </LabelInputContainer>

          <form className="my-8" onSubmit={signinForm.handleSubmit(changePass)}>
            <LabelInputContainer>
              <Label htmlFor="verification">{t("verificationCode")}</Label>
              <Controller
                name="verification"
                control={signinForm.control}
                render={({ field }) => (
                  <InputOTP
                    {...field}
                    className=" text-lightText"
                    maxLength={6}
                    onChange={field.onChange}
                    value={field.value}
                    disabled={disableForm}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot className=" text-lightText" index={0} />
                      <InputOTPSlot className=" text-lightText" index={1} />
                      <InputOTPSlot className=" text-lightText" index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot className=" text-lightText" index={3} />
                      <InputOTPSlot className=" text-lightText" index={4} />
                      <InputOTPSlot className=" text-lightText" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
            </LabelInputContainer>
            {Object.keys(FormError).length > 0 && (
              <p className=" text-red-500">
                {FormError?.verification?.message}
              </p>
            )}

            <LabelInputContainer className="mb-4">
              <Label htmlFor="password">{t("password")}</Label>
              <Controller
                name="password"
                control={signinForm.control}
                render={({ field }) => (
                  <Input
                    disabled={disableForm}
                    {...field}
                    id="password"
                    placeholder="••••••••"
                    type="password"
                  />
                )}
              />
            </LabelInputContainer>
            {Object.keys(FormError).length > 0 && (
              <p className=" text-red-500 mb-4">
                {FormError?.password?.message}
              </p>
            )}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="confirmPassword">{t("confirmPass")}</Label>
              <Controller
                name="confirmPassword"
                control={signinForm.control}
                render={({ field }) => (
                  <Input
                    disabled={disableForm}
                    {...field}
                    id="password"
                    placeholder="••••••••"
                    type="password"
                  />
                )}
              />
            </LabelInputContainer>
            {Object.keys(FormError).length > 0 && (
              <p className=" text-red-500 mb-4">{FormError?.root?.message}</p>
            )}
            <button
              className={`${
                !disableForm
                  ? "bg-extraBg hover:bg-extraText transition w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  : "  bg-slate-400  transition w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              }`}
              disabled={disableForm}
              onClick={signinForm.handleSubmit(changePass)}
              type="submit"
            >
              {sending ? (
                <div style={{ transform: "scale(.7)" }}>
                  <CircularProgress sx={{ color: "white" }} />
                </div>
              ) : (
                "Change password"
              )}
              <BottomGradient />
            </button>
            <p className=" text-red-500 font-bold">{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default ForgetPass;
