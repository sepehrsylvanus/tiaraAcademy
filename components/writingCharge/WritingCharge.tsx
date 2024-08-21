"use client";
import { User } from "@/utils/types";
import { WritingCharge as chargeType } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import { createNewPayment } from "@/actions/payment";
import { getSingleUser } from "@/actions/userActions";
import { useRouter } from "next/navigation";

const WritingCharge = ({
  user,
  currentCharge,
}: {
  user: User;
  currentCharge: chargeType[];
}) => {
  const router = useRouter();
  const handleCharge = async (data: FormData) => {
    const chargeQuan = data.get("quantity");
    console.log(chargeQuan);
    const user = (await getSingleUser()) as User;
    const paymentCharge = await createNewPayment(
      Number(chargeQuan) * 6000,
      user,
      "writingCharge"
    );
    if (paymentCharge) {
      router.push(paymentCharge);
    }
  };
  return (
    <form action={handleCharge}>
      <p className="mt-2">
        Write number of writings you are going to submit and click charge
      </p>
      <div className="flex justify-center mt-2">
        <input
          type="number"
          min={1}
          className="formInput w-16"
          name="quantity"
        />
      </div>
      <div className="flex justify-center mt-4">
        <Button type="submit">Charge</Button>
      </div>
    </form>
  );
};

export default WritingCharge;
