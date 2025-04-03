"use client";

import React from "react";
import Image from "next/image";
import drop from "../../public/dropblack.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const FilterBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", filter);
    router.replace(`${pathname}?${params.toString()}`, {scroll: false});
  };

  const selectStyle =
    "border border-gray-300 rounded-md px-3 pr-8 py-2 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-[#00B207]";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-lg mx-4 sm:mx-[10%] mt-5">
      {/* Left Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <select 
            className={selectStyle}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option  value="">Select Category</option>
            <option value="all">All</option>
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
          </select>
          <Image
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            src={drop}
            alt="dropdown"
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none w-auto h-auto"
          />
        </div>

        <div className="relative">
          <select className={selectStyle}>
            <option value="">Select Price</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
          <Image
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            src={drop}
            alt="dropdown"
            width={12}
            height={12}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        <div className="relative">
          <select className={selectStyle}>
            <option value="">Select Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars & above</option>
            <option value="3">3 Stars & above</option>
          </select>
          <Image
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            src={drop}
            alt="dropdown"
            width={12}
            height={12}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>

      {/* Right Sort & Show */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <select className={selectStyle}>
            <option value="latest">Sort by: Latest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
          <Image
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            src={drop}
            alt="dropdown"
            width={12}
            height={12}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        <div className="relative">
          <select className={selectStyle}>
            <option value="16">Show: 16</option>
            <option value="32">Show: 32</option>
            <option value="48">Show: 48</option>
          </select>
          <Image
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            src={drop}
            alt="dropdown"
            width={12}
            height={12}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};



export default FilterBar;