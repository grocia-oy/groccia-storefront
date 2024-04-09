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
    <div className="mr-2 flex flex-col gap-y-4 lg:mx-4">
      {images.map((image, index) => {
        return (
          <Container
            key={image.id}
            className="relative h-4 w-4 overflow-hidden border-2 border-transparent p-8 hover:border-2 hover:border-primary-500"
            id={image.id}
            onMouseEnter={() => setDisplayedImageIndex(index)}
          >
            <Image
              src={image.url}
              priority={index <= 2 ? true : false}
              alt={`Product image ${index + 1}`}
              fill
              sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
              style={{
                objectFit: 'contain',
              }}
            />
          </Container>
        );
      })}
    </div>
  );
};

export default ImageGallery;
