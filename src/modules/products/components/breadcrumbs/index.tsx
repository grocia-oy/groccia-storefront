import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import React from 'react';

interface BreadcrumbsProps {
  product: PricedProduct;
  dictionary: any;
}

function Breadcrumbs({ product, dictionary }: BreadcrumbsProps) {
  return (
    <div className="breadcrumbs text-sm">
      <ul>
        <li>
          <LocalizedClientLink href="/">
            {dictionary.common.home}
          </LocalizedClientLink>
        </li>
        <li>
          <LocalizedClientLink
            href={`/collections/${product.collection?.handle}`}
          >
            {product.collection?.title}
          </LocalizedClientLink>
        </li>
        <li>
          <LocalizedClientLink href={`/products/${product.handle}`}>
            {product.title}
          </LocalizedClientLink>
        </li>
      </ul>
    </div>
  );
}

export default Breadcrumbs;
