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
import NavRight from "../navRight/NavRight";
import { getToken } from "@/actions/actions";
const Navbar = async () => {
  const message = (await getMessages()) as any;
  const token = await getToken();
  console.log(token);
  return (
    <nav
      className={`${styles.navbar} bg-lightPrime text-extraText flex items-center`}
    >
      <Link href={"/"}>
        <Image
          src={"/logo.jpg"}
          alt={message.logoAlt}
          width={85}
          height={85}
          className="scale-125 mr-8"
        />
      </Link>
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
      <NavRight token={token?.value!} />
      <CustomHamburger navbar={true} sidebar={false} />
    </nav>
  );
};

export default Navbar;
