"use client";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

const messageValidation = z.object({
  name: z.string().min(2, { message: "Please enter a proper name" }),
  email: z.string().email({ message: "Please enter a proper email" }),
  message: z
    .string()
    .min(10, { message: "In order to submit you have to write a message" }),
});

function onSubmit(values: z.infer<typeof messageValidation>) {
  console.log(values);
}

const MessageForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof messageValidation>>({
    resolver: zodResolver(messageValidation),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4  p-4 rounded-md ring-1 ring-slate-400"
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <input
            className=" formInput shadow-md"
            {...field}
            type="text"
            placeholder="Name"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <input
            className=" formInput shadow-md"
            {...field}
            type="text"
            placeholder="Email"
          />
        )}
      />
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <textarea
            className=" formInput resize-none shadow-md"
            {...field}
            rows={5}
            placeholder="Write your message"
          />
        )}
      />
      <button
        type="submit"
        className=" mr-auto w-fit bg-purple-600 text-white px-6 py-3 rounded-3xl hover:bg-purple-800 transition"
      >
        Send
      </button>
    </form>
  );
};

export default MessageForm;
