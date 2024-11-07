"use client";
import React from "react";
import { Button } from "../ui/button";
import { setUserLocale } from "@/services/locale";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const ChangeLocale = () => {
  const language = useLocale();

  const t = useTranslations("Navbar");

  if (language === "fa") {
    return (
      <div className="relative w-[30px] h-[20px] hover:shadow-flagShadow cursor-pointer">
        <Image
          src={"/landingPageSections/iranFlagWithoutSymbol.webp"}
          fill
          alt="iran flag"
          className="hover:scale-150 transition-all shadow-flagShadow absolute "
          onClick={() => {
            if (language === "fa") {
              setUserLocale("en");
            } else {
              setUserLocale("fa");
            }
          }}
        />
      </div>
    );
  } else {
    return (
      <div className="relative w-[30px] h-[20px]   cursor-pointer shadow-flagShadow">
        <Image
          src={"/landingPageSections/unitedStateFlag.png"}
          width={40}
          height={40}
          alt="united state flag"
          className="hover:scale-150 shadow-flagShadow transition-all absolute "
          onClick={() => {
            if (language === "fa") {
              setUserLocale("en");
            } else {
              setUserLocale("fa");
            }
          }}
        />
      </div>
    );
  }
  <Button className="hover:bg-extraText transition"></Button>;
};

export default ChangeLocale;
