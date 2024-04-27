"use client";
import styles from "./login.module.css";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/accInput";
import { Label } from "@/components/ui/accLabel";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string(),
});
const Login = () => {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const signinForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function signin(values: z.infer<typeof formSchema>) {
    setSending(true);
    axios
      .post("/api/signin", values)
      .then((res) => {
        setSending(false);
        router.push("/hub");
      })
      .catch((e) => {
        setError(e.response.data.error);
        setSending(false);
      });

    console.log(values);
  }
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

        <h1>آکادمی تیارا: آموزش پویای زبان انگلیسی</h1>
        <p>دسترسی به ویدیوها، برنامه‌ی هفتگی، آپلود تکالیف و غیره</p>
      </div>
      <div className={styles.loginForm}>
        <div className="max-w-md w-full mx-auto  rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
            Welcome to Tiara Academy
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Login in order to have access to your Hub and extra features
          </p>

          <form className="my-8" onSubmit={signinForm.handleSubmit(signin)}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email Address | User Name</Label>
              <Controller
                name="email"
                control={signinForm.control}
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
                control={signinForm.control}
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

            <button
              className="bg-extraBg hover:bg-extraText transition w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              {sending ? (
                <div style={{ transform: "scale(.7)" }}>
                  <CircularProgress sx={{ color: "white" }} />
                </div>
              ) : (
                "Sign in"
              )}
              <BottomGradient />
            </button>
            <p className=" text-red-500 font-bold">{error}</p>
          </form>
          <p className="text-black flex gap-2">
            No account?
            <Link
              className=" font-bold text-blue-500 hover:scale-110 transition"
              href={"/sign-up"}
            >
              Sign up
            </Link>
          </p>
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

export default Login;
