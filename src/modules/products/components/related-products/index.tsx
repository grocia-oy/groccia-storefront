import { StoreGetProductsParams } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

import { getProductsList } from '@lib/data/ecommerce';

import { getRegion } from 'app/actions';
import ProductPreview from '@modules/products/components/product-preview';
import { getDictionary } from 'app/[lang]/dictionaries';

type RelatedProductsProps = {
  product: PricedProduct;
  locale: string;
  lang: string;
};

export default async function RelatedProducts({
  product,
  locale,
  lang,
}: RelatedProductsProps) {
  const dictionary = await getDictionary(lang);

  const region = await getRegion(locale);

  if (!region) {
    return null;
  }

  // edit this function to define your related products logic
  const setQueryParams = (): StoreGetProductsParams => {
    const params: StoreGetProductsParams = {};

    // Find products with the same region
    if (region?.id) {
      params.region_id = region.id;
    }

    // Find products with the same currency
    if (region?.currency_code) {
      params.currency_code = region.currency_code;
    }

    // Find products with the same collection
    if (product.collection_id) {
      params.collection_id = [product.collection_id];
    }

    // Find products with the related tags
    if (product.tags) {
      params.tags = product.tags.map((t) => t.value);
    }

    params.is_giftcard = false;

    return params;
  };

  const queryParams = setQueryParams();

  const productPreviews = await getProductsList({
    queryParams,
    locale,
  }).then(({ response }) =>
    response.products.filter(
      (productPreview) => productPreview.id !== product.id
    )
  );

  if (!productPreviews.length) {
    return null;
  }

  return (
    <>
      <div className="flex flex-col items-center text-center mb-16">
        <span className="text-gray-600 mb-6">
          {dictionary.product.relatedProductsTitle}
        </span>
        <p className="max-w-lg">
          {dictionary.product.relatedProductsDescription}
        </p>
      </div>

      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-8">
        {productPreviews.map((productPreview) => (
          <li key={productPreview.id}>
            <ProductPreview
              region={region}
              productPreview={productPreview}
              locale={locale}
              lang={lang}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
