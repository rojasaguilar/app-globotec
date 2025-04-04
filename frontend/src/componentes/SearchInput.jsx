import { Search, SearchIcon } from "lucide-react";
import React from "react";

export default function SearchInput({msjMuestra}) {
  return (
    <form >
      <label for="simple-search" class="sr-only">
        Search
      </label>
      <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <SearchIcon className="w-4 h-4 text-gray-400 " />
        </div>
        <input
          type="text"
          id="simple-search"
          class=" border text-sm rounded-lg block w-full ps-10 px-20 py-1.5  bg-gray-2  00 border-gray-100 placeholder-gray-500 text-gray-500 focus:ring-blue-500 focus:border-blue-500"
          placeholder={msjMuestra}
          required
        />
      </div>
    </form>
  );
}
