import { CircularProgress } from "@mui/material";

import { Writings } from "@/utils/types";
import { getToken, getWritings } from "@/actions/actions";
import { getSingleUser } from "@/actions/userActions";
import EachWritingCard from "./reusableComponents/EachWritingCard";
import { getMessages } from "next-intl/server";

const PdfSection = async () => {
  const messages = (await getMessages()) as any;
  const hubT = messages.Hub;
  console.log(hubT);
  let loading = true;
  let writings: Writings[] = await getWritings();
  if (writings) {
    loading = false;
  }
  return (
    <div className="pdfs max-h-[480px] overflow-y-auto rounded-md shadow-md p-2 flex flex-col bg-extraText text-lightPrime ">
      {loading ? (
        <div style={{ transform: "scale(.7)" }}>
          <CircularProgress sx={{ color: "white" }} />
        </div>
      ) : (
        <div
          className={`${
            writings.length > 0 && "grid grid-cols-1 lg:grid-cols-5"
          } px-2 gap-3 items-center py-3 m-2 rounded-md ring-1 ring-lightPrime`}
        >
          {writings?.length > 0 ? (
            writings?.map((writing, index) => (
              <div
                key={writing.id}
                className={`${
                  index < writings.length - 1 &&
                  " border-r border-dashed border-slate-200 pr-6 mr-2"
                } w-full`}
              >
                <EachWritingCard writing={writing} />
              </div>
            ))
          ) : (
            <p className="text-center">{hubT.noWriting}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PdfSection;
