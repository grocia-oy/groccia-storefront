'use client';

import { useDictionary } from '@lib/context/dictionary-context';
import React, { useState, FormEvent, useEffect, Fragment } from 'react';
import { ProductPreviewType } from 'types/global';
import { getProductsList } from '@lib/data/ecommerce';
import SearchResult from '../search-result';
import { Transition } from '@headlessui/react';
import { useDebounce } from '@lib/hooks/use-debounce';

const SearchBar = () => {
  const dictionary = useDictionary();

  const DEBOUNCE_DELAY = 1000;

  const [searchDropdownOpen, setSearchDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<ProductPreviewType[]>([]);
  const debouncedSearch = useDebounce(searchTerm, DEBOUNCE_DELAY);

  const open = () => setSearchDropdownOpen(true);
  const close = () => setSearchDropdownOpen(false);

  const MAX_SEARCH_RESULTS = 6;

  useEffect(() => {
    const search = async () => {
      const { response } = await getProductsList({
        locale: 'fin',
        queryParams: {
          q: searchTerm,
          limit: MAX_SEARCH_RESULTS,
          is_giftcard: false,
        },
      });
      setSearchResults(response.products);
    };

    search();
  }, [debouncedSearch]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="relative flex">
        <input
          type="search"
          data-ms-editor
          spellCheck={false}
          placeholder={dictionary.searchTool.searchPlaceholder}
          className="w-full pl-4 pr-20 py-3 rounded-2xl text-sm bg-input placeholder:text-input-placeholder text-input-foreground focus:outline-none focus:border-none focus:ring-0 appearance-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={open}
          onBlur={close}
        />
        <div className="absolute right-0 h-full">
          <button
            type="submit"
            className="h-full px-5 bg-primary text-sm font-bold text-primary-foreground rounded-2xl"
          >
            {dictionary.searchTool.search}
          </button>
        </div>
      </form>
      <Transition
        show={searchDropdownOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="absolute w-full rounded-2xl bg-neutral">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <SearchResult key={product.id} product={product} />
            ))
          ) : (
            <div className="px-4 py-2">
              {dictionary.searchTool.searchNoResults}
            </div>
          )}
        </div>
      </Transition>
    </div>
  );
};

export default SearchBar;
