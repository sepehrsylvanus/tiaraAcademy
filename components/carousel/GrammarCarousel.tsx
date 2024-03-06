import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { slides } from "@/utils/fakeData";
import styles from "./grammarCarousel.module.css";
import Link from "next/link";
import { Slide } from "@/utils/types";
import { Divider } from "@mui/material";

const chunkedSlides: Slide[][] = [];
for (let i = 0; i < slides.length; i += 3) {
  chunkedSlides.push(slides.slice(i, i + 3));
}

const GrammarCarousel = () => {
  return (
    <div>
      <div>
        <h3 className="h1 text-4xl mb-3">Grammar Article</h3>
        <Divider sx={{ border: "1px solid #b2bec3", margin: "1em 0" }} />
      </div>
      <div className="px-[5em]">
        <Carousel>
          <CarouselContent>
            {chunkedSlides.map((slideGroup, index) => (
              <CarouselItem className="grid grid-cols-3 gap-3" key={index}>
                {slideGroup.map((slide, index) => (
                  <div
                    key={index}
                    className={`${styles.carousItemContainer} p-4 rounded-md`}
                  >
                    <div className="bg-white p-2 rounded-md ">
                      <p className=" h3 mb-3">{slide.title}</p>
                      <p className=" text-sm mb-[3em]">{slide.subtitle}</p>
                      <Link className=" font-bold" href={slide.link}>
                        Read more
                      </Link>
                    </div>
                  </div>
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className=" shadow-lg" />
          <CarouselNext className=" shadow-lg" />
        </Carousel>
      </div>
    </div>
  );
};

export default GrammarCarousel;
