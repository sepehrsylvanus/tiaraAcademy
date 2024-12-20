import Image from "next/image";
import Link from "next/link";
import React from "react";
import ChangeLocale from "../changeLocale/ChangeLocale";

import CustomHamburger from "../hamburger/CustomHamburger";
import { getMessages } from "next-intl/server";
import styles from "@/app/page.module.css";

import NavRight from "../navRight/NavRight";
import { getToken } from "@/actions/actions";
const Navbar = async () => {
  const message = (await getMessages()) as any;
  const token = await getToken();

  return (
    <nav
      className={`${styles.navbar} bg-lightPrime text-extraText flex items-center `}
    >
      <div className="flex gap-4 items-center">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt={message.logoAlt}
            width={85}
            height={85}
            className="scale-125 mr-8"
          />
        </Link>
        <div
          className={`${styles.navbarLeft} bg-lightPrime text-lightText items-center`}
        >
          <ChangeLocale />
        </div>
      </div>
      <NavRight token={token?.value!} />
      <CustomHamburger navbar={true} sidebar={false} />
    </nav>
  );
};

export default Navbar;
