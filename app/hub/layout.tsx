import { getToken } from "@/actions/actions";
import CustomHamburger from "@/components/hamburger/CustomHamburger";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const token = await getToken()!;

  return (
    <div>
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="ml-auto z-10 fixed top-0 right-0 md:hidden bg-white  rounded-md m-2">
        <CustomHamburger navbar={false} sidebar={true} />
      </div>

      {children}
    </div>
  );
};

export default layout;
