'use client';

import { ChangeEvent } from 'react';

import FilterRadioGroup from '@modules/common/components/filter-radio-group';
import { useDictionary } from '@lib/context/dictionary-context';

export type SortOptions = 'price_asc' | 'price_desc' | 'created_at';

type SortProductsProps = {
  sortBy: SortOptions;
  setQueryParams: (name: string, value: SortOptions) => void;
};

const getSortOptions = (dictionary: any) => [
  {
    value: 'created_at',
    label: `${dictionary.sort.latestArrivals}`,
  },
  {
    value: 'price_asc',
    label: `${dictionary.sort.priceLowToHigh}`,
  },
  {
    value: 'price_desc',
    label: `${dictionary.sort.priceHighToLow}`,
  },
];

const SortProducts = ({ sortBy, setQueryParams }: SortProductsProps) => {
  const dictionary = useDictionary();
  const sortOptions = getSortOptions(dictionary);

  const handleChange = (e: ChangeEvent<HTMLButtonElement>) => {
    const newSortBy = e.target.value as SortOptions;
    setQueryParams('sortBy', newSortBy);
  };

  return (
    <FilterRadioGroup
      title={dictionary.sort.sortBy}
      items={sortOptions}
      value={sortBy}
      handleChange={handleChange}
    />
  );
};

export default SortProducts;
