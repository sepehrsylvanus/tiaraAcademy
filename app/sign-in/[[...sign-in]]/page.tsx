import React from "react";
import styles from "./login.module.css";
import Image from "next/image";
import TextField from "@mui/material/TextField";
import { SignIn, SignUp } from "@clerk/nextjs";
const Login = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.details} bg-lightText text-lightPrime`}>
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
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
