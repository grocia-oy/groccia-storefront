import { ProductPreviewType } from 'types/global';

import { retrievePricedProductById } from '@lib/data/ecommerce';
import { getProductPrice } from '@lib/util/get-product-price';
import { Region } from '@medusajs/medusa';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import Thumbnail from '../thumbnail';
import PreviewPrice from './price';
import AddToCartButton from '../add-to-cart-button';
import { getDictionary } from 'app/[lang]/dictionaries';

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
  countryCode,
  lang,
}: {
  productPreview: ProductPreviewType;
  isFeatured?: boolean;
  region: Region;
  countryCode: string;
  lang: string;
}) {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product);

  const dict = await getDictionary(lang).catch(() => {});

  if (!pricedProduct) {
    return null;
  }

  const variant = pricedProduct.variants?.[0];
  const inStock = variant && !variant.inventory_quantity ? false : true;

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  });

  return (
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group"
    >
      <div className="rounded-lg relative z-10">
        <Thumbnail
          thumbnail={productPreview.thumbnail}
          size="square"
          isFeatured={isFeatured}
        />
        <div className="mt-4 flex flex-col justify-between">
          <h3 className="text-base font-raleway">{productPreview.title}</h3>
          <div className="flex items-center gap-x-3 mt-1">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
        <AddToCartButton
          variant={variant}
          countryCode={locale}
          inStock={inStock}
        />
      </div>
    </LocalizedClientLink>
  );
}
