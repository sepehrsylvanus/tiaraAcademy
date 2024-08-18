import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ChangeLocale from "../changeLocale/ChangeLocale";
import ClerkAvatar from "../reusableComponents/ClerkAvatar";
import CustomHamburger from "../hamburger/CustomHamburger";
import { getMessages } from "next-intl/server";
import styles from "@/app/page.module.css";
import { cookies } from "next/headers";
const Navbar = async () => {
  const message = (await getMessages()) as any;
  const cookieStore = cookies();

  const token = cookieStore.get("token");
  return (
    <nav
      className={`${styles.navbar} bg-lightPrime text-extraText flex items-center`}
    >
      <Image
        src={"/logo.jpg"}
        alt={message.logoAlt}
        width={85}
        height={85}
        className="scale-125"
      />
      <div
        className={`${styles.navbarLeft} bg-lightPrime text-lightText items-center`}
      >
        {" "}
        <Link className="text-lightText" href={"#services"}>
          {message.Navbar.services}
        </Link>
        <Divider orientation="vertical" style={{ height: "20px" }} />
        <Link className="text-lightText" href={"#levels"}>
          {message.Navbar.levels}
        </Link>
        <Divider orientation="vertical" style={{ height: "20px" }} />
        <Link className="text-lightText" href={"#testimonials"}>
          {message.Navbar.testimonials}
        </Link>
        <Divider orientation="vertical" style={{ height: "20px" }} />
        <Link className="text-lightText" href={"/hub"}>
          {message.Navbar.enterHub}
        </Link>
        <Divider orientation="vertical" style={{ height: "20px" }} />
        <ChangeLocale />
      </div>
      <div className={`${styles.navbarRight} bg-lightPrime`}>
        <div className=" scale-75 lg:scale-100">
          {token ? (
            <div className=" pt-4 mb-3 gap-8 flex items-center justify-between">
              <Link href={"/hub"} className="brownLink">
                {message.Navbar.enterHub}
              </Link>

              <div className=" scale-150">
                <ClerkAvatar />
              </div>
            </div>
          ) : (
            <div className=" mb-3 pt-6 md:pt-0 md:mb-0 ">
              <Link href={"/sign-in"} className="brownLink">
                {message.Navbar.signInUp}
              </Link>
            </div>
          )}
        </div>
      </div>
      <CustomHamburger navbar={true} sidebar={false} />
    </nav>
  );
};

export default Navbar;
