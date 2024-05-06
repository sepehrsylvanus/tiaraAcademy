import { getSingleWriting } from "@/actions/actions";
import React from "react";
type Params = {
  params: {
    id: string;
  };
};
const SingleWriting = async (props: Params) => {
  const myWriting = await getSingleWriting(props.params.id);

  console.log(myWriting);
  if (!myWriting) {
    return (
      <div className="grid place-content-center h-screen">
        <p className="h1 text-center">
          How could you arrive to this page! <br /> There is no writing with
          this ID.
        </p>
      </div>
    );
  }
  return <div className="px-2 pb-4 pt-[3em] md:pt-0  md:pl-[4em]"></div>;
};

export default SingleWriting;
