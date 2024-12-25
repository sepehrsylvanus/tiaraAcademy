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
import FaqPreview from "@/components/FaqPreview";
export default async function Home() {
  const translations = (await getMessages()) as any;

  const t = translations.LandingPage;

  return (
    <div
      className={`${styles.container} bg-lightPrime flex flex-col items-center `}
    >
      <Navbar />

      <Link href={"/hub"} className="mb-24">
        <div className=" w-11/12 mx-auto relative mt-5 rounded-md border border-black">
          <img src="/banner.png" alt="" className=" h-full  rounded-md " />
        </div>
      </Link>
      <section
        id="differentParts"
        className="grid grid-cols-1 md:grid-cols-2  md:grid-rows-2 pb-[2.5em]  sLaptop:px-12 lg:px-48 gap-6 md:gap-16 shadow-none"
      >
        <div className="relative w-[300px] h-[150px] md:w-[400px] md:h-[200px] lg:w-[600px] lg:h-[350px] rounded-md">
          <Image
            src="/landingPageSections/class.png"
            alt="online sessions"
            fill
            className="rounded-md border border-lightText"
          />
          <Link
            href={"/hub/classes"}
            className="bg-[#5E8780] transition-all hover:bg-[#9ab1ae] absolute -right-[2px] md:right-0 scale-95 rounded-es-md md:rounded-none bottom-0 md:bottom-[1.5em] px-4 py-1 "
          >
            {t.enrollNow}
          </Link>
        </div>
        <div className="relative w-[300px] h-[150px] md:w-[400px] md:h-[200px] lg:w-[600px] lg:h-[350px] rounded-md ">
          <Image
            src="/landingPageSections/videos.png"
            alt="video courses"
            fill
            className="rounded-md border border-lightText"
          />
          <Link
            href={"/hub/videos"}
            className="bg-[#5E8780] transition-all hover:bg-[#9ab1ae] absolute -right-[2px] md:right-0 scale-95 rounded-es-md md:rounded-none bottom-0 md:bottom-[1.5em] px-4 py-1 text-end"
          >
            {t.watchNow}
          </Link>
        </div>
        <div className="relative w-[300px] h-[150px] md:md:w-[400px] md:h-[200px] lg:w-[600px] lg:h-[350px] rounded-md">
          <Image
            src="/landingPageSections/writing.png"
            alt="writing skills"
            fill
            className="rounded-md border border-lightText"
          />
          <Link
            href={"/hub/writing"}
            className="bg-[#5E8780] transition-all hover:bg-[#9ab1ae] absolute -right-[2px] md:right-0 scale-95 rounded-es-md md:rounded-none bottom-0 md:bottom-[1.5em] px-4 py-1"
          >
            {t.submitNow}
          </Link>
        </div>
        <div className="relative w-[300px] h-[150px] md:w-[400px] md:h-[200px] lg:w-[600px] lg:h-[350px] rounded-md">
          <Image
            src="/landingPageSections/reading.png"
            alt=" articles"
            fill
            className="rounded-md border border-lightText"
          />
          <Link
            href={"/hub/blogs"}
            className="bg-[#5E8780] transition-all hover:bg-[#9ab1ae] absolute -right-[2px] md:right-0 scale-95 rounded-es-md md:rounded-none bottom-0 md:bottom-[1.5em] px-4 py-1"
          >
            {t.checkoutNow}
          </Link>
        </div>
      </section>
      <section id="FAQ">
        <FaqPreview />
      </section>
      <footer className="md:flex flex-col px-8 pb-[5em] pt-4 w-full hidden">
        <div className="md:flex justify-between rtl:flex-row-reverse">
          <div id="institue" className="flex flex-col space-y-6">
            <div
              id="title"
              className="flex gap-2 items-center flex-row-reverse"
            >
              <Image src={"/logo.png"} alt="logo" width={50} height={50} />
              <p>Tiara Academy</p>
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
                src={"/eNamad0.png"}
                alt="eNamad"
                width={100}
                height={100}
              />
            </a>
          </div>
        </div>
        <Link href={"https://sani-dev-portfolio.vercel.app/"}>
          <p
            className={` z-50 bg-lightPrime text-lightText w-full p-2 font-semibold text-center `}
          >
            {translations.Layout.copyright}{" "}
            <Link
              href={"https://sani-dev-portfolio.vercel.app/"}
              className="underline"
            >
              Sani dev.
            </Link>
          </p>
        </Link>
      </footer>

      <footer className="flex flex-col items-center  px-8 pb-[5em] pt-4 w-full md:hidden">
        <div id="institue" className="flex flex-col space-y-6">
          <div id="title" className="flex gap-2 items-center flex-row-reverse">
            <Image src={"/logo.png"} alt="logo" width={50} height={50} />
            <p>Tiara Academy</p>
          </div>

          <div id="eNamad">
            <a
              referrerPolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=516151&Code=jCBpwjkJeshetgDotCMZkNrYm2zyiLUy"
            >
              <Image
                src={"/eNamad0.png"}
                alt="eNamad"
                width={100}
                height={100}
              />
              {/* <img
                referrerPolicy="origin"
                src="https://trustseal.enamad.ir/logo.aspx?id=516151&Code=jCBpwjkJeshetgDotCMZkNrYm2zyiLUy"
                alt=""
                className="cursor-pointer"
                data-code="jCBpwjkJeshetgDotCMZkNrYm2zyiLUy"
              /> */}
            </a>
          </div>
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
        <p
          className={` z-50 bg-lightPrime text-lightText w-full p-2 font-semibold text-center md:text-start $`}
        >
          {translations.Layout.copyright}{" "}
          <Link
            href={"https://sani-dev-portfolio.vercel.app/"}
            className="underline"
          >
            Sani dev.
          </Link>
        </p>
      </footer>
    </div>
  );
}
