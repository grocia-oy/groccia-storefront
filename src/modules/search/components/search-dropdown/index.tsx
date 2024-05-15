import { Transition } from '@headlessui/react';
import { useDictionary } from '@lib/context/dictionary-context';
import { Fragment } from 'react';
import { ProductPreviewType } from 'types/global';
import SearchResult from '../search-result';

type SearchDropdownProps = {
  open: boolean;
  searchResults: ProductPreviewType[];
};

function SearchDropdown({ open, searchResults }: SearchDropdownProps) {
  const dictionary = useDictionary();

  return (
    <Transition
      show={open}
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
  );
}

export default SearchDropdown;
