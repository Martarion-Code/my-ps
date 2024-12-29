"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback } from "react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../embla/EmblaArrowButtons";
// import bgImage from  'assets/images/bg-hero.png'  
export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay()]
  );
  const onNavButtonClick = useCallback((emblaApi) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);
  return (
    <div className="relative">
      <div
        className="overflow-hidden relative mt-[66px] bg-gray-200 w-full mx-auto grid grid-flow-col auto-cols-[100vw] gap-4 "
        ref={emblaRef}
      >
        <div className="flex">
          {[
            {
              id: "1",
              title: "hahaha",
              src: "/assets/images/bg-hero.png",
            },
            {
              id: "2",
              title: "hohohoh",
              src: "/assets/images/bg-hero.png",
            },
            {
              id: "3",
              title: "hohddf",
              src: "/assets/images/bg-hero.png",
            },
            {
              id: "4",
              title: "kikiki",
              src: "/assets/images/bg-hero.png",
            },
          ]?.map((item) => {
            return (
              <div
                className="embla__slide relative w-full gap-2"
                key={item.id}
              >
                {/* the image */}
                {/* <img className="w-full h-full" src={item.url} alt="" /> */}
                <div className="w-screen bg-slate-300 relative">
                  <Image src={item.src} width={500} height={400} style={{width:"100vw"}} alt="BG"/>
                  <Image src={'/assets/images/coming-soon.png'} className="absolute w-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" width={200} height={200} style={{width:"auto"}} alt="coming-soon"/>
                </div>
                {/* title/subtitle */}
                {/* <h1 className="absolute top-1/2 left-1/2 w-full md:w-auto transform -translate-x-1/2 translate-y-[3rem] md:translate-y-[9rem]  lg:translate-y-48 bg-cyan-600 py-2 lg:py-4 px-2 lg:px-8 text-xl lg:text-2xl text-white font-extrabold">
                {item.title}
                </h1> */}

              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between  absolute top-1/2 left-0 z-10 w-full">
        <div className="flex justify-between w-full">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
}
