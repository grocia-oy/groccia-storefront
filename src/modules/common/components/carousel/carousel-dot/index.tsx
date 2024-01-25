import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react"
import { EmblaCarouselType } from "embla-carousel"

type UseDotButtonType = {
  selectedIndex: number
  scrollSnaps: number[]
  onDotButtonClick: (index: number) => void
}

export const useDotButton = (
  carouselApi: EmblaCarouselType | undefined
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!carouselApi) return
      carouselApi.scrollTo(index)
    },
    [carouselApi]
  )

  const onInit = useCallback((carouselApi: EmblaCarouselType) => {
    setScrollSnaps(carouselApi.scrollSnapList())
  }, [])

  const onSelect = useCallback((carouselApi: EmblaCarouselType) => {
    setSelectedIndex(carouselApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!carouselApi) return

    onInit(carouselApi)
    onSelect(carouselApi)
    carouselApi.on("reInit", onInit)
    carouselApi.on("reInit", onSelect)
    carouselApi.on("select", onSelect)
  }, [carouselApi, onInit, onSelect])

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  }
}

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>

export const CarouselDot: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  )
}
