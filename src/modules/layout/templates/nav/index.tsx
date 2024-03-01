"use client"
import { Suspense, useRef } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SearchBar from "@modules/search/components/searchbar"
import { ShoppingBagIcon } from "@heroicons/react/24/outline"

export default function Nav() {
  const postalCodeModalRef = useRef<HTMLDialogElement>(null)

  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="relative h-20 bg-white border-b">
        <nav className="content-container flex items-center justify-between h-full">
          <div className="flex-1 basis-0 h-full flex items-center">
            <LocalizedClientLink
              href="/"
              className="uppercase text-3xl font-gotag font-semibold text-primary"
            >
              Groccia
            </LocalizedClientLink>
          </div>
          <div className="flex items-center h-full flex-grow">
            <SearchBar />
          </div>
          <div className="flex flex-1 basis-0 justify-end">
            <div className="flex items-center space-x-5 font-poppins">
              <button>Login / Sign up</button>
              <Suspense>
                <button>
                  <ShoppingBagIcon className="w-6 h-6" />
                </button>
              </Suspense>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
