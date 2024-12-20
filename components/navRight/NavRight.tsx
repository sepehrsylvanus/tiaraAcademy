"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ClerkAvatar from "../reusableComponents/ClerkAvatar";
import { useTranslations } from "next-intl";
const NavRight = ({ token }: { token: string }) => {
  const t = useTranslations("Navbar");
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [token]);

  return (
    <div className={`${styles.navbarRight} bg-lightPrime`}>
      <div className=" scale-75 lg:scale-100">
        {token ? (
          <div className=" pt-4 mb-3 gap-8 flex items-center justify-between">
            <Link href={"/hub"} className="brownLink">
              {t("enterHub")}
            </Link>

            <div className=" scale-150">
              <ClerkAvatar />
            </div>
          </div>
        ) : (
          <div className=" mb-3 pt-6 md:pt-0 md:mb-0 ">
            <Link href={"/sign-in"} className="brownLink">
              {t("signInUp")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavRight;
