"use client";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import SendIcon from "@mui/icons-material/Send";
import { useTranslations } from "next-intl";

const contactFormValidation = z.object({
  fName: z
    .string()
    .nonempty({ message: "We won't be able identify you without your name" }),
  lName: z.string().optional(),
  email: z.string().nonempty({
    message: "Please write your email so we can answer you later",
  }),
  question: z
    .string()
    .nonempty({ message: "You can write either your question or idea" }),
});
const ContactForm = () => {
  const t = useTranslations("ContactUs");
  const form = useForm<z.infer<typeof contactFormValidation>>({
    resolver: zodResolver(contactFormValidation),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      question: "",
    },
  });
  const { errors } = form.formState;

  const contactFormSubmit = async (
    values: z.infer<typeof contactFormValidation>
  ) => {
    console.log(values);
  };
  return (
    <form
      className={`space-y-2  p-4 lg:mb-0 h-fit flex flex-col w-full`}
      onSubmit={form.handleSubmit(contactFormSubmit)}
    >
      <div className="flex flex-col lg:w-full lg:flex-row lg:gap-2 lg:grid-cols-2 space-y-2 lg:space-y-0 ">
        <Controller
          name="fName"
          control={form.control}
          render={({ field }) => (
            <div className="flex flex-col  w-full">
              <input
                className="formInput w-full"
                type="text"
                {...field}
                placeholder={t("firstName")}
              />
              {errors && (
                <p className=" text-red-500">{errors?.fName?.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="lName"
          control={form.control}
          render={({ field }) => (
            <input
              className="formInput w-full"
              type="text"
              {...field}
              placeholder={t("lastName")}
            />
          )}
        />
      </div>
      <Controller
        name="email"
        control={form.control}
        render={({ field }) => (
          <div className="flex flex-col gap-2 w-full">
            <input
              className="formInput"
              type="text"
              {...field}
              placeholder={t("email")}
            />
            {errors && (
              <p className=" text-red-500">{errors?.email?.message}</p>
            )}
          </div>
        )}
      />
      <Controller
        name="question"
        control={form.control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <textarea
              placeholder={t("question")}
              className="formInput w-full resize-none"
              {...field}
            />
            {errors && (
              <p className=" text-red-500">{errors?.question?.message}</p>
            )}
          </div>
        )}
      />

      <div className="w-full">
        <Button type="submit" className="w-full">
          {t("send")} <SendIcon />
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;
