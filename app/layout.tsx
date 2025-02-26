import type { Metadata } from "next";
import { Inter, Almarai } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ClientCookieProvider from "@/providers/ClientCookieProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import DateProvider from "@/providers/DateProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
const tajawal = Almarai({ subsets: ["arabic"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Tiara Academy",
  description: "Learn English in a smart way",
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
      className="scroll-smooth"
      dir={locale === "fa" ? "rtl" : "ltr"}
    >
      <head>
        <link rel="shortcut icon" href="/tabLogo.svg" type="image/x-icon" />
      </head>
      <NextIntlClientProvider messages={message}>
        <body
          className={`${
            locale === "fa" ? tajawal.className : inter.className
          } text-lightText`}
        >
          <ReactQueryProvider>
            <ClientCookieProvider>
              <DateProvider>
                <div className="pb-6">{children}</div>
                <Analytics />
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
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
