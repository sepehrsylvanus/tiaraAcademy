import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="hidden md:block">
        <Sidebar />
      </div>
      {children}
    </div>
  );
};

export default layout;
