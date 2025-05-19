"use client"
import { Search } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
  searchParam?: string;
};

const Searchbox = ({ searchParam = "" }: Props) => {
  const [search, setSearch] = useState(searchParam);
  const [sort, setSort] = useState("");

  return (
    <div className="flex flex-row items-center  justify-center gap-2 px-2 py-2">
      
      {(search || sort) && (
        <form action="/" method="GET">
          <Button variant="destructive" type="submit" className="py-3 px-4 h-[30px] w-[30px] md:h-[50px] md:w-[50px]">
            X
          </Button>
        </form>
      )}

      <form action="/" method="GET" className="flex w-full max-w-3xl items-center gap-2">
        {/* Hidden inputs to pass values */}
        <input type="hidden" name="sort" value={sort} />

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 text-sm" />
          <Input
            name="search"
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="pl-10 pr-4 py-3 w-[100px] md:w-[400px] text-base h-[30px] md:h-[50px] "
          />
        </div>

        {search && (
          <select
            name="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-[30px] w-[100px] md:h-[50px] border rounded-md px-3 text-sm"
          >
            <option value="">Sort</option>
            <option value="price-asc">Price ↑ Low - High</option>
            <option value="price-desc">Price ↓ High - Low</option>
            <option value="rating-asc">Rating ↑ Low - High</option>
            <option value="rating-desc">Rating ↓ High - Low</option>
          </select>
        )}

        {search && <Button variant="outline" type="submit" className="py-3 px-4 h-[30px] w-[30px] md:h-[50px] md:w-[50px]">
          {sort ? <label className='text-xs text-gray-600'>Apply</label> : <Search className="h-5 w-5 text-gray-700" />}
        </Button>}
      </form>
    </div>
  );
};

export default Searchbox;
