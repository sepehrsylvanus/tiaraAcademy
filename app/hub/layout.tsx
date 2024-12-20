import CustomHamburger from "@/components/hamburger/CustomHamburger";
import Sidebar from "@/components/sidebar/Sidebar";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale();
  return (
    <div>
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="ml-auto z-10 fixed top-0 right-0 md:hidden bg-white  rounded-md m-2">
        <CustomHamburger navbar={false} sidebar={true} />
      </div>
      <Link
        href={"/"}
        className="absolute top-2 left-2 md:ltr:left-[5em] ltr:left-2"
      >
        <Image src={"/logo.png"} alt="Logo" width={60} height={60} />
      </Link>
      <div
        className={` ${locale === "fa" ? "lg:pr-[3em]" : "lg:pl-[2.5em]"} pt-4`}
      >
        {children}
      </div>
    </div>
  );
};

export default layout;
