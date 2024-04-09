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
    <div className="relative mb-2 flex w-full lg:mb-0 lg:h-96 lg:w-3/5">
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
