"use client";
import { useGetMyCharge } from "@/hooks/useWriting";
import { useTranslations } from "next-intl";
import React from "react";

const WritingToken = () => {
  const { data: myCharges } = useGetMyCharge();
  const t = useTranslations("Writing");
  return (
    <p className="text-center mt-4">
      {t("writingToken")}{" "}
      {myCharges &&
      (myCharges.length === 0 || myCharges[0]?.writingCharge === 0)
        ? 0
        : myCharges?.[0].writingCharge}
    </p>
  );
};

export default WritingToken;
