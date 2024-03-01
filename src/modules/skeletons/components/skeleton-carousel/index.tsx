import React from "react"

type Props = {}

const SkeletonCarousel = (props: Props) => {
  return (
    <div className="relative w-full h-full bg-gray-200 flex justify-center items-center">
      <div className="absolute z-10 space-y-8 bottom-10 left-10 lg:bottom-20 lg:left-20">
        <div className="space-y-2">
          <div className="h-10 w-48 bg-neutral rounded-xl" />
          <div className="h-7 w-80 bg-neutral rounded-xl" />
        </div>
      </div>
    </div>
  )
}

export default SkeletonCarousel
