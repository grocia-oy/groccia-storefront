import { Image as MedusaImage } from '@medusajs/medusa';
import { Container } from '@medusajs/ui';
import Image from 'next/image';

type ImageGalleryProps = {
  images: MedusaImage[];
};

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex flex-col small:mx-4 gap-y-4">
      {images.map((image, index) => {
        return (
          <Container
            key={image.id}
            className="relative w-4 h-4 overflow-hidden bg-ui-bg-subtle"
            id={image.id}
          >
            <Image
              src={image.url}
              priority={index <= 2 ? true : false}
              alt={`Product image ${index + 1}`}
              fill
              sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
              style={{
                objectFit: 'cover',
              }}
            />
          </Container>
        );
      })}
    </div>
  );
};

export default ImageGallery;
