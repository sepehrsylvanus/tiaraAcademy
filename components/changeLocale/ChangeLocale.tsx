"use client";
import React from "react";
import { Button } from "../ui/button";
import { setUserLocale } from "@/services/locale";
import { useLocale, useTranslations } from "next-intl";

const ChangeLocale = () => {
  const language = useLocale();
  console.log(language);
  const t = useTranslations("Navbar");
  console.log(t("language"));
  return (
    <Button
      onClick={() => {
        if (language === "fa") {
          setUserLocale("en");
        } else {
          setUserLocale("fa");
        }
      }}
      className="hover:bg-extraText transition"
    >
      {t("language")}
    </Button>
  );
};

export default ChangeLocale;
