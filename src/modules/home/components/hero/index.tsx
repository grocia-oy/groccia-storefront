import Carousel from "@modules/common/components/carousel"
import Image from "next/image"
import { StrapiMediaComponent } from "types/strapi"
import { getStrapiURL } from "@lib/data/content"

interface HeroProps {
  carousel: {
    title: string
    description: string
    buttons: {
      id: number
      url: string
      openInNewTab: boolean
      text: string
      type: "primary" | "secondary"
    }
    image: StrapiMediaComponent
  }[]
}

const Hero = ({ carousel }: HeroProps) => {
  return (
    <div className="">
      <Carousel options={{ loop: true }}>
        {carousel?.map((item, index) => (
          <div
            key={index}
            className="relative w-full h-[200px] bg-white flex-carousel"
          >
            <div className="absolute z-10 space-y-8 bottom-10 left-10 lg:bottom-20 lg:left-20 font-josefin">
              <div className="space-y-2">
                <h3 className="text-4xl font-semibold text-white font-raleway">
                  {item.title}
                </h3>
                <p className="text-lg font-normal text-white font-roboto">
                  {item.description}
                </p>
              </div>
            </div>
            <Image
              className="z-0 object-cover brightness-50"
              fill
              alt={`Carousel item ${index + 1}`}
              src={getStrapiURL(item.image.data.attributes.url)}
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Hero
