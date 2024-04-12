"use client"
import useEmblaCarousel from "embla-carousel-react"
import { EmblaOptionsType } from "embla-carousel"
import { NextButton, PrevButton, usePrevNextButtons } from "./carousel-arrow"
import { CarouselDot, useDotButton } from "./carousel-dot"
import { conditionalClassNames } from "@lib/util/conditional-classname"

type Props = {
  options: EmblaOptionsType
  children: React.ReactNode
}

export default function Carousel({ options, children }: Props) {
  const [carouselRef, carouselApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(carouselApi)

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(carouselApi)

  return (
    <div className="relative overflow-hidden" ref={carouselRef}>
      <div className="flex touch-pan-y">{children}</div>

      {/* Chevron buttons */}
      <div className="absolute flex justify-between w-full px-2 -translate-y-1/2 top-1/2">
        <PrevButton className="text-white" onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton className="text-white" onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>

      {/* Dot navigation */}
      <div className="absolute left-0 right-0 flex items-center justify-center bottom-4">
        {scrollSnaps.map((_, index) => (
          <CarouselDot
            key={index}
            className={conditionalClassNames(
              index === selectedIndex ? "bg-white" : "bg-slate-400",
              "flex items-center w-6 h-1 ml-2 mr-2 rounded-lg"
            )}
            onClick={() => onDotButtonClick(index)}
          />
        ))}
      </div>
    </div>
  )
}
