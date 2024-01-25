import Carousel from "@modules/common/components/carousel"

const Hero = () => {
  return (
    <div className="">
      <Carousel options={{ loop: true }}>
        <div className="relative w-full h-[400px] bg-white flex-carousel"></div>
        <div className="relative w-full h-[400px] bg-white flex-carousel"></div>
      </Carousel>
    </div>
  )
}

export default Hero
