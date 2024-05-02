'use client';

import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { Container } from '@medusajs/ui';
import ImageGallery from '@modules/products/components/image-gallery';
import Image from 'next/image';
import { useState } from 'react';

type ProductDisplayProps = {
  product: PricedProduct;
};

const ProductDisplay = ({ product }: ProductDisplayProps) => {
  const [displayedImageIndex, setDisplayedImageIndex] = useState(0);

  return (
    <>
      <ImageGallery
        images={product?.images || []}
        setDisplayedImageIndex={setDisplayedImageIndex}
      />
      <Container className="relative overflow-hidden">
        {product?.images && (
          <Image
            src={
              product.images[displayedImageIndex]?.url || '/images/fallback.png'
            }
            className="relative bg-ui-bg-subtle object-contain"
            fill
            alt="Fallback image"
          />
        )}
      </Container>
    </>
  );
};

export default ProductDisplay;
