import { Suspense } from 'react';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import SearchBar from '@modules/search/components/searchbar';
import PostcodeButtonModal from '@modules/layout/components/postcode-button-modal';

import CartButton from '@modules/layout/components/cart-button';
import LoginButtonModal from '@modules/layout/components/login-button-modal';
import Sidebar from '../sidebar';

type Props = {
  lang: string;
};

export default function Nav({ lang }: Props) {
  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="relative h-20 bg-background">
        <nav className="content-container flex items-center justify-between h-full space-x-6">
          <div className="flex-1 lg:hidden">
            <Sidebar />
          </div>
          <div className="lg:flex-1 basis-0 h-full flex items-center">
            <LocalizedClientLink
              href="/"
              className="uppercase text-3xl font-gotag font-semibold text-primary"
            >
              Groccia
            </LocalizedClientLink>
          </div>
          <div className="hidden lg:flex items-center h-full flex-grow font-raleway">
            <SearchBar />
          </div>
          <div className="flex flex-1 basis-0 justify-end">
            <div className="flex items-center space-x-10 font-raleway">
              <PostcodeButtonModal />
              <LoginButtonModal />
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base flex gap-2"
                    href="/cart"
                  ></LocalizedClientLink>
                }
              >
                <CartButton lang={lang} />
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
