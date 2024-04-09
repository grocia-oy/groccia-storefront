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
    <div className="flex flex-col small:mx-4 gap-y-4">
      {images.map((image, index) => {
        return (
          <Container
            key={image.id}
            className="relative w-4 h-4 overflow-hidden bg-ui-bg-subtle border-2 border-transparent hover:border-primary-500 hover:border-2 p-8"
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
