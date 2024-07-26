"use client";
import React, { useState } from "react";
import styles from "../sign-in/login.module.css";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/accInput";
import { Label } from "@/components/ui/accLabel";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { Axios } from "@/utils/axiosIn";
import { useRouter } from "next/navigation";

const signupSchema = z.object({
  fName: z.string().min(4, { message: "Please enter a proper name" }),
  lName: z.string().optional(),
  email: z.string().email({ message: "Please enter a proper email" }),
  password: z.string(),
  pNumber: z.string(),
  passwordRepeat: z.string(),
});

const SignUp = () => {
  const router = useRouter();
  const [sending, setSending] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
      passwordRepeat: "",
      pNumber: "",
    },
  });
  async function signupUser(values: z.infer<typeof signupSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    if (values.password !== values.passwordRepeat) {
      toast.error("Passwords didn't match!");
      return;
    }
    const { passwordRepeat, ...formData } = values;

    setSending(true);
    Axios.post("/users", formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setSending(false);
        }
        router.push("/sign-in");
      })
      .catch((e) => {
        toast.error(e.response.data.error);
        setSending(false);
      });
  }
  return (
    <div className={styles.container}>
      <div className={`${styles.details} bg-lightText`}>
        <Image
          src="/login.png"
          alt="Login page"
          width={350}
          height={350}
          className={styles.loginImg}
        />

        <h1>Tiara Academy: Smart English Learning</h1>

        <p className="w-[80%] text-center mt-4">
          Please login in order to access videos, weekly schedules, upload
          writing and much more
        </p>
      </div>
      <div className={styles.loginForm}>
        <div className={styles.loginForm}>
          <div className="max-w-md w-full mx-auto rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
              Welcome to Tiara Academy
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Create account in order to have access to your Hub and extra
              features
            </p>
            <form className="my-8" onSubmit={form.handleSubmit(signupUser)}>
              <div className="grid grid-cols-2 gap-[3.5em]">
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="email">First name</Label>
                  <Controller
                    name="fName"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="firstName"
                        placeholder="John"
                        type="text"
                      />
                    )}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="lName">Last name</Label>
                  <Controller
                    name="lName"
                    control={form.control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="lastName"
                        placeholder="Dee"
                        type="text"
                      />
                    )}
                  />
                </LabelInputContainer>
              </div>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="pNumber">Phone Number</Label>
                <Controller
                  name="pNumber"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="pNumber"
                      placeholder="+98123456789"
                      type="text"
                    />
                  )}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address </Label>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      placeholder="projectmayhem@fc.com"
                      type="email"
                    />
                  )}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="password"
                      placeholder="••••••••"
                      type="password"
                    />
                  )}
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Confirm password</Label>
                <Controller
                  name="passwordRepeat"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="passwordRepeat"
                      placeholder="••••••••"
                      type="password"
                    />
                  )}
                />
              </LabelInputContainer>

              <button
                className="bg-extraBg hover:bg-extraText transition w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                {sending ? (
                  <div style={{ transform: "scale(.7)" }}>
                    <CircularProgress sx={{ color: "white" }} />
                  </div>
                ) : (
                  "Sign up"
                )}
                <BottomGradient />
              </button>
            </form>
            <p className="text-black flex gap-2">
              Have an account?
              <Link
                className=" font-bold text-blue-500 hover:scale-110 transition"
                href={"/sign-in"}
              >
                Sign in
              </Link>
            </p>
          </div>
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

export default SignUp;
