import { BackgroundLines } from "@/components/ui/background-lines";
import { ColourfulText } from "@/components/ui/colourful-tex";
import { Separator } from "@/components/ui/separator";
import { podcastCats } from "@/constants";
import { Clock, User } from "lucide-react";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import React from "react";

const Podcasts = async () => {
  const local = await getLocale();
  return (
    <div className="relative container space-y-6">
      <div
        id="podcastHero"
        className="flex justify-between items-center dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2]"
      >
        <div className="flex flex-col gap-3">
          <p className="text-extraText">Listening is crucial </p>
          <h1>
            <ColourfulText text="TiaraCast" isRTL={local === "fa"} />
          </h1>
          <p className="italic ">
            "Where Languages Sparkle and Cultures Shine"
          </p>
        </div>
        <Image
          src={"/podcastCanvas.png"}
          alt="podcast"
          width={600}
          height={600}
        />
      </div>
      <div className="grid grid-cols-4 gap-4 justify-center relative">
        {podcastCats.map((cat) => (
          <div
            key={cat.value}
            className="flex justify-center cursor-pointer relative"
          >
            <p>{cat.title}</p>
          </div>
        ))}
      </div>
      <div className="bg-slate-400 w-6/12 mx-auto container">
        <h3>Top podcasts</h3>

        <div className="flex flex-col">
          <Image
            src={"/https://picsum.photos/id/14/1080/720"}
            alt="podcast"
            width={200}
            height={200}
            className=" rounded-md"
          />
          <div className="flex justify-between">
            <p>
              <User /> John doe
            </p>

            <p>
              <Clock /> 48 Min
            </p>
          </div>
          <Separator />
          <p className="font-bold text-2xl">the title for this podcast</p>
        </div>
      </div>
    </div>
  );
};

export default Podcasts;
