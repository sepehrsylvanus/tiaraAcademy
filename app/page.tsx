import Link from "next/link";
import styles from "./page.module.css";
import BrownLink from "@/components/reusableComponents/brownLink/BrownLink";
import { Divider } from "@mui/material";

export default async function Home() {
  return (
    <div className={styles.container}>
      <section className={styles.navbar}>
        <h3 style={{width:'13%'}}>Tiara Academy</h3>
        <div className={styles.navLinks}>
          <div className={styles.navbarLeft}>
            {" "}
    
            <Link href={"/home"}>Services</Link>
            <Divider orientation="vertical" style={{height:'20px' }}/>
            <Link href={"/home"}>Levels</Link>
            <Divider orientation="vertical" style={{height:'20px' }}/>
            <Link href={"/home"}>Testimonials</Link>
            <Divider orientation="vertical" style={{height:'20px' }}/>
            <Link href={"/home"}>Enter Main Website</Link>
          
          </div>
          <div className={styles.navbarRight}>
            <span>FAQs</span>
            <BrownLink title="Sign in / Sign up" href="/sign-in" />
          </div>
        </div>
      </section>
      <section className={styles.header}>header</section>
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
