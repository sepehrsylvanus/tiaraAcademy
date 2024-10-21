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
      {/* <section
        id="services"
        className={`${styles.header} bg-lightPrime flex justify-center`}
      >
        <Link href={"/"}>
          <img
            src="/introduction.jpeg"
            alt="introduction"
            className="aspect-video mx-auto "
          />
        </Link>
      </section>
      <Divider sx={{ margin: "1em 0" }} />

      <section
        id="howToUse"
        className={`${styles.joinCommunity} bg-lightPrime`}
      ></section>
      <Divider sx={{ margin: "1em 0" }} />
      <section className={styles.secondService}>
        <div className="hidden md:block">
          <Image
            src={"/About-Us.png"}
            alt="About us"
            width={400}
            height={400}
          />
        </div>
        <div className={styles.secondServiceRight}>
          <p style={{ marginBottom: "2em", fontWeight: 700 }}>
            {message.About.title}
          </p>
          <h4 style={{ fontWeight: 700, fontSize: 30 }}>
            {message.About.description}
          </h4>

          <Link href={"/about"} className="font-bold underline text-extraText">
            {message.About.readMore}
          </Link>
        </div>
      </section>
      <Divider sx={{ margin: "1em 0" }} />
      <section className={styles.thirdService}>
        <div className={styles.leftThirdService}>
          <p style={{ marginBottom: "2em", fontWeight: 700 }}>
            {message.Contact.title}
          </p>
          <h4 style={{ fontWeight: 700, fontSize: 30 }}>
            {message.Contact.subtitle}
          </h4>

          <Link
            href={"/contact"}
            className="font-bold underline text-extraText"
          >
            {message.Contact.knowMore}
          </Link>
        </div>
        <div className="hidden md:block">
          <Image
            src={"/Contact-us.png"}
            alt="Contact us"
            width={500}
            height={500}
          />
        </div>
      </section>

      <Divider sx={{ margin: "1em 0" }} />
      <section id="levels" className={styles.levels}>
        <div className={styles.leftLevels}>
          <Image
            src={"/User-Account-Sign-up.png"}
            alt="Sign up"
            width={350}
            height={350}
            className={styles.levelsImg}
          />
          <h3 style={{ fontWeight: 700, fontSize: 30 }}>
            {message.Levels.title}
          </h3>
          <p>{message.Levels.description}</p>
        </div>
        <div className={styles.rightLevels}>
          <div className={`${styles.eachLevel}`}>
            <h4>{message.Levels.step1}</h4>
            <p className="flex gap-2 items-center">
              {message.Levels.step1Desc}
              <Link href="/sign-up">
                <span className="bg-lightText text-lightPrime px-4 py-2 rounded-md">
                  {message.Levels.signUpNow}
                </span>{" "}
              </Link>
              {message.Levels.button}
            </p>
          </div>

          <div className={`${styles.eachLevel}`}>
            <h4>{message.Levels.step2}</h4>
            <p>{message.Levels.step2Desc}</p>
          </div>

          <div className={`${styles.eachLevel}`}>
            <h4>{message.Levels.step3}</h4>
            <p>{message.Levels.step3Desc}</p>
          </div>
        </div>
      </section>
      <Divider sx={{ margin: "1em 0" }} />

      <section id="testimonials" className={styles.testimonials}>
        <h3 style={{ fontSize: 40, marginBottom: ".5em" }}>
          {message.Testimonials.title}
        </h3>
        <p>{message.Testimonials.description}</p>
        <div className={styles.commentsContainer}>
          <div
            className={`${styles.eachComment} bg-extraBg text-lightPrime shadow-md rounded-md`}
          >
            <p>
              Since implementing Lando our business has seen significant growth.
            </p>

            <div style={{ display: "flex" }}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <p>Jack Sibire</p>
            <p>Lead Manager, Growio</p>
          </div>
          <div
            className={`${styles.eachComment} bg-extraBg text-lightPrime shadow-md rounded-md`}
          >
            <p>
              Since implementing Lando our business has seen significant growth.
            </p>

            <div style={{ display: "flex" }}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <p>Jack Sibire</p>
            <p>Lead Manager, Growio</p>
          </div>
          <div
            className={`${styles.eachComment} bg-extraBg text-lightPrime shadow-md rounded-md`}
          >
            <p>
              Since implementing Lando our business has seen significant growth.
            </p>

            <div style={{ display: "flex" }}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <p>Jack Sibire</p>
            <p>Lead Manager, Growio</p>
          </div>
        </div>
      </section>
      <Divider sx={{ margin: "1em 0" }} />

      <section className={`${styles.footer} !bg-lightPrime  `}>
        <div className={`${styles.footerSectionsContainer} bg-lightPrime`}>
          <div className={styles.eachCol}>
            <h4 style={{ fontSize: 30 }}>{message.Footer.tiaraAc}</h4>
            <p>{message.Footer.newsLetter}</p>
            <form className={styles.newsletterForm} action="">
              <TextField
                sx={{
                  "&.MuiInputBase-root": {
                    "&.MuiOutlinedInput-root": {
                      borderRadius: 0,
                      borderColor: "black",
                    },
                  },
                }}
              />
              <Button className="border rounded border-black bg-transparent text-black">
                Subscribe
              </Button>
            </form>
          </div>

          <div className={`${styles.eachCol} lg:self-start`}>
            <h5>{message.Footer.websiteMap}</h5>
            <Link href={"/hub/classes"}>{message.Footer.classes}</Link>
            <Link href={"#"}>{message.Footer.writingCenter}</Link>
            <Link href={"#"}>{message.Footer.teachers}</Link>
            <Link href={"#"}>{message.Footer.notes}</Link>
            <Link href={"#"}>{message.Footer.videoCenter}</Link>
          </div>
          <div className={`${styles.eachCol} lg:self-start`}>
            <h5>Follow Us</h5>
            <Link href={"#"}>
              <FacebookIcon />
              Facebook
            </Link>
            <Link href={"#"}>
              <InstagramIcon />
              Instagram
            </Link>
            <Link href={"#"}>
              <XIcon />X
            </Link>
            <Link href={"#"}>
              <LinkedInIcon />
              Linkedin
            </Link>
            <Link href={"#"}>
              <YouTubeIcon />
              Youtube
            </Link>
          </div>
          <Link
            referrerPolicy="origin"
            target="_blank"
            href="https://trustseal.enamad.ir/?id=516151&Code=jCBpwjkJeshetgDotCMZkNrYm2zyiLUy"
          >
            <img
              referrerPolicy="origin"
              src="https://trustseal.enamad.ir/logo.aspx?id=516151&Code=jCBpwjkJeshetgDotCMZkNrYm2zyiLUy"
              alt=""
              style={{ cursor: "pointer" }}
              data-code="jCBpwjkJeshetgDotCMZkNrYm2zyiLUy"
            />
          </Link>
        </div>
      </section> */}
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
    </div>
  );
}
