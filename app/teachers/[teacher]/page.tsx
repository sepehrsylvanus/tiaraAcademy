import { Avatar } from "@mui/material";
import styles from "./singleTeacher.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DetailCard from "./DetailCard";
import DoneIcon from "@mui/icons-material/Done";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MessageForm from "@/app/teachers/[teacher]/MessageForm";

const SingleTeacher = () => {
  return (
    <div className={`${styles.container}  py-5`}>
      <div className="right flex-1 flex flex-col justify-between">
        <div className="introduction flex gap-10 items-center justify-around">
          <Avatar src="/khashayar.jpg" sx={{ width: 250, height: 250 }} />
          <div className="introDetails flex flex-col gap-4">
            <h1 className=" h1 ">Khashayar Mohammadi</h1>
            <p className="flex items-center gap-2">
              <LocationOnIcon /> Tehran
            </p>
            <div className={`${styles.outerInfo} p-2 rounded-sm`}>
              <div
                className={`${styles.innerInfo} rounded-sm flex justify-around py-2`}
              >
                <div className="eachInfo flex flex-col items-center">
                  <p>0</p>
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
        <div className="details">
          <h3 className="h3 mb-6 text-center">Details</h3>
          <div className=" flex gap-4 justify-around">
            <DetailCard title="English Courses" value={2} icon={<DoneIcon />} />
            <DetailCard
              title="Teaching Hours"
              value={56}
              icon={<HourglassBottomIcon />}
            />
            <DetailCard title="Language" value={7} icon={<EmojiEventsIcon />} />
          </div>
        </div>
        <div className="message text-center mt-2">
          <h3 className=" font-bold text-2xl">Have any question?</h3>
          <p className=" text-slate-400">You can message and I answer!</p>
          <MessageForm />
        </div>
      </div>
      <div className="left flex-1"></div>
    </div>
  );
};

export default SingleTeacher;
