'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@modules/common/components/ui/dropdown-menu';
import ChevronDown from '@modules/common/icons/chevron-down';
import { useRouter } from 'next/navigation';
import React from 'react';
import { StrapiNestedLinkComponent } from 'types/strapi';

type Props = { menu: StrapiNestedLinkComponent };

const FlyoutDropdown = ({ menu }: Props) => {
  const router = useRouter();

  const handleSelect = (url: string) => {
    router.push(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center py-2">
        <span className="text-lg">{menu?.title}</span>
        <ChevronDown className="ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="space-y-2 rounded-sm px-1" align="start">
        {menu?.child?.map((item) => (
          <DropdownMenuItem
            key={item.url}
            onSelect={() => handleSelect(item.url)}
            className="mt-2 py-2 font-raleway text-lg"
          >
            {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FlyoutDropdown;
