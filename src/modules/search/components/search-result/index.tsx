import { useDictionary } from '@lib/context/dictionary-context';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import Thumbnail from '@modules/products/components/thumbnail';
import React from 'react';
import { ProductPreviewType } from 'types/global';

type SearchResultProps = {
  product: ProductPreviewType;
};

function SearchResult({ product }: SearchResultProps) {
  const dictionary = useDictionary();

  return (
    <div className="px-4 grid gap-y-4 py-2 hover:bg-slate-50 hover:rounded-2xl">
      <LocalizedClientLink
        key={product.id}
        href={`/products/${product.handle}`}
      >
        <div className="grid grid-cols-[72px_1fr] rounded-md">
          <Thumbnail thumbnail={product.thumbnail} size="square" />
          <div className="flex flex-row whitespace-nowrap items-center text-md mx-4 justify-between">
            <div className="max-w-[240px] overflow-hidden">{product.title}</div>
            {!product.price ? (
              <div className="text-price-sale">
                {dictionary.product.outOfStock}
              </div>
            ) : (
              <div className="flex gap-3">
                {product.price?.price_type === 'sale' ? (
                  <>
                    <div className="text-price-sale">
                      {product.price?.calculated_price}
                    </div>
                    <div className="line-through">
                      {product.price?.original_price}
                    </div>
                  </>
                ) : (
                  <div>{product.price?.original_price}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </LocalizedClientLink>
    </div>
  );
}

export default SearchResult;
