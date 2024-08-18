"use client";

import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const BackButton = () => {
  const router = useRouter();
  const t = useTranslations("ContactUs");
  return (
    <div onClick={() => router.back()} className="cursor-pointer">
      <p className=" text-lightText">
        <ArrowBackIosIcon /> {t("return")}
      </p>
    </div>
  );
};

export default BackButton;
