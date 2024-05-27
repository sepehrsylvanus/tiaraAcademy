import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div className="container pb-[6em]">
      <div className=" flex justify-center my-4">
        <Image src="/aboutUs.jpg" alt="about" width={550} height={600} />
      </div>

      <div className="space-y-4">
        <section>
          <h3 className="h3">About Tiara</h3>
          <p className="md:w-[80%] mt-2 leading-10">
            Founded by language enthusiasts,{" "}
            <span className="font-bold">Khashayar Mohammadi</span> and{" "}
            <span className="font-bold">Arsalan Ejabatifar</span>, Tiara
            academy’s journey began with a shared passion for languages and a
            mission to bridge cultural divides. Khashayar, with a strong
            background in linguistics and a love for teaching, and Arsalan, a
            polyglot and seasoned entrepreneur, combined their expertise to
            create a platform that transforms language learning into an
            immersive experience.
          </p>
        </section>
        <Divider />
        <section className="">
          <h3 className="h3">Our mission</h3>
          <p className="mt-2">
            Our mission is to empower individuals with the language skills they
            need to connect with the world. We believe that language is more
            than just a tool for communication; it's a gateway to understanding
            different cultures and perspectives.
          </p>
        </section>
        <Divider />
        <section>
          <h3 className="h3">What we provide?!</h3>
          <TextGenerateEffect
            words={
              "We envision a world where language barriers no longer hinder personal and professional growth. Our goal is to become the leading platform for language learning in Iran, offering innovative solutions that cater to learners of all levels."
            }
          />
          <br />

          <TextGenerateEffect words="We provide a range of services tailored to meet the diverse needs of our learners. From interactive live classes and comprehensive video courses to insightful blog articles and personalized tutoring, our offerings are designed to make language learning engaging and effective." />
          <br />
          <TextGenerateEffect words="What sets us apart is our commitment to quality and innovation. Our courses are crafted by certified language experts, and our interactive tools are built using the latest educational technology. We also offer flexible learning options to fit into your busy schedule." />
          <br />
          <TextGenerateEffect words="We are dedicated to continuously improving our services. Your feedback is invaluable to us, and we regularly update our content and features based on your suggestions to ensure you receive the best learning experience possible." />
          <br />
          <TextGenerateEffect words="Ready to embark on your language learning journey? Explore our courses, join our community, and start transforming your future today!" />

          <div className="text-center mt-4 md:text-start">
            <Button>
              <Link className="text-white" href={"/sign-up"}>
                Join Us Today
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
