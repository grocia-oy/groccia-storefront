'use client';

import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { Container } from '@medusajs/ui';
import ImageGallery from '@modules/products/components/image-gallery';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useState } from 'react';

type ProductDisplayWrapperProps = {
  product: PricedProduct;
};

const ProductDisplayWrapper = ({ product }: ProductDisplayWrapperProps) => {
  if (product.images?.length === 0) {
    return notFound();
  }

  const [displayedImageIndex, setDisplayedImageIndex] = useState(0);

  return (
    <div className="relative flex w-full 2xsmall:mb-2 small:mb-0 small:h-96 small:w-3/5">
      <ImageGallery
        images={product?.images || []}
        setDisplayedImageIndex={setDisplayedImageIndex}
      />
      <Container className="relative overflow-hidden">
        {product?.images && (
          <Image
            src={product.images[displayedImageIndex].url}
            className="relative bg-ui-bg-subtle"
            fill
            alt="Image"
            style={{
              objectFit: 'contain',
            }}
          />
        )}
      </Container>
    </div>
  );
};

export default ProductDisplayWrapper;
