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

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tiara academy",
  description: "Learn english in smart way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" scroll-smooth">
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
        <p className="fixed bottom-0 z-50 bg-lightPrime text-lightText w-full p-2 font-semibold text-center md:text-start">
          © All rights reserved for Tiara Academy. Design and Develop by Sani
          Development 2024
        </p>
      </body>
    </html>
  );
}
