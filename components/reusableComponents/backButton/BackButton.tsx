"use client";

import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.back()} className="cursor-pointer">
      <p className=" text-lightText">
        <ArrowBackIosIcon /> Return
      </p>
    </div>
  );
};

export default BackButton;
