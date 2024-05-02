import { Region } from '@medusajs/medusa';
import React, { Suspense } from 'react';

import ProductActions from '@modules/products/components/product-actions';
import ProductInfo from '@modules/products/templates/product-info';
import { notFound } from 'next/navigation';
import ProductActionsWrapper from './product-actions-wrapper';
import ProductTags from '../components/product-tags';
import Breadcrumbs from '../components/breadcrumbs';
import { ExpandedPricedProduct } from 'types/medusa';
import { getDictionary } from 'app/[lang]/dictionaries';
import ProductDisplay from './product-display';

type ProductTemplateProps = {
  product: ExpandedPricedProduct;
  region: Region;
  lang: string;
};

const ProductTemplate: React.FC<ProductTemplateProps> = async ({
  product,
  region,
  lang,
}) => {
  const dictionary = await getDictionary(lang);

  if (!product || !product.id) {
    return notFound();
  }

  return (
    <div className="content-container py-6 flex flex-col">
      <Breadcrumbs product={product} dictionary={dictionary} />
      <div className="flex flex-col py-6 lg:flex-row">
        <div className="mb-2 flex h-52 w-full lg:mb-0 lg:h-96 lg:w-3/5">
          <ProductDisplay product={product} />
        </div>
        <div className="flex flex-col lg:mx-4 lg:w-2/5">
          <div className="flex flex-col">
            <ProductInfo product={product} dictionary={dictionary} />
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
    </div>
  );
};
export default ProductTemplate;
