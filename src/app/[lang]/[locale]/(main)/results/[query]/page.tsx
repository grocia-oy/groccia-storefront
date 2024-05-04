import SearchResultsTemplate from '@modules/search/templates/search-results-template';

import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import { getProductsList } from '@lib/data/ecommerce';

type SearchResultsPageProps = {
  params: { lang: string; locale: string; query: string };
  searchParams: {
    sortBy?: SortOptions;
    page?: string;
  };
};

export default async function SearchResultsPage({
  params,
  searchParams,
}: SearchResultsPageProps) {
  const { lang, locale, query } = params;
  const { sortBy, page } = searchParams;

  const MAX_SEARCH_RESULTS = 100;

  const { response, nextPage, queryParams } = await getProductsList({
    queryParams: { q: query, is_giftcard: false, limit: MAX_SEARCH_RESULTS },
    locale,
  });

  const productIds = response.products.map((product) => product.id);
  console.log(productIds.length);

  return (
    <SearchResultsTemplate
      query={query}
      productIds={productIds}
      sortBy={sortBy}
      page={page}
      lang={lang}
      locale={locale}
    />
  );
}
