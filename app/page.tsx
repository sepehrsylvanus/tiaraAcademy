import Link from "next/link";
import styles from "./page.module.css";
import BrownLink from "@/components/reusableComponents/brownLink/BrownLink";
import { Avatar, Divider, TextField } from "@mui/material";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CustomHamburger from "@/components/hamburger/CustomHamburger";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import ClerkAvatar from "@/components/reusableComponents/ClerkAvatar";

export default async function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <div className={`${styles.container} bg-lightPrime `}>
      <section className={`${styles.navbar} bg-lightPrime text-extraText`}>
        <h3 className="h3 ">Tiara Academy</h3>
        <div className={`${styles.navbarLeft} bg-lightPrime text-lightText`}>
          {" "}
          <Link className="text-lightText" href={"#services"}>
            Services
          </Link>
          <Divider orientation="vertical" style={{ height: "20px" }} />
          <Link className="text-lightText" href={"#levels"}>
            Levels
          </Link>
          <Divider orientation="vertical" style={{ height: "20px" }} />
          <Link className="text-lightText" href={"#testimonials"}>
            Testimonials
          </Link>
          <Divider orientation="vertical" style={{ height: "20px" }} />
          <Link className="text-lightText" href={"/hub"}>
            Enter Hub
          </Link>
        </div>
        <div className={`${styles.navbarRight} bg-lightPrime`}>
          <div className=" scale-75 lg:scale-100">
            {token ? (
              <div className=" pt-4 mb-3 gap-8 flex items-center justify-between">
                <Link href={"/hub"} className="brownLink">
                  Enter Hub
                </Link>

                <div className=" scale-150">
                  <ClerkAvatar />
                </div>
              </div>
            ) : (
              <div className=" mb-3 pt-6  ">
                <Link href={"/sign-in"} className="brownLink">
                  Sign in / Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
        <CustomHamburger navbar={true} sidebar={false} />
      </section>

      <section id="services" className={`${styles.header} bg-lightPrime`}>
        <div className={`${styles.leftHeader} bg-lightPrime text-extraText`}>
          <p
            style={{ marginBottom: "2em", fontWeight: 700 }}
            className=" text-lightText"
          >
            {" "}
            Benefits
          </p>
          <p className=" text-4xl font-bold md:text-5xl lg:text-6xl">
            <span> The Best Way</span>
            <br className="hidden md:block" />
            <span> to showcase </span>
            <br className="hidden md:block" />
            <span> your project.</span>
          </p>
          <p style={{ marginBottom: "1em" }} className="text-lightText">
            Here you can put a short description about your project.
          </p>
          <div className="flex gap-4 items-center flex-col md:flex-row ">
            <Link href={"#"} className="brownLink">
              Try for free
            </Link>
            <Button className="border rounded border-lightText bg-transparent text-lightText">
              See how it works
            </Button>
          </div>
        </div>

        <div className=" hidden md:block">
          <Image
            src="https://images.pexels.com/photos/5676740/pexels-photo-5676740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Hero image"
            width={400}
            height={500}
          />
        </div>
      </section>
      <Divider sx={{ margin: "1em 0" }} />

      <section className={`${styles.joinCommunity} bg-lightPrime`}>
        <div className={styles.joinComLeft}>
          <h4
            style={{ fontWeight: 700, fontSize: 40 }}
            className=" text-extraText"
          >
            Introducing good solution
          </h4>
          <p>Join our community and experience the benefits today!</p>
          <Link href={"#"} className="brownLink w-fit">
            Try for free
          </Link>
        </div>
        <div className="hidden md:block">
          <Image
            src={
              "https://images.pexels.com/photos/8618062/pexels-photo-8618062.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
            alt="Join Community"
            width={400}
            height={400}
          />
        </div>
      </section>
      <Divider sx={{ margin: "1em 0" }} />
      <section className={styles.secondService}>
        <div className="hidden md:block">
          <Image
            src={
              "https://images.pexels.com/photos/8617981/pexels-photo-8617981.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="Certification guarantee"
            width={400}
            height={400}
          />
        </div>
        <div className={styles.secondServiceRight}>
          <p style={{ marginBottom: "2em", fontWeight: 700 }}>Better IELTS</p>
          <h4
            style={{ fontWeight: 700, fontSize: 30 }}
            className=" text-extraText"
          >
            Taking your IELTS is guaranteed with us
          </h4>
          <p>
            With the best methods in the world, you will pass your IELTS exam
            with the best score
          </p>
          <Button className="border rounded border-lightText bg-transparent text-lightText">
            Try now
          </Button>
        </div>
      </section>
      <Divider sx={{ margin: "1em 0" }} />
      <section className={styles.thirdService}>
        <div className={styles.leftThirdService}>
          <p style={{ marginBottom: "2em", fontWeight: 700 }}>
            Smart education
          </p>
          <h4
            style={{ fontWeight: 700, fontSize: 30 }}
            className="text-extraText"
          >
            Taking your IELTS is guaranteed with us
          </h4>
          <p>
            With the best methods in the world, you will pass your IELTS exam
            with the best score
          </p>
          <Button className="border rounded border-lightText bg-transparent text-lightText">
            Try now
          </Button>
        </div>
        <div className="hidden md:block">
          <Image
            src={"/smartEdu.jpeg"}
            alt="Smart Education"
            width={400}
            height={400}
          />
        </div>
      </section>

      <Divider sx={{ margin: "1em 0" }} />
      <section id="levels" className={styles.levels}>
        <div className={styles.leftLevels}>
          <Image
            src={"/levels.jpeg"}
            alt="Levels"
            width={200}
            height={200}
            className={styles.levelsImg}
          />
          <h3
            style={{ fontWeight: 700, fontSize: 30 }}
            className="text-extraText"
          >
            How to join our community
          </h3>
          <p>Just 3 simple steps to join our fantastic english community!</p>
          <Link href={"/sign-up"} className="brownLink w-fit">
            Sign up now
          </Link>
        </div>
        <div className={styles.rightLevels}>
          <div className={`${styles.eachLevel}`}>
            <h4>Step 1</h4>
            <p>
              Make an account for yourself using{" "}
              <span className="bg-lightText text-lightPrime px-4 py-2 rounded-md">
                Sign up now
              </span>{" "}
              button
            </p>
          </div>

          <div className={`${styles.eachLevel}`}>
            <h4>Step 2</h4>
            <p>Choose your class and time and reserve it</p>
          </div>

          <div className={`${styles.eachLevel}`}>
            <h4>Step 3</h4>
            <p>Use and enjoy our fantastic services</p>
          </div>
        </div>
      </section>
      <Divider sx={{ margin: "1em 0" }} />

      <section id="testimonials" className={styles.testimonials}>
        <h3
          style={{ fontSize: 40, marginBottom: ".5em" }}
          className="text-extraText"
        >
          Testimonials
        </h3>
        <p>People love what we do and we want to let your know</p>
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
            <h4 style={{ fontSize: 30 }} className="text-extraText">
              Tiara Academy
            </h4>
            <p>
              Join our newsletter to stay up to date on features and releases.
            </p>
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

          <div className={styles.eachCol}>
            <h5>Contact with us</h5>
            <Link href={"#"}>Contact with our manager</Link>
            <Link href={"#"}>Contact with our teachers</Link>
            <Link href={"#"}>Contact with SSH development</Link>
          </div>
          <div className={styles.eachCol}>
            <h5>Website map</h5>
            <Link href={"#"}>Classes</Link>
            <Link href={"#"}>Writing center</Link>
            <Link href={"#"}>Teachers</Link>
            <Link href={"#"}>Notes</Link>
            <Link href={"#"}>Video center</Link>
          </div>
          <div className={styles.eachCol}>
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
        </div>
        <p className="text-center mt-[1.5em] text-sm">
          {" "}
          © 2024 Tiara Academy. All rights reserved. Content for educational use
          only. Website by SSH Development.
        </p>
      </section>
    </div>
  );
}
