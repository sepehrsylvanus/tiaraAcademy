import { getToken } from "@/actions/actions";
import CustomHamburger from "@/components/hamburger/CustomHamburger";
import Sidebar from "@/components/sidebar/Sidebar";
import { getLocale } from "next-intl/server";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const locale = await getLocale();
  console.log(locale);
  return (
    <div>
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="ml-auto z-10 fixed top-0 right-0 md:hidden bg-white  rounded-md m-2">
        <CustomHamburger navbar={false} sidebar={true} />
      </div>

      <div
        className={` ${locale === "fa" ? "lg:pr-[3em]" : "lg:pl-[2.5em]"} pt-4`}
      >
        {children}
      </div>
    </div>
  );
};

export default layout;
