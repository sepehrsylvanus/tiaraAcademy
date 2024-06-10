import { getRegisterdClasses } from "@/actions/actions";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { howTooStudy } from "@/constants";
import Image from "next/image";
import React from "react";
const WritingPage = async () => {
  const registeredClasses = await getRegisterdClasses();
  console.log(registeredClasses);
  return (
    <TracingBeam className="h-[1240px]">
      <div className="px-[1em] ">
        <div className="w-[18rem] h-[11rem] sm:w-[28rem] sm:h-[17rem] lg:w-[35rem] lg:h-[20rem]   relative my-4 mx-auto">
          <Image
            src={"/article.jpg"}
            alt="writing image"
            fill
            className=" absolute object-cover rounded-md"
          />
        </div>
        <h1 className="h1 mb-4">
          Mastering English Writing: A Comprehensive Guide
        </h1>

        <p className=" text-extraBg">
          In today's globalized world, proficiency in English writing is a
          valuable skill that opens doors to countless opportunities in
          education, career, and personal development. Whether you're a
          non-native speaker looking to improve your English or a native speaker
          aiming to refine your writing skills, mastering English writing
          requires dedication, practice, and a structured approach. Here's a
          comprehensive guide on how to study English writing effectively:
        </p>

        {howTooStudy.map((section, index) => (
          <section className="flex flex-col gap-4 my-6" key={index}>
            {/* <h4 className="font-bold text-2xl">{section.title}</h4>
            <p className=" text-extraBg">{section.desc}</p> */}
          </section>
        ))}

        <p className="font-bold">
          By following these strategies and staying dedicated to your learning,
          you can develop strong English writing skills that will serve you well
          in academic, professional, and personal contexts. Embrace the journey
          of learning, and enjoy the rewarding experience of expressing yourself
          fluently and confidently in the English language.
        </p>
      </div>
    </TracingBeam>
  );
};

export default WritingPage;
