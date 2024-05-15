import Carousel from '@modules/common/components/carousel';
import Image from 'next/image';
import { StrapiMediaComponent } from 'types/strapi';
import SkeletonCarousel from '@modules/skeletons/components/skeleton-carousel';
import { cmsClient } from '@lib/config';

interface HeroProps {
  carousel?: {
    title: string;
    description: string;
    buttons: {
      id: number;
      url: string;
      target: string;
      text: string;
      type: 'primary' | 'secondary';
    }[];
    image: StrapiMediaComponent;
  }[];
}

const Hero = ({ carousel }: HeroProps) => {
  return (
    <div>
      <Carousel options={{ loop: true }}>
        {carousel ? (
          carousel?.map((item, index) => (
            <div
              key={index}
              className="relative w-full h-[250px] bg-white flex-carousel-full"
            >
              <div className="absolute z-10 space-y-8 bottom-20 left-16 md:left-20 font-josefin">
                <div className="space-y-2 pr-10">
                  <h3 className="text-xl sm:text-3xl lg:text-4xl font-semibold text-white font-raleway">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg font-normal text-white font-roboto">
                    {item.description}
                  </p>
                </div>
              </div>
              <Image
                className="z-0 object-cover brightness-50"
                fill
                alt={`Carousel item ${index + 1}`}
                src={
                  cmsClient.getImageURL(item.image?.url) ||
                  'images/fallback.png'
                }
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
              />
            </div>
          ))
        ) : (
          <div className="skeleton w-full h-[250px]">
            <SkeletonCarousel />
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default Hero;
