import { Image as MedusaImage } from '@medusajs/medusa';
import { Container } from '@medusajs/ui';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type ImageGalleryProps = {
  images: MedusaImage[];
  setDisplayedImageIndex: Dispatch<SetStateAction<number>>;
};

const ImageGallery = ({
  images,
  setDisplayedImageIndex,
}: ImageGalleryProps) => {
  return (
    <div className="mr-2 flex flex-col gap-y-2 lg:mx-4 lg:gap-y-4">
      {images.map((image, index) => {
        return (
          <Container
            key={image.id}
            className="relative overflow-hidden border-2 border-transparent p-6 hover:border-2 hover:border-primary lg:p-8"
            id={image.id}
            onMouseEnter={() => setDisplayedImageIndex(index)}
          >
            <Image
              src={image.url}
              priority={index <= 2 ? true : false}
              alt={`Product image ${index + 1}`}
              className="object-contain"
              fill
            />
          </Container>
        );
      })}
    </div>
  );
};

export default ImageGallery;
