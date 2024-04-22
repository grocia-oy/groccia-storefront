import { getProductsListWithSort } from '@lib/data/ecommerce';
import ProductPreview from '@modules/products/components/product-preview';
import { Pagination } from '@modules/store/components/pagination';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import { getRegion } from 'app/actions';

const PRODUCT_LIMIT = 12;

type PaginatedProductsParams = {
  limit: number;
  collection_id?: string[];
  category_id?: string[];
  id?: string[];
};

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  lang,
  locale,
}: {
  sortBy?: SortOptions;
  page: number;
  collectionId?: string;
  categoryId?: string;
  productsIds?: string[];
  lang: string;
  locale: string;
}) {
  const region = await getRegion(locale);

  if (!region) {
    return null;
  }

  const queryParams: PaginatedProductsParams = {
    limit: PRODUCT_LIMIT,
  };

  if (collectionId) {
    queryParams['collection_id'] = [collectionId];
  }

  if (categoryId) {
    queryParams['category_id'] = [categoryId];
  }

  if (productsIds) {
    queryParams['id'] = productsIds;
  }

  const {
    response: { products, count },
  } = await getProductsListWithSort({
    page,
    queryParams,
    sortBy,
    locale,
  });

  const totalPages = Math.ceil(count / PRODUCT_LIMIT);

  return (
    <>
      <ul className="grid grid-cols-2 w-full lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-8">
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview
                productPreview={p}
                region={region}
                lang={lang}
                locale={locale}
              />
            </li>
          );
        })}
      </ul>
      {totalPages > 1 && <Pagination page={page} totalPages={totalPages} />}
    </>
  );
}
