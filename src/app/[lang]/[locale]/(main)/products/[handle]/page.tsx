import {
  getProductByHandle,
  retrievePricedProductById,
} from '@lib/data/ecommerce';
import { Region } from '@medusajs/medusa';
import ProductTemplate from '@modules/products/templates';
import { getRegion } from 'app/actions';
import { notFound } from 'next/navigation';
import { ExpandedPricedProduct } from 'types/medusa';

async function getPricedProductByHandle(handle: string, region: Region) {
  const { product } = await getProductByHandle(handle).then(
    (product) => product
  );

  if (!product || !product.id) {
    return null;
  }

  const pricedProduct = await retrievePricedProductById({
    id: product.id,
    regionId: region.id,
  });

  return pricedProduct as ExpandedPricedProduct;
}

export default async function ProductPage({
  params: { locale, lang, handle },
}: {
  params: { locale: string; lang: string; handle: string };
}) {
  const region = await getRegion(locale);

  if (!region) {
    return notFound();
  }

  const pricedProduct = await getPricedProductByHandle(handle, region);

  if (!pricedProduct) {
    notFound();
  }

  return (
    <ProductTemplate product={pricedProduct} region={region} lang={lang} />
  );
}
