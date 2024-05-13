'use client';

import { getProductsList } from '@lib/data/ecommerce';
import { useDebounce } from '@lib/hooks/use-debounce';
import SearchBar from '@modules/search/components/search-bar';
import SearchDropdown from '@modules/search/components/search-dropdown';
import { useEffect, useState } from 'react';
import { ProductPreviewType } from 'types/global';

type SearchWrapperProps = { locale: string };

function SearchWrapper({ locale }: SearchWrapperProps) {
  const MAX_SEARCH_RESULTS = 6;
  const DEBOUNCE_DELAY = 1000;

  const [searchDropdownOpen, setSearchDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ProductPreviewType[]>([]);
  const debouncedSearch = useDebounce(searchTerm, DEBOUNCE_DELAY);

  useEffect(() => {
    getProductsList({
      locale: locale,
      queryParams: {
        q: searchTerm,
        limit: MAX_SEARCH_RESULTS,
        is_giftcard: false,
      },
    }).then(({ response }) => setSearchResults(response.products));
  }, [debouncedSearch]);

  return (
    <div className="relative w-full">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        openDropdown={() => setSearchDropdownOpen(true)}
        closeDropdown={() => setSearchDropdownOpen(false)}
      />
      <SearchDropdown open={searchDropdownOpen} searchResults={searchResults} />
    </div>
  );
}

export default SearchWrapper;
