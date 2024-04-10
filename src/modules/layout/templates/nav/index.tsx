'use client';
import { Suspense, useRef } from 'react';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import SearchBar from '@modules/search/components/searchbar';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import PostcodeButtonModal from '@modules/layout/components/postcode-button-modal';
import User from '@modules/common/icons/user';
import AnimatedHamburgerWrapper from '@modules/common/components/animated-hamburget-xmark-wrapper';

type Props = {};

export default function Nav({}: Props) {
  const postalCodeModalRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="relative h-20 bg-white border-b">
        <nav className="content-container flex items-center justify-between h-full space-x-6">
          <AnimatedHamburgerWrapper />
          <div className="lg:flex-1 basis-0 h-full flex items-center">
            <LocalizedClientLink
              href="/"
              className="uppercase text-3xl font-gotag font-semibold text-primary-default"
            >
              Groccia
            </LocalizedClientLink>
          </div>
          <div className="hidden lg:flex items-center h-full flex-grow font-raleway">
            <SearchBar />
          </div>
          <div className="flex flex-1 basis-0 justify-end">
            <div className="flex items-center space-x-10 font-raleway">
              <PostcodeButtonModal modalRef={postalCodeModalRef} />
              <button className="flex cursor-pointer items-center">
                <span className="mr-1">
                  <User className="w-5 h-5" />
                </span>
                <div className="hidden lg:block">Login</div>
              </button>
              <Suspense>
                <button>
                  <ShoppingCartIcon className="w-6 h-6" />
                </button>
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
