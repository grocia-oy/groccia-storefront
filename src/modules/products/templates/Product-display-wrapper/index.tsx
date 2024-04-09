'use client';

import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { Container } from '@medusajs/ui';
import ImageGallery from '@modules/products/components/image-gallery';
import Image from 'next/image';
import { useState } from 'react';

type ProductDisplayWrapperProps = {
  product: PricedProduct;
};

const ProductDisplayWrapper = ({ product }: ProductDisplayWrapperProps) => {
  const [displayedImageIndex, setDisplayedImageIndex] = useState(0);

  return (
    <>
      <div className="relative mb-2 flex h-52 w-full lg:mb-0 lg:h-96 lg:w-3/5">
        <ImageGallery
          images={product?.images || []}
          setDisplayedImageIndex={setDisplayedImageIndex}
        />
        <Container className="relative overflow-hidden">
          {product?.images && (
            <Image
              src={
                product.images[displayedImageIndex]?.url ||
                '/images/fallback.png'
              }
              className="relative bg-ui-bg-subtle object-contain"
              fill
              alt="Fallback image"
            />
          )}
        </Container>
      </div>
    </>
  );
};

export default ProductDisplayWrapper;
