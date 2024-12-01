"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { faqs, persianFaqs } from "@/constants";
import { useLocale } from "next-intl";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const locale = useLocale();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h1>
      <div className="space-y-6">
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
      <div className="mt-12 text-center">
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
