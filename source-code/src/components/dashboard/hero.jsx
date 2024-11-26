"use client";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../embla/EmblaArrowButtons";

export default function Hero() {

  const slideData = [
    {
      
    }
  ]
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
    <>
    <div
      className="overflow-hidden bg-gray-200 w-full mx-auto grid grid-flow-col auto-cols-[100vw] gap-4 h-screen"
      ref={emblaRef}
    >
     
      <div className="flex">
        
        {[
          { id: "1", url: "a", title: "hahaha" },
          { id: "2", url: "a", title: "hohohoh" },
          { id: "3", url: "a", title: "hohddf" },
          { id: "4", url: "a", title: "kikiki" },
        ]?.map((item) => {
          return (
            <div
              className="embla__slide relative h-full w-full gap-2"
              key={item.id}
            >
              {/* the image */}
              {/* <img className="w-full h-full" src={item.url} alt="" /> */}
              <div className="w-screen h-screen bg-slate-300"></div>
              {/* title/subtitle */}
              <h1 className="absolute top-1/2 left-1/2 w-full md:w-auto transform -translate-x-1/2 translate-y-[3rem] md:translate-y-[9rem]  lg:translate-y-48 bg-cyan-600 py-2 lg:py-4 px-2 lg:px-8 text-xl lg:text-2xl text-white font-extrabold">
                {item.title}
              </h1>
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
    </>
  );
}
