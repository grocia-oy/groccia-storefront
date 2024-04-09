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
    <div className="flex relative justify-end">
      <ImageGallery
        images={product?.images || []}
        setDisplayedImageIndex={setDisplayedImageIndex}
      />
      <Container className="p-0 w-[342px] h-[342px] overflow-hidden relative">
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
