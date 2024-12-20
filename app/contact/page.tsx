import React from "react";
import {
  LocalPhone,
  Drafts,
  Share,
  Instagram,
  Telegram,
  LocationOn,
} from "@mui/icons-material";

import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";
import ContactForm from "./ContactForm";
import CustomHamburger from "@/components/hamburger/CustomHamburger";
import BackButton from "@/components/reusableComponents/backButton/BackButton";
import { getMessages } from "next-intl/server";

const ContactUs = async () => {
  const messages = (await getMessages()) as any;
  const t = messages.ContactUs;
  return (
    <div
      className="h-fit relative w-fit
      items-center justify-center pt-[3em] md:pt-[6.5em] mb-[5em] -z-10"
    >
      <div className="ml-auto z-20 fixed top-0 right-0 md:hidden bg-white  rounded-md m-2">
        <CustomHamburger navbar={false} sidebar={false} />
      </div>

      <div className="w-full h-full ">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-5 md:p-[5em]  p-4  w-full  place-content-center h-full text-lightText">
          <div className="left col-span-3 rounded bg-lightPrime z-10 shadow-md p-4 grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4">
            <section className="phone">
              <h1 className="h1 mb-6">{t.contactInfo}</h1>
              <p className="mb-2">
                <LocalPhone /> {t.phone}
              </p>
              <Link href={"tel:+989102905410"}>+98 910 290 5410</Link>
              <p className=" italic text-sm">{t.available}</p>
            </section>
            <section className="address">
              <p className="mb-2">
                <LocationOn /> {t.address}
              </p>
              <p>{t.comingSoon}</p>
            </section>
            <section className="email">
              <p className="mb-2">
                <Drafts /> {t.email}
              </p>
              <p>
                <Link
                  className="underline"
                  href={"mailto:info@tiaraacademy.com"}
                >
                  info@tiaraacademy.com
                </Link>
              </p>
              <p>
                <Link
                  className="underline"
                  href={"mailto:support@tiaraacademy.com"}
                >
                  support@tiaraacademy.com
                </Link>
              </p>
            </section>
            <section className="social">
              <p className="mb-2">
                <Share /> {t.socialMedia}
              </p>
              <p className="flex gap-2">
                <Link href={"#"}>
                  <Instagram />
                </Link>
                <Link href={"#"}>
                  <Telegram />
                </Link>
              </p>
            </section>
          </div>
          <div className="right col-span-2 rounded bg-lightText text-lightPrime p-4 shadow-md z-10">
            <h1 className="h1">{t.sendMessage}</h1>
            <ContactForm />
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default ContactUs;
