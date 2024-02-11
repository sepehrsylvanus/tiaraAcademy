import Link from "next/link";
import styles from "./page.module.css";
import BrownLink from "@/components/reusableComponents/brownLink/BrownLink";
import { Button, Divider } from "@mui/material";
import Image from "next/image";
import CustomButton from "@/components/reusableComponents/customButton/customButton";

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
          <p style={{ marginBottom: "2em" }}>- Benefits</p>
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

      <section className={styles.servicesFirst}>servicesFirst</section>
      <section className={styles.serviceSecond}>serviceSecond</section>
      <section className={styles.serviceThird}>serviceThird</section>
      <section className={styles.levels}>levels</section>
      <section className={styles.testimonials}>testimonials</section>
      <section className={styles.enterMain}>enterMain</section>
      <section className={styles.footer}>footer</section>
    </div>
  );
}
