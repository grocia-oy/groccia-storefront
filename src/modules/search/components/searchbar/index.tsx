'use client';
import React, { useState, FormEvent } from 'react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSearch} className="w-full flex items-center relative">
      <input
        type="search"
        data-ms-editor
        spellCheck={false}
        placeholder="Search products..."
        className="w-full pl-3 pr-20 py-3 rounded-2xl text-sm bg-neutral placeholder:text-input-placeholder focus:outline-none focus:border-none focus:ring-0 appearance-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute right-0 h-full">
        <button type='submit' className="h-full px-3 bg-primary-700 text-sm text-white rounded-2xl">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
