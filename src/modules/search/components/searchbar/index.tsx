"use client"
import React, { useState, FormEvent } from "react"

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSearch} className="w-full flex items-center relative">
      <input
        type="search"
        data-ms-editor
        spellCheck={false}
        placeholder="Search products..."
        className="w-full px-4 py-3 border rounded-2xl bg-gray-100"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute right-3">
        <button className=" h-full px-2 py-1 bg-slate-700 text-secondary rounded-lg">Search</button>
      </div>
    </form>
  )
}

export default SearchBar
