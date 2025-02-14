import Link from "next/link";
import styles from "./page.module.css";
import { getMessages } from "next-intl/server";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import FaqPreview from "@/components/FaqPreview";
import { Separator } from "@/components/ui/separator";
import { extractPaths } from "@/utils/helperFunctions";

import NewsLetter from "@/components/NewsLetter";

export default async function Home() {
  const translations = (await getMessages()) as any;

  const t = translations.LandingPage;
  const landingPageTranslations = translations.Layout;
  const sBarTranslations = translations.SideBar;

  let yourEmailSent = "";
  let alreadyEThere = false;

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

      <footer className="flex flex-col mt-6 w-full px-6">
        <div className="flex flex-col md:flex-row">
          <Separator className="my-8 md:hidden" />
          <div className="flex flex-col flex-[4]">
            <p className="h3 mb-4">{landingPageTranslations.socials}</p>

            <div
              id=" socials"
              className="flex items-center gap-4 justify-center md:justify-start"
            >
              <Link
                target="_blank"
                href={
                  "https://www.instagram.com/tiaraacademy.tehran?igsh=ZDMwbnBwMGIydjY1"
                }
                className="w-fit rounded-full p-2 border border-lightText bg-cardBg transition-all hover:bg-white"
              >
                <InstagramIcon />
              </Link>
              <Link
                target="_blank"
                href={"https://youtube.com/@tiaraacademy"}
                className="w-fit rounded-full p-2 border border-lightText bg-cardBg transition-all hover:bg-white"
              >
                <YouTubeIcon />
              </Link>
              <Link
                href={"#"}
                className="w-fit rounded-full p-2 border border-lightText bg-cardBg transition-all hover:bg-white"
              >
                <XIcon />
              </Link>
              <Link
                target="_blank"
                href={"https://t.me/tiaraacademytehran"}
                className="w-fit rounded-full p-2 border border-lightText bg-cardBg transition-all hover:bg-white"
              >
                <TelegramIcon />
              </Link>
              <Link
                target="_blank"
                href={"#"}
                className="w-fit rounded-full p-2 border border-lightText bg-cardBg transition-all hover:bg-white col-span-2"
              >
                <FacebookIcon />
              </Link>
            </div>

            <div id="newsletter">
              <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 md:px-0 mx-auto w-full lg:py-16 ">
                  <div className=" w-full sm:text-center md:text-start">
                    <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white text-center md:text-start">
                      {landingPageTranslations.newsLetter}
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400 text-center md:text-start">
                      {landingPageTranslations.newsletterDescription}
                    </p>
                    <NewsLetter />
                    {yourEmailSent && (
                      <p className="text-green-500">{yourEmailSent}</p>
                    )}
                    {alreadyEThere && (
                      <p className="text-red-500">
                        {landingPageTranslations.emailAlreadyThere}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            </div>
          </div>
          <Separator className="mb-8 md:hidden" />
          <Separator className="hidden md:static" orientation="vertical" />

          <div
            id="services"
            className="flex flex-col gap-4 md:gap-0 justify-between items-center w-full text-center flex-[1]"
          >
            <Link href={"/hub"}>{sBarTranslations.hub}</Link>
            <Link
              href={"/hub/classes"}
              className="bg-slate-300  rounded-md w-10/12 py-2 "
            >
              {sBarTranslations.classes}
            </Link>
            <Link href={"/hub/videos"}>{sBarTranslations.videos}</Link>
            <Link
              href={"/hub/writing"}
              className="bg-slate-300  rounded-md w-10/12 py-2 "
            >
              {sBarTranslations.writing}
            </Link>
            <Link href={"/hub/podcasts"} className=" rounded-md w-10/12 py-2 ">
              {sBarTranslations.podcast}
            </Link>
            <Link href={"/hub/blog"}>{sBarTranslations.blog}</Link>

            <Link
              href={"/hub/teachers"}
              className="bg-slate-300  rounded-md w-10/12 py-2 "
            >
              {sBarTranslations.teachers}
            </Link>
          </div>

          <div
            id="details"
            className="flex flex-col gap-4 items-center w-full text-center border-t border-dashed md:border-none pt-8 mt-8 md:mt-0 md:pt-0 flex-[2]"
          >
            <Link href={"/about"}>{sBarTranslations.aboutUs}</Link>

            <Link
              href={"/privacyPolicy"}
              className="bg-slate-300  rounded-md w-10/12 py-2 "
            >
              {sBarTranslations.pp}
            </Link>
            <Link href={"/contact"}>{sBarTranslations.contactUs}</Link>
          </div>
          <div
            id="enamad"
            className="border-t border-dashed md:border-none pt-8 mt-8 flex justify-center md:mt-0 md:pt-0 flex-[2]"
          >
            <a
              referrerPolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=516151&Code=jCBpwjkJeshetgDotCMZkNrYm2zyiLUy"
            >
              <Image
                src={"/inamadd.jpg.webp"}
                alt="eNamad"
                width={200}
                height={200}
              />
            </a>
          </div>
        </div>
        <Separator className="my-8" />
        <div id="description">
          <p className="text-lg font-bold container text-justify">
            {landingPageTranslations.websiteDescTitle}{" "}
          </p>
          <p className="container text-justify">
            {landingPageTranslations.websiteDesc}
          </p>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col items-center gap-2">
          <p className="text-center container">
            {landingPageTranslations.copyright}
            {" " + " " + ""}
          </p>
          <Link
            className="underline"
            href={"https://sani-dev-portfolio.vercel.app/"}
          >
            SANI DEV ❤️
          </Link>
        </div>
      </footer>
    </div>
  );
}
