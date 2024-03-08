import Link from "next/link";
import styles from "./page.module.css";
import BrownLink from "@/components/reusableComponents/brownLink/BrownLink";
import { Divider, TextField } from "@mui/material";
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
import {
  AccessTime,
  EditNote,
  GridView,
  NoteAlt,
  OndemandVideo,
  People,
} from "@mui/icons-material";
export default async function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.navbar}>
        <h3 className="h3">Tiara Academy</h3>
        <div className={styles.navbarLeft}>
          {" "}
          <Link href={"/home"}>Services</Link>
          <Divider orientation="vertical" style={{ height: "20px" }} />
          <Link href={"/home"}>Levels</Link>
          <Divider orientation="vertical" style={{ height: "20px" }} />
          <Link href={"/home"}>Testimonials</Link>
          <Divider orientation="vertical" style={{ height: "20px" }} />
          <Link href={"/home"}>Enter Main Website</Link>
        </div>
        <div className={styles.navbarRight}>
          <Link
            href={"/sign-in"}
            className="bg-[#81403e] text-white px-2 py-4 font-bold w-fit text-xs lg:text-base"
          >
            Sign in / Sign up
          </Link>
        </div>
        <Popover>
          <PopoverTrigger>
            <div className="block lg:hidden">
              <CustomHamburger />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col  border-b-2 border-dashed mb-2 pb-2 gap-1 text-base md:gap-3  md:text-xl">
              {" "}
              <Link href={"/home"}>Services</Link>
              <Divider className="my-2" />
              <Link href={"/home"}>Levels</Link>
              <Divider className="my-2" />
              <Link href={"/home"}>Testimonials</Link>
              <Divider className="my-2" />
              <Link href={"/home"}>Enter Main Website</Link>
            </div>

            <div className="mt-7 mb-3">
              <Link
                href={"/sign-in"}
                className="bg-[#81403e] text-white px-2 py-4 font-bold w-fit "
              >
                Sign in / Sign up
              </Link>
            </div>

            <div className="flex w-full justify-around mt-8 border-t border-dashed pt-4 gap-2">
              <Link href={"/home"} className="navLinkContainer">
                <GridView />
              </Link>
              <Link href={"/classes"} className="navLinkContainer">
                <AccessTime />
              </Link>
              <Link href={"/writing"} className="navLinkContainer">
                <EditNote />
              </Link>
              <Link href={"/teachers"} className="navLinkContainer">
                <People />
              </Link>
              <Link href={"/blogs"} className="navLinkContainer">
                <NoteAlt />
              </Link>
              <Link href={"#"} className="navLinkContainer">
                <OndemandVideo />
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </section>

      <section className={styles.header}>
        <div className={styles.leftHeader}>
          <p style={{ marginBottom: "2em", fontWeight: 700 }}> Benefits</p>
          <p className=" text-4xl font-bold md:text-5xl lg:text-6xl">
            <span> The Best Way</span>
            <br className="hidden md:block" />
            <span> to showcase </span>
            <br className="hidden md:block" />
            <span> your project.</span>
          </p>
          <p style={{ marginBottom: "1em" }}>
            Here you can put a short description about your project.
          </p>
          <div className="flex gap-4 items-center flex-col md:flex-row ">
            <Link href={"#"} className="brownLink">
              Try for free
            </Link>
            <Button className="border rounded border-black bg-transparent text-black">
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

      <section className={styles.joinCommunity}>
        <div className={styles.joinComLeft}>
          <h4 style={{ fontWeight: 700, fontSize: 40 }}>
            Introducing good solution
          </h4>
          <p>Join our community and experience the benefits today!</p>
          <BrownLink href="#" title="Try for free" />
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
          <h4 style={{ fontWeight: 700, fontSize: 30 }}>
            Taking your IELTS is guaranteed with us
          </h4>
          <p>
            With the best methods in the world, you will pass your IELTS exam
            with the best score
          </p>
          <Button className="border rounded border-black bg-transparent text-black">
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
          <h4 style={{ fontWeight: 700, fontSize: 30 }}>
            Taking your IELTS is guaranteed with us
          </h4>
          <p>
            With the best methods in the world, you will pass your IELTS exam
            with the best score
          </p>
          <Button className="border rounded border-black bg-transparent text-black">
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
      <section className={styles.levels}>
        <div className={styles.leftLevels}>
          <Image
            src={"/levels.jpeg"}
            alt="Levels"
            width={200}
            height={200}
            className={styles.levelsImg}
          />
          <h3 style={{ fontWeight: 700, fontSize: 30 }}>
            How to join our community
          </h3>
          <p>Just 3 simple steps to join our fantastic english community!</p>
          <BrownLink href="/sign-up" title="Sign up now" />
        </div>
        <div className={styles.rightLevels}>
          <div className={`${styles.eachLevel}`}>
            <h4>Step 1</h4>
            <p>
              Make an account for yourself using{" "}
              <span className={styles.miniBrownLink}>Sign up now</span> button
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

      <section className={styles.testimonials}>
        <h3 style={{ fontSize: 40, marginBottom: ".5em" }}>Testimonials</h3>
        <p>People love what we do and we want to let your know</p>
        <div className={styles.commentsContainer}>
          <div className={styles.eachComment}>
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
          <div className={styles.eachComment}>
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
          <div className={styles.eachComment}>
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

      <section className={styles.footer}>
        <div className={styles.footerSectionsContainer}>
          <div className={styles.eachCol}>
            <h4 style={{ fontSize: 30 }}>Tiara Academy</h4>
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
