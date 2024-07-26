import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import Loading from "./loading";
import ClientCookieProvider from "@/providers/ClientCookieProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import DateProvider from "@/providers/DateProvider";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tiara academy",
  description: "Learn english in smart way",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const message = (await getMessages()) as any;

  return (
    <html
      lang={locale}
      className=" scroll-smooth"
      dir={locale === "fa" ? "rtl" : "ltr"}
    >
      <head>
        <link rel="shortcut icon" href="/logo.svg" type="image/x-icon" />
      </head>
      <NextIntlClientProvider messages={message}>
        <body className={`${inter.className} bg-lightPrime text-lightText `}>
          <ReactQueryProvider>
            <ClientCookieProvider>
              <DateProvider>
                <div className="pb-6 ">{children}</div>
              </DateProvider>
            </ClientCookieProvider>
          </ReactQueryProvider>

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <p
            className={`fixed bottom-0 z-50 bg-lightPrime text-lightText w-full p-2 font-semibold text-center md:text-start $`}
          >
            {message.Layout.copyright}
          </p>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
