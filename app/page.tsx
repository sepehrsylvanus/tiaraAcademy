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
export default async function Home() {
  const translations = (await getMessages()) as any;

  const t = translations.LandingPage;
  const landingPageTranslations = translations.Layout;
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
                target="_blank"
                href={
                  "https://www.instagram.com/tiaraacademy.tehran?igsh=ZDMwbnBwMGIydjY1"
                }
                className="rounded-full p-2 border border-lightText bg-cardBg transition-all hover:bg-white"
              >
                <InstagramIcon />
              </Link>
              <Link
                target="_blank"
                href={"https://youtube.com/@tiaraacademy"}
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
                target="_blank"
                href={"https://t.me/tiaraacademytehran"}
                className="rounded-full p-2 border border-lightText bg-cardBg transition-all hover:bg-white"
              >
                <TelegramIcon />
              </Link>
              <Link
                target="_blank"
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
                src={"/inamadd.jpg.webp"}
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

      {/* <footer className="flex flex-col items-center  px-8 pb-[5em] pt-4 w-full md:hidden">
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
                src={"/inamadd.jpg.webp"}
                alt="eNamad"
                width={100}
                height={100}
              />
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
      </footer> */}

      <footer className="flex flex-col mt-6">
        <div
          id=" socials"
          className="grid grid-cols-2 gap-x-10 gap-y-4 justify-items-center"
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
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-md sm:text-center">
                <h2 className="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white text-center">
                  Sign up for our newsletter
                </h2>
                <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400 text-center">
                  Stay up to date with the roadmap progress, announcements and
                  exclusive discounts feel free to sign up with your email.
                </p>
                <form action="#">
                  <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                    <div className="relative w-full">
                      <label
                        htmlFor="email"
                        className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Email address
                      </label>
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                      </div>
                      <input
                        className="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter your email"
                        type="email"
                        id="email"
                        required
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-extraBg border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-extraItem transition-all focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                  <div className="mx-auto max-w-screen-sm text-sm  text-gray-500 newsletter-form-footer dark:text-gray-300 text-center">
                    We care about the protection of your data.{" "}
                    <a
                      href="#"
                      className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                    >
                      Read our Privacy Policy
                    </a>
                    .
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
        <Separator className="mb-8" />
        <div
          id="services"
          className="flex flex-col gap-4 items-center w-full text-center"
        >
          <Link href={"/hub"}>Hub</Link>
          <Link
            href={"/hub/classes"}
            className="bg-slate-300  rounded-md w-10/12 py-2 "
          >
            Classes
          </Link>
          <Link href={"/hub/videos"}>Videos</Link>
          <Link
            href={"/hub/writing"}
            className="bg-slate-300  rounded-md w-10/12 py-2 "
          >
            Writing
          </Link>
          <Link href={"/hub/blog"}>Blog</Link>
          <Link
            href={"/hub/teachers"}
            className="bg-slate-300  rounded-md w-10/12 py-2 "
          >
            Teachers
          </Link>
        </div>

        <div
          id="details"
          className="flex flex-col gap-4 items-center w-full text-center border-t border-dashed pt-8 mt-8"
        >
          <Link href={"#"}>About Us</Link>

          <Link href={"#"} className="bg-slate-300  rounded-md w-10/12 py-2 ">
            Privacy & Policy
          </Link>
          <Link href={"#"}>Contact Us</Link>
        </div>
        <div
          id="enamad"
          className="border-t border-dashed pt-8 mt-8 flex justify-center"
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
        <Separator className="my-8" />
        <div id="description">
          <p className="container text-justify">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی
            در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را
            می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
            الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این
            صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و
            شرایط سخت تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای
            اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد
            استفاده قرار گیرد. لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
            صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه
            روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
            تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی
            می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت
            فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را
            برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان
            فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری
            موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد وزمان مورد
            نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای
            موجود طراحی اساسا مورد استفاده قرار گیرد.
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
