import React, { useCallback } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./EmblaCarouselButton";
import { CarouselProps } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Carousel = ({ fansLikeDetails }: CarouselProps) => {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay || !("stopOnInteraction" in autoplay.options)) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? (autoplay.reset as () => void)
        : (autoplay.stop as () => void);

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const slides =
    fansLikeDetails &&
    fansLikeDetails?.filter((item: any) => item.totalPodcasts > 0);

  return (
    <section
      className="flex w-full flex-col gap-4 overflow-hidden"
      ref={emblaRef}
    >
      <div className="flex">
        {slides.slice(0, 5).map((item) => (
          <figure
            key={item._id}
            className="carousel_box"
            onClick={() =>
              router.push(`/podcasts/${item.podcast[0].podcastId}`)
            }
          >
            <Image
              src={item.imageUrl}
              alt="profile"
              fill
              className="absolute size-full rounded-xl border-none"
            />
            <div className="glassmorphism-black relative z-10 flex flex-col rounded-b-xl p-4">
              <h2 className="text-14 text-white-1 font-semibold">
                {item.podcast[0]?.podcastTitle}
              </h2>
              <p className="text-white-2 text-12 font-normal">{item.name}</p>
            </div>
          </figure>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            clickHandler={() => onDotButtonClick(index)}
            selected={index === selectedIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
