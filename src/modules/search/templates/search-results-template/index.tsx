import RefinementList from '@modules/store/components/refinement-list';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import PaginatedProducts from '@modules/store/templates/paginated-products';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { getDictionary } from 'app/[lang]/dictionaries';

type SearchResultsTemplateProps = {
  query: string;
  productIds: string[];
  sortBy?: SortOptions;
  page?: string;
  lang: string;
  locale: string;
};

const SearchResultsTemplate = async ({
  query,
  productIds,
  sortBy,
  page,
  lang,
  locale,
}: SearchResultsTemplateProps) => {
  const dictionary = await getDictionary(lang);

  const pageNumber = page ? parseInt(page) : 1;

  return (
    <>
      <div className="flex justify-between border-b w-full py-6 px-8 lg:px-14 items-center">
        <div className="flex flex-col items-start">
          <div>{dictionary.searchTool.searchResultsFor}</div>
          <div>
            {decodeURI(query)} ({productIds.length})
          </div>
        </div>
        <LocalizedClientLink href="/" className="txt-medium hover:underline">
          {dictionary.searchTool.clear}
        </LocalizedClientLink>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start p-6">
        {productIds.length > 0 ? (
          <>
            <RefinementList sortBy={sortBy || 'created_at'} search />
            <div className="content-container">
              <PaginatedProducts
                productsIds={productIds}
                sortBy={sortBy}
                page={pageNumber}
                lang={lang}
                locale={locale}
              />
            </div>
          </>
        ) : (
          <div className="ml-8 lg:ml-14 mt-3">
            {dictionary.searchTool.searchNoResults}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResultsTemplate;
