import { Region } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import React, { Suspense } from 'react';
import Image from 'next/image';

import ImageGallery from '@modules/products/components/image-gallery';
import ProductActions from '@modules/products/components/product-actions';
import ProductInfo from '@modules/products/templates/product-info';
import { notFound } from 'next/navigation';
import ProductActionsWrapper from './product-actions-wrapper';
import ProductTags from '../components/product-tags';
import { Container } from '@medusajs/ui';

type ProductTemplateProps = {
  product: PricedProduct;
  region: Region;
  countryCode: string;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound();
  }

  return (
    <>
      <div className="content-container flex flex-col small:flex-row small:items-start py-6 relative">
        <div className="block w-3/5 relative">
          <div className="flex relative justify-end">
            <ImageGallery images={product?.images || []} />
            <Container className="p-0 w-auto overflow-hidden">
              {product?.images && (
                <Image
                  src={product.images[0].url}
                  className="relative bg-ui-bg-subtle"
                  width={342}
                  height={342}
                  alt="Image"
                />
              )}
            </Container>
          </div>
        </div>
        <div className="w-2/5 flex flex-col relative mx-4">
          <div className="flex flex-col">
            <ProductInfo product={product} />
          </div>
          <div className="flex flex-col">
            <Suspense
              fallback={<ProductActions product={product} region={region} />}
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
          <ProductTags product={product} />
        </div>
      </div>
    </>
  );
};
export default ProductTemplate;
