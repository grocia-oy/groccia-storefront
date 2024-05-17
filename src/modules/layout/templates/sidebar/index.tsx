'use client';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@modules/common/components/ui/drawer';
import { Separator } from '@modules/common/components/ui/separator';
import Bars4Icon from '@modules/common/icons/bars-4';
import X from '@modules/common/icons/x';
import PostcodeButtonModal from '@modules/layout/components/postcode-button-modal';
import SearchBar from '@modules/search/components/search-bar';
import { useState } from 'react';

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Drawer direction="left" open={open}>
      <DrawerTrigger asChild>
        <button onClick={() => setOpen(true)}>
          <Bars4Icon />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col h-screen">
          <div className="flex justify-between px-6 pt-6 pb-4">
            <DrawerHeader className="p-0 items-center">
              <DrawerTitle className="uppercase text-3xl font-gotag font-semibold text-primary">
                Groccia
              </DrawerTitle>
            </DrawerHeader>
            <PostcodeButtonModal className="flex" />
            <DrawerClose asChild>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </DrawerClose>
          </div>
          <Separator />
          <div className="px-6 py-4">
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              closeSidebar={() => setOpen(false)}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default Sidebar;
