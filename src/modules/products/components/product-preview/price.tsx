import { Text, clx } from '@medusajs/ui';

import { PriceType } from '../product-actions';

export default async function PreviewPrice({ price }: { price: PriceType }) {
  return (
    <>
      <h4
        className={clx('text-price-default text-base', {
          'text-price-sale': price.price_type === 'sale',
        })}
      >
        {price.calculated_price}
      </h4>
      {price.price_type === 'sale' && (
        <h4 className="line-through text-price-default">{price.original_price}</h4>
      )}
    </>
  );
}
