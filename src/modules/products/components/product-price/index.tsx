import {
  PricedProduct,
  PricedVariant,
} from '@medusajs/medusa/dist/types/pricing';
import { clx } from '@medusajs/ui';

import { getProductPrice } from '@lib/util/get-product-price';
import { RegionInfo } from 'types/global';

export default function ProductPrice({
  product,
  variant,
  region,
}: {
  product: PricedProduct;
  variant?: PricedVariant;
  region: RegionInfo;
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
    region,
  });

  const selectedPrice = variant ? variantPrice : cheapestPrice;

  if (!selectedPrice) {
    return <div className="block h-9 w-32 animate-pulse bg-gray-100" />;
  }

  return (
    <div className="flex flex-col text-ui-fg-base">
      <span
        className={clx('text-poppins', {
          'text-poppins text-red-500': selectedPrice.price_type === 'sale',
        })}
      >
        {!variant && 'From '}
        {selectedPrice.calculated_price}
      </span>
      {selectedPrice.price_type === 'sale' && (
        <>
          <p>
            <span className="text-ui-fg-subtle">Original: </span>
            <span className="line-through">{selectedPrice.original_price}</span>
          </p>
          <span className="text-poppins text-red-500">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  );
}
