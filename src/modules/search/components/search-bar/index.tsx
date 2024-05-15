'use client';

import { useDictionary } from '@lib/context/dictionary-context';
import { FormEvent, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

type SearchBarProps = {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  openDropdown?: () => void;
  closeDropdown?: () => void;
  closeSidebar?: () => void;
};

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  openDropdown = () => {},
  closeDropdown = () => {},
  closeSidebar = () => {},
}: SearchBarProps) => {
  const dictionary = useDictionary();

  const router = useRouter();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchTerm) return;
    router.push(`/results/${searchTerm}`);
    closeSidebar();
    closeDropdown();
  };

  return (
    <form onSubmit={handleSearch} className="relative flex">
      <input
        type="search"
        data-ms-editor
        spellCheck={false}
        placeholder={dictionary.searchTool.searchPlaceholder}
        className="w-full pl-4 pr-20 py-3 rounded-2xl text-sm bg-input placeholder:text-input-placeholder text-input-foreground focus:outline-none focus:border-none focus:ring-0 appearance-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={openDropdown}
        onBlur={closeDropdown}
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
  );
};

export default SearchBar;
