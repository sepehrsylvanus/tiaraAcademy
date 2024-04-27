import CustomHamburger from "@/components/hamburger/CustomHamburger";
import Sidebar from "@/components/sidebar/Sidebar";
import React, { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <Suspense>
        <div className="ml-auto z-10 fixed top-0 right-0 md:hidden bg-white  rounded-md m-2">
          <CustomHamburger navbar={false} sidebar={true} />
        </div>
      </Suspense>
      {children}
    </div>
  );
};

export default layout;
