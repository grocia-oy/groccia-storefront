import { Region } from '@medusajs/medusa';
import CarouselSlide from '@modules/common/components/carousel/carousel-slide';

import InteractiveLink from '@modules/common/components/interactive-link';
import ProductPreview from '@modules/products/components/product-preview';
import { getDictionary } from 'app/[lang]/dictionaries';
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
  const dictionary = await getDictionary(lang);

  if (!products) {
    return null;
  }

  return (
    <div className="content-container mt-6">
      <div className="flex justify-between mb-4 ">
        <h2 className="font-raleway font-bold text-xl text-primary">
          {title}
        </h2>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          {dictionary.productRail.viewAll}
        </InteractiveLink>
      </div>

      <CarouselSlide chevronNavigation>
        {products &&
          products.map((product) => (
            <div
              key={product.id}
              className="flex-carousel-half sm:flex-carousel-sm lg:flex-carousel-lg xl:flex-carousel-xl min-w-0"
            >
              <ProductPreview
                productPreview={product}
                region={region}
                isFeatured
                locale={locale}
                lang={lang}
              />
            </div>
          ))}
      </CarouselSlide>
    </div>
  );
}
