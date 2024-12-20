"use client";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";

const FaqPreview = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const locale = useLocale();
  const faqs = [
    {
      question: "What is Tiara Academy?",
      answer:
        "Tiara Academy is a bilingual (English and Farsi) language learning platformoffering online classes, video courses, a blog, and professional writing services to help students improve their language skills.",
    },
    {
      question: "Which languages can I learn at Tiara Academy?",
      answer:
        "For now, we offer courses for English & Spanish learning, catering to various proficiency levels. In the future, we plan to add other languages to the platform.",
    },
    {
      question: "Is Tiara Academy suitable for beginners?",
      answer:
        "Yes, our courses are designed for all levels, from beginners to advanced learners.",
    },
  ];

  const persianFaqs = [
    {
      question: "تیارا آکادمی چیست؟",
      answer:
        "تیارا آکادمی یک پلتفرم دو زبانه )انگلیسی و فارسی( برای آموزش زبان است که کلاس های آنلاین، دوره های ویدیویی، بلاگ و خدمات نوشتاری حرفه ای را ارائه می دهد تا به دانشجویان در بهبود مهارت های زبانی شان کمک کند.",
    },
    {
      question: "چه زبان هایی را می توانم در تیارا آکادمی یاد بگیرم؟",
      answer:
        "فعلاً دوره هایی برای یادگیری زبان انگلیسی و اسپانیایی ارائه می دهیم که تمامی سطوح مهارتی را پوشش می دهد. در آینده، قصد داریم زبان های دیگری نیز به پلتفرم اضافه کنیم.",
    },
    {
      question: "آیا تیارا آکادمی برای مبتدیان مناسب است؟",
      answer:
        "بله، دوره های ما برای همه سطوح طراحی شده اند؛ از مبتدیان تا زبان آموزان پیشرفته.",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 mb-8">
        {locale === "en"
          ? faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <button
                  className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`transform transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="p-4">{faq.answer}</p>
                </div>
              </div>
            ))
          : persianFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <button
                  className="w-full text-left p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  aria-expanded={openIndex === index}
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown
                    className={`transform transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <p className="p-4">{faq.answer}</p>
                </div>
              </div>
            ))}
      </div>
      <div className="text-center">
        <Link
          href="/faq"
          className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
        >
          View All FAQs
        </Link>
      </div>
    </div>
  );
};

export default FaqPreview;
