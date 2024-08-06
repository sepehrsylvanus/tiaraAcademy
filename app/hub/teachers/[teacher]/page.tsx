import { Avatar, Divider } from "@mui/material";
import styles from "./singleTeacher.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DetailCard from "./DetailCard";
import DoneIcon from "@mui/icons-material/Done";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";

import {} from "@mui/icons-material";
import MessageForm from "./MessageForm";
import { getClasses, getSingleUserDetails } from "@/actions/actions";
import Colleagues from "@/components/Colleagues";
import { User } from "@/utils/types";

type ParamsProps = {
  params: {
    teacher: string;
  };
};
const SingleTeacher = async ({ params }: ParamsProps) => {
  const user = await getSingleUserDetails(params.teacher);

  const allClasses = await getClasses();

  const classesQuantity = allClasses.filter(
    (eachClass) => eachClass.teacherId === user?.id
  ).length;
  return (
    <div
      className={`flex flex-col md:flex-row gap-[3em] h-full px-[1em] md:pl-[5em] pt-[1em]  py-5`}
    >
      <div className="right flex-1 flex flex-col justify-between">
        <div className="introduction flex flex-col  gap-10 items-center justify-around">
          <Avatar sx={{ width: 250, height: 250 }} />
          <div className="introDetails flex flex-col gap-4 w-full items-center justify-center">
            <h1 className=" h1 ">{`${user?.fName} ${user?.lName}`}</h1>
            <p className="flex items-center gap-2">
              <LocationOnIcon /> Tehran
            </p>
            <div
              className={`${styles.outerInfo} p-2  bg-extraItem rounded-md  w-full`}
            >
              <div
                className={`${styles.innerInfo} rounded-sm flex justify-around  w-full py-2 bg-extraItem`}
              >
                <div className="eachInfo flex flex-col items-center">
                  <p>{classesQuantity}</p>
                  <p>Classes</p>
                </div>

                <div className="eachInfo flex flex-col items-center">
                  <p>0</p>
                  <p>Students</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="details mt-4">
          <h3 className=" h3 mb-6 text-center">Details</h3>
          <div
            className=" grid grid-cols-1 sm:grid-cols-3
           gap-4 justify-around"
          >
            <DetailCard title="English Courses" value={2} icon={<DoneIcon />} />
            <DetailCard
              title="Teaching Hours"
              value={56}
              icon={<HourglassBottomIcon />}
            />
            <DetailCard title="Language" value={7} icon={<EmojiEventsIcon />} />
          </div>
        </div>
        <div className="message text-center mt-6">
          <h3 className=" font-bold text-2xl">Have any question?</h3>
          <p className=" text-slate-400">You can message and I answer!</p>
          <MessageForm />
        </div>
      </div>
      <div className="left flex-1">
        <div className="blogs ">
          <h2 className="h3 mb-4">Blogs</h2>
          <div className="blogsCard shadow-lg p-3 mr-3 bg-[#c6d9e6] rounded-md">
            <div className="eachBlog flex justify-between">
              <div className="flex items-center gap-7">
                <Avatar
                  src="https://picsum.photos/id/237/200/300"
                  sx={{ width: 50, height: 50 }}
                />
                <p className=" font-semibold">Blog title</p>
              </div>

              <div className=" w-fit flex items-center gap-3 ml-auto">
                <div className=" text-white  bg-[#4B5362] p-1 transition hover:bg-[#6f7b90]">
                  <ArrowForwardIcon />
                </div>
                <div>
                  <CloseIcon />
                </div>
              </div>
            </div>
            <Divider sx={{ border: "1px solid #a4b0be", margin: "1em 0" }} />

            <button className="p-2 text-white font-bold bg-[#4B5362] transition hover:bg-[#6f7b90]">
              View all
            </button>
          </div>
        </div>
        {user && <Colleagues user={user} />}
      </div>
    </div>
  );
};

export default SingleTeacher;
