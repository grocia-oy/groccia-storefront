import { Region } from '@medusajs/medusa';
import CarouselSlide from '@modules/common/components/carousel/carousel-slide';

import InteractiveLink from '@modules/common/components/interactive-link';
import ProductPreview from '@modules/products/components/product-preview';
import { ProductCollectionWithPreviews } from 'types/global';

export default async function ProductRail({
  title,
  collection,
  region,
  lang,
  locale,
}: {
  title: string;
  collection: ProductCollectionWithPreviews;
  region: Region;
  lang: string;
  locale: string;
}) {
  if (!collection) {
    return null;
  }

  const { products } = collection;

  if (!products) {
    return null;
  }

  return (
    <div className="content-container mt-6">
      <div className="flex justify-between mb-4 ">
        <h2 className="font-raleway font-bold text-xl text-primary-default">
          {title}
        </h2>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
        </InteractiveLink>
      </div>

      <CarouselSlide chevronNavigation>
        {products &&
          products.map((product) => (
            <div
              key={product.id}
              className="flex-carousel-slide sm:flex-carousel-slide-sm lg:flex-carousel-slide-lg xl:flex-carousel-slide-xl min-w-0"
            >
              <ProductPreview
                productPreview={product}
                region={region}
                isFeatured
                locale={locale}
              />
            </div>
          ))}
      </CarouselSlide>
    </div>
  );
}
