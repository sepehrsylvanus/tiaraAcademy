"use client";
import { User } from "@/utils/types";
import { WritingCharge as chargeType } from "@prisma/client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { createNewPayment } from "@/actions/payment";
import { getSingleUser } from "@/actions/userActions";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const WritingCharge = ({
  user,
  currentCharge,
}: {
  user: User;
  currentCharge: chargeType[];
}) => {
  const t = useTranslations("Writing");
  const [numberOfCharges, setNumberOfCharges] = useState(1);
  const router = useRouter();
  const handleCharge = async (data: FormData) => {
    const chargeQuan = data.get("quantity");
    console.log(chargeQuan);
    const user = (await getSingleUser()) as User;
    const paymentCharge = await createNewPayment(
      Number(chargeQuan) * 199000,
      user,
      "writingCharge"
    );
    if (paymentCharge) {
      router.push(paymentCharge);
    }
  };
  return (
    <form action={handleCharge}>
      <p className="mt-2">{t("chargeTitle")}</p>
      <div className="flex justify-center mt-2">
        <input
          type="number"
          min={1}
          value={numberOfCharges}
          onChange={(e) => setNumberOfCharges(Number(e.target.value))}
          className="formInput w-16"
          name="quantity"
        />
      </div>
      <p className="text-center mt-2">
        {t("totalPrice")} {(numberOfCharges * 199000).toLocaleString()}{" "}
        {t("toman")}
      </p>
      <div className="flex justify-center mt-4">
        <Button type="submit">{t("charge")}</Button>
      </div>
    </form>
  );
};

export default WritingCharge;
