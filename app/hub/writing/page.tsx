import { getRegisterdClasses } from "@/actions/actions";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { howTooStudy } from "@/constants";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import React from "react";
const WritingPage = async () => {
  const locale = await getLocale();
  return (
    <div className="px-[1em] ">
      <div className="w-[18rem] h-[11rem] sm:w-[28rem] sm:h-[17rem] lg:w-[35rem] lg:h-[20rem]   relative my-4 mx-auto">
        <Image
          src={"/article.jpg"}
          alt="writing image"
          fill
          className=" absolute object-cover rounded-md"
        />
      </div>
      <div className="px-10 space-y-6">
        {locale === "en" ? (
          <>
            <h1 className="h1 mb-4">
              Why Writing Matters: Developing Critical Thinking and
              Communication Skills
            </h1>

            <p className=" text-extraBg">
              Writing is a fundamental skill that goes beyond simply putting
              words on paper; it is a key tool for self-expression,
              communication, and critical thinking. In today's fast-paced world,
              the ability to clearly articulate ideas in writing are essential
              in both personal and professional contexts. Whether you are
              drafting an email, writing an essay, or composing a business
              proposal, writing helps you organize your thoughts, convey your
              message effectively, and engage your audience. Developing strong
              writing skills also allows individuals to connect with others,
              share their perspectives, and contribute meaningfully to
              conversations. Moreover, writing encourages deep thinking and
              creativity. It enables students to explore complex topics, refine
              their arguments, and enhance their ability to think critically.
              Through the process of writing, individuals learn to structure
              their ideas logically, improve their vocabulary, and sharpen their
              analytical skills. Writing also serves as a form of
              self-reflection, helping people to better understand their own
              thoughts and feelings. For students, mastering the art of writing
              can be a powerful way to succeed academically and in future
              careers, making it a skill worth nurturing and refining.
            </p>
          </>
        ) : (
          <>
            <h1 className="h1 mb-4">
              چرا نوشتن مهم است: تقویت تفکر منطقی و مهارت‌های ارتباطی
            </h1>

            <p className=" text-extraBg">
              نوشتن ابزاری قدرتمند برای بیان افکار و اندیشه‌هاست که نقش مهمی در
              رشد شخصی و تحصیلی ایفا می‌کند. وقتی دانش‌آموزان می‌نویسند، نه تنها
              نظرات خود را به اشتراک می‌گذارند، بلکه توانایی‌های تفکر انتقادی و
              حل مسئله خود را نیز تقویت می‌کنند. نوشتن به فرد کمک می‌کند تا
              افکار خود را سازماندهی کرده و به شیوه‌ای منطقی و منسجم بیان کند،
              که این مهارت هم در محیط آموزشی و هم در حرفه‌ای اهمیت بسیاری دارد.
              همچنین نوشتن خلاقیت را پرورش داده و درک مفاهیم پیچیده را آسان‌تر
              می‌کند. علاوه بر این، نوشتن راهی برای خودشناسی و تأمل شخصی است.
              زمانی که می‌نویسیم، با افکار درونی خود درگیر می‌شویم و این فرآیند
              به ما کمک می‌کند تا بهتر خود و دنیای اطرافمان را درک کنیم. برای
              دانش‌آموزان، نوشتن فرصتی است تا مهارت‌های ارتباطی خود را تمرین و
              تقویت کنند و برای چالش‌های آینده آماده‌تر شوند. مهارت‌های نوشتاری
              قوی نه تنها یک سرمایه تحصیلی بلکه ابزاری مادام‌العمر برای موفقیت
              شخصی و حرفه‌ای به شمار می‌روند.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default WritingPage;
