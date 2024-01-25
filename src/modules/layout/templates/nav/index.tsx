import { headers } from "next/headers"
import { Suspense } from "react"

import { listRegions } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import SearchBar from "@modules/search/components/searchbar"

export default async function Nav() {
  return (
    <div className="sticky top-0 inset-x-0 z-50">
      <header className="relative h-20 bg-white border-b">
        <nav className="content-container flex items-center justify-between h-full">
          <div className="flex-1 basis-0 h-full flex items-center">
            <LocalizedClientLink href="/" className="uppercase text-3xl font-gotag font-semibold text-primary">
              Groccia
            </LocalizedClientLink>
          </div>
          <div className="flex items-center h-full flex-grow">
            <SearchBar />
          </div>
          <div className="flex items-center flex-1 basis-0 justify-end">
            Cart
          </div>
        </nav>
      </header>
    </div>
  )
}
