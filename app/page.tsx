import Link from "next/link";
import styles from "./page.module.css";

import { getLocale, getMessages } from "next-intl/server";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
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

      <Link href={"/hub"} className="mb-24">
        <div className="h-[580px] w-screen relative">
          <Image src="/tiaraBanner.png" alt="" className=" absolute " fill />
        </div>
      </Link>
      <section
        id="differentParts"
        className="grid grid-cols-1 md:grid-cols-2  md:grid-rows-2 pb-[2.5em] px-48 gap-6 "
      >
        <div className="relative w-[564px] h-[317px] rounded-md">
          <Image
            src="/onlineSessions.jpg"
            alt="online sessions"
            fill
            className="rounded-md border border-lightText"
          />
          <Link
            href={"/hub/classes"}
            className="bg-[#5E8780] absolute right-0 bottom-[1.5em] px-4 py-1"
          >
            Enroll now!
          </Link>
        </div>
        <div className="relative w-[564px] h-[317px] rounded-md">
          <Image
            src="/videoCourses.jpg"
            alt="video courses"
            fill
            className="rounded-md border border-lightText"
          />
          <Link
            href={"/hub/videos"}
            className="bg-[#5E8780] absolute right-0 bottom-[1.5em] px-4 py-1 text-end"
          >
            Enroll now!
          </Link>
        </div>
        <div className="relative w-[564px] h-[317px] rounded-md">
          <Image
            src="/writingSkills.jpg"
            alt="writing skills"
            fill
            className="rounded-md border border-lightText"
          />
          <Link
            href={"/hub/writing"}
            className="bg-[#5E8780] absolute right-0 bottom-[1.5em] px-4 py-1"
          >
            Enroll now!
          </Link>
        </div>
        <div className="relative w-[564px] h-[317px] rounded-md">
          <Image
            src="/articles.jpg"
            alt=" articles"
            fill
            className="rounded-md border border-lightText"
          />
          <Link
            href={"/hub/blogs"}
            className="bg-[#5E8780] absolute right-0 bottom-[1.5em] px-4 py-1"
          >
            Enroll now!
          </Link>
        </div>
      </section>
      <footer className="flex justify-between rtl:flex-row-reverse px-8 pb-[5em] pt-4 w-full">
        <div id="institue" className="flex flex-col space-y-6">
          <div id="title" className="flex gap-2 items-center flex-row-reverse">
            <Image src={"/logo.png"} alt="logo" width={50} height={50} />
            <p>Tiara academy</p>
          </div>
          <div id="socials" className="flex gap-4">
            <Link
              href={"#"}
              className="rounded-full p-2 border border-lightText bg-cardBg transition-all hover:bg-white"
            >
              <InstagramIcon />
            </Link>
            <Link
              href={"#"}
              className="rounded-full p-2 border border-lightText bg-cardBg transition-all hover:bg-white"
            >
              <YouTubeIcon />
            </Link>
            <Link
              href={"#"}
              className="rounded-full p-2 border border-lightText bg-cardBg transition-all hover:bg-white"
            >
              <XIcon />
            </Link>
            <Link
              href={"#"}
              className="rounded-full p-2 border border-lightText bg-cardBg transition-all hover:bg-white"
            >
              <TelegramIcon />
            </Link>
            <Link
              href={"#"}
              className="rounded-full p-2 border border-lightText bg-cardBg transition-all hover:bg-white"
            >
              <FacebookIcon />
            </Link>
          </div>
        </div>
        <div id="eNamad">
          <a
            referrerPolicy="origin"
            target="_blank"
            href="https://trustseal.enamad.ir/?id=516151&Code=jCBpwjkJeshetgDotCMZkNrYm2zyiLUy"
          >
            <Image
              referrerPolicy="origin"
              src="https://trustseal.enamad.ir/logo.aspx?id=516151&Code=jCBpwjkJeshetgDotCMZkNrYm2zyiLUy"
              alt=""
              style={{ cursor: "pointer" }}
              width={100}
              height={100}
            />
          </a>
        </div>
      </footer>
    </div>
  );
}
