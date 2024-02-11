import Link from "next/link";
import styles from "./page.module.css";
import BrownLink from "@/components/reusableComponents/brownLink/BrownLink";
import { Button, Divider } from "@mui/material";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
export default async function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.navbar}>
        <h3 style={{ width: "13%" }}>Tiara Academy</h3>
        <div className={styles.navLinks}>
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
            <span>FAQs</span>
            <BrownLink title="Sign in / Sign up" href="/sign-in" />
          </div>
        </div>
      </section>
      <Divider />
      <section className={styles.header}>
        <div className={styles.leftHeader}>
          <p style={{ marginBottom: "2em", fontWeight: 700 }}>- Benefits</p>
          <p style={{ fontWeight: 700, fontSize: 70 }}>
            The Best Way
            <br />
            to showcase
            <br />
            your project.
          </p>
          <p style={{ marginBottom: "1em" }}>
            Here you can put a short description about your project.
          </p>
          <div style={{ display: "flex", gap: "1em" }}>
            <BrownLink title="Try for free" href="#" />
            <Button
              variant="outlined"
              sx={{
                "&.MuiButton-root": {
                  borderRadius: "2px",
                  color: "black",
                  borderColor: "black",
                },
              }}
            >
              See how it works
            </Button>
          </div>
        </div>

        <div className={styles.rightHeader}>
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
        <div className={styles.joinComRight}>
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
        <div className={styles.secondServiceLeft}>
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
          <Button
            variant="outlined"
            sx={{
              "&.MuiButton-root": {
                borderRadius: "2px",
                color: "black",
                borderColor: "black",
              },
              width: "fit-content",
            }}
          >
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
          <Button
            variant="outlined"
            sx={{
              "&.MuiButton-root": {
                borderRadius: "2px",
                color: "black",
                borderColor: "black",
              },
              width: "fit-content",
            }}
          >
            Try now
          </Button>
        </div>
        <div className={styles.rightThirdService}>
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
          <div className={styles.eachLevel}>
            <h4>Step 1</h4>
            <p>
              Make an account for yourself using{" "}
              <span className={styles.miniBrownLink}>Sign up now</span> button
            </p>
          </div>
          <Divider />
          <div className={styles.eachLevel}>
            <h4>Step 2</h4>
            <p>Choose your class and time and reserve it</p>
          </div>
          <Divider />
          <div className={styles.eachLevel}>
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
      <section className={styles.enterMain}>enterMain</section>
      <section className={styles.footer}>footer</section>
    </div>
  );
}
