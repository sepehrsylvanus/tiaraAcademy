import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="grid place-content-center">
      <Image
        src={"/pageLoader.svg"}
        alt="Page Loader"
        width={500}
        height={500}
      />
    </div>
  );
};

export default Loading;
