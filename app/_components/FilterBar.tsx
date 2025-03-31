import React from "react";
import Image from "next/image";
import drop from "../../public/dropblack.svg";

const FilterBar = () => {
  const selectStyle =
    "border border-gray-300 rounded-md px-3 pr-8 py-2 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#00B207]";

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-lg mx-4 sm:mx-[10%] mt-5">
      {/* Left Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <select className={selectStyle}>
            <option>Select Category</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Accessories</option>
          </select>
          <Image
            src={drop}
            alt="dropdown"
            width="12"
            height="12"
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        <div className="relative">
          <select className={selectStyle}>
            <option>Select Price</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
          <Image
            src={drop}
            alt="dropdown"
            width="12"
            height="12"
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        <div className="relative">
          <select className={selectStyle}>
            <option>Select Rating</option>
            <option>5 Stars</option>
            <option>4 Stars & above</option>
            <option>3 Stars & above</option>
          </select>
          <Image
            src={drop}
            alt="dropdown"
            width="12"
            height="12"
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>

      {/* Right Sort & Show */}
      <div className="flex flex-wrap gap-3">
        <div className="relative">
          <select className={selectStyle}>
            <option>Sort by: Latest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
          <Image
            src={drop}
            alt="dropdown"
            width="12"
            height="12"
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>

        <div className="relative">
          <select className={selectStyle}>
            <option>Show: 16</option>
            <option>Show: 32</option>
            <option>Show: 48</option>
          </select>
          <Image
            src={drop}
            alt="dropdown"
            width="12"
            height="12"
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
