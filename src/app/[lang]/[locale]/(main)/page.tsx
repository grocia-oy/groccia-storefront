import { Metadata } from 'next';
import Hero from '@modules/home/components/hero';
import { getRegion } from 'app/actions';
import { getHomePageFull, getHomepageSeo } from '@lib/data/content';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import {
  getManyCollectionsByHandle,
  getProductsList,
} from '@lib/data/ecommerce';
import { Product } from '@medusajs/medusa';
import { ProductCollectionWithPreviews } from 'types/global';
import ProductRail from '@modules/home/components/featured-products/product-rail';

export async function generateMetadata({
  params: { lang },
}: {
  params: { locale: string; lang: string };
}): Promise<Metadata> {
  // read route params
  const homepage = await getHomepageSeo(lang);
  const seo = homepage?.data?.seo;

  return {
    title: seo?.metaTitle,
    keywords: seo?.keywords,
    description: seo?.metaDescription,
    robots: seo?.metaRobots,
  };
}

const getHomePageCollectionWithProducts = cache(
  async (
    collectionHandles: { collection_handle: string; title: string }[],
    locale: string
  ) => {
    const handleList = collectionHandles.map(
      ({ collection_handle }) => collection_handle
    );
    const collections = await getManyCollectionsByHandle(handleList);

    if (!collections) {
      return null;
    }

    await Promise.all(
      collections.map(({ id }) =>
        getProductsList({ queryParams: { collection_id: [id] }, locale })
      )
    ).then((responses) => {
      responses.forEach(({ response, queryParams }) => {
        let collection;

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          );
        }

        if (!collection) {
          return;
        }

        collection.products = response.products as unknown as Product[];
      });
    });

    return collections as unknown as ProductCollectionWithPreviews[];
  }
);

export default async function Home({
  params: { locale, lang },
}: {
  params: { locale: string; lang: string };
}) {
  const region = await getRegion(locale);

  if (!region) {
    return notFound();
  }

  const homepage = await getHomePageFull(lang);

  // TODO: collection handles might be null
  const collectionHandles: { collection_handle: string; title: string }[] =
    homepage.data?.product_rails || [];

  const collections = await getHomePageCollectionWithProducts(
    collectionHandles,
    locale
  );

  if (!collections) {
    return notFound();
  }

  const collectionsMap = new Map();
  collections.forEach((collection) => {
    collectionsMap.set(collection.handle, collection);
  });

  return (
    <>
      <Hero carousel={homepage?.data?.hero_carousel} />
      {collectionHandles.map((item) => {
        const collection = collectionsMap.get(item.collection_handle);
        return (
          <li className="list-none" key={collection?.id}>
            <ProductRail
              title={item.title}
              collection={collection}
              region={region}
              locale={locale}
              lang={lang}
            />
          </li>
        );
      })}
    </>
  );
}
