import Link from "next/link";
import styles from "./page.module.css";

import { getLocale, getMessages } from "next-intl/server";
import Navbar from "@/components/navbar/Navbar";

export default async function Home() {
  return (
    <div
      className={`${styles.container} bg-lightPrime flex flex-col items-center `}
    >
      <Navbar />
      <Link href={"#"}>
        <img src="/introduction.jpeg" alt="" className="w-screen" />
      </Link>
      <Link href={"/hub/classes"}>
        <img src="/onlineCourses.jpeg" alt="" className="w-screen" />
      </Link>
      <Link href={"/hub/videos"}>
        <img src="/onlinevideos.jpeg" alt="" className="w-screen" />
      </Link>
      <Link href={"/hub/writing"}>
        <img src="/writing.jpeg" alt="" className="w-screen" />
      </Link>
      <Link href={"/hub/blogs"}>
        <img src="/reading.jpeg" alt="" className="w-screen" />
      </Link>

      <Link href={"/hub"}>
        <img src="/tiaraBanner.png" alt="" className=" h-screen w-screen" />
      </Link>
      <section
        id="differentParts"
        className="grid grid-cols-2 grid-rows-2 pb-[2.5em]"
      >
        <div className="relative">
          <img src="/onlineSessions.jpg" alt="online sessions" />
          <Link
            href={"/hub/classes"}
            className="bg-[#5E8780] absolute right-0 bottom-[2em] px-4 py-1"
          >
            Enroll now!
          </Link>
        </div>
        <div className="relative">
          <img src="/videoCourses.jpg" alt="video courses" />
          <Link
            href={"/hub/videos"}
            className="bg-[#5E8780] absolute right-0 bottom-[2em] px-4 py-1"
          >
            Enroll now!
          </Link>
        </div>
        <div className="relative">
          <img src="/writingSkills.jpg" alt="writing skills" />
          <Link
            href={"/hub/writing"}
            className="bg-[#5E8780] absolute right-0 bottom-[2em] px-4 py-1"
          >
            Enroll now!
          </Link>
        </div>
        <div className="relative">
          <img src="/articles.jpg" alt=" articles" />
          <Link
            href={"/hub/blogs"}
            className="bg-[#5E8780] absolute right-0 bottom-[2em] px-4 py-1"
          >
            Enroll now!
          </Link>
        </div>
      </section>
    </div>
  );
}
