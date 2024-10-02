"use client";
import { Button } from "@/components/ui/button";
import { Axios } from "@/utils/axiosIn";
import { Video as VideoType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import UpdateIcon from "@mui/icons-material/Update";
import WorkIcon from "@mui/icons-material/Work";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type SingleVideoProps = {
  params: {
    id: string;
  };
};
const SingleVideo = ({ params }: SingleVideoProps) => {
  const [video, setVideo] = useState<VideoType>();
  useEffect(() => {
    Axios.get(`/videos/${params.id}`)
      .then((res) => setVideo(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="md:w-9/12  pb-[6em] mx-auto w-full md:px-0 px-4">
      <section
        id="introduction"
        className="grid gap-4 grid-cols-1 md:grid-cols-2 w-full mt-[4em]"
      >
        <div id="text " className="order-2 md:order-none">
          <h2 className="mb-4">Lorem, ipsum dolor.</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            ullam omnis, nulla sit quae iure repellat provident itaque
            repudiandae quasi. Sunt beatae eveniet quis natus.
          </p>
          <div
            id="price&register"
            className="flex justify-between mt-4 flex-col-reverse md:flex-row items-center"
          >
            <Button className="w-full md:w-auto mt-2 md:mt-0">Buy</Button>
            <p className="font-bold ">
              <span className="mr-1">425000</span>Toman
            </p>
          </div>
        </div>

        <div
          id="coursePrevVideo"
          className="order-1
        "
        >
          <ReactPlayer
            width={"100%"}
            height={"auto"}
            controls
            url={
              "https://infallible-zhukovsky-7f1f128am.storage.iran.liara.space/2024-09-03%2015-50-41.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=342080d4-c2d1-45a3-a670-00ed1438736c%2F20241001%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20241001T134310Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=fc19a6da63646068eb4a1f4aff95a318ccf4a58c0bf5a9a013c86373c074baa1"
            }
          />
        </div>
      </section>

      <section
        id="features"
        className="grid
       grid-cols-1 md:grid-cols-3 gap-3 justify-items-center mt-6"
      >
        <div className=" rounded-md w-[150px] text-center bg-cardBg text-white">
          <FormatListNumberedIcon className="text-lightText " />
          <p className="text-extraText">Video count</p>
          <p className="text-lightText">2</p>
        </div>
        <div className=" rounded-md w-[150px] text-center bg-cardBg text-white">
          <UpdateIcon className="text-lightText " />
          <p className="text-extraText">The last update</p>
          <p className="text-lightText">1430/23/2</p>
        </div>
        <div className=" rounded-md md:w-[150px] text-center bg-cardBg text-white col-span-2 md:col-span-1 w-full">
          <WorkIcon className="text-lightText " />
          <p className="text-extraText">Prerequisities</p>
          <p className="text-lightText">English 1, English 2</p>
        </div>
      </section>

      <section
        id="teacher"
        className="flex flex-col items-center mt-4 gap-2 rounded-md py-4 shadow-md bg-cardBg"
      >
        <Avatar className="w-[50px] h-[50px]">
          <AvatarImage src="https://picsum.photos/200/300" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <p className="font-bold">Teacher name</p>
        <p>Teacher of English, Persian, Russian</p>
        <Button variant={"outline"}>Show profile</Button>
      </section>

      <section
        id="description"
        className="bg-cardBg text-lightText p-4  mt-2 rounded-md
      "
      >
        <h2 className=" text-center mt-4">Description</h2>
        <p className="text-justify mt-2 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          temporibus voluptatem rem necessitatibus quasi. Deleniti ipsa aperiam
          sapiente rerum expedita voluptatem totam commodi quibusdam unde culpa
          sunt magni perspiciatis tempora, ad et! Officia illum minima
          temporibus nesciunt magni ut at, provident labore quo. Similique nulla
          maxime beatae possimus ullam, iusto odit ipsa aut nobis illum.
          Reiciendis, at, ea culpa aut officiis deserunt ratione exercitationem
          eos possimus dolore saepe mollitia. Aliquam, impedit possimus vero,
          asperiores laboriosam recusandae quas odio, dolorum quae reprehenderit
          perferendis! Magnam reprehenderit tempore, ducimus consequuntur
          inventore pariatur molestiae maiores libero soluta in cum nesciunt.
          Omnis autem temporibus possimus itaque amet aperiam, saepe quam, iusto
          accusantium voluptas ullam deleniti assumenda cum fugit fuga, totam
          dignissimos ipsam nobis iste eius. Aliquam fugit quos illo libero
          repellendus perferendis ipsa labore iusto.
        </p>
      </section>
    </div>
  );
};

export default SingleVideo;
