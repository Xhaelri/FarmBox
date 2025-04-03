"use client";
import { useState } from "react";

interface TextExpanderProps {
    children: string;
}
const TextExpander = ({ children }: TextExpanderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayText = isExpanded
    ? children
    : children.split(" ").splice(0, 20).join(" ") + "...";
  return (
    <span>
      {displayText}
      <button
        className="bg-[#00B207] hover:bg-[#008a05] text-white py-2 md:py-3 px-4 md:px-6 rounded-full flex items-center gap-2 md:gap-3.5 text-xs md:text-sm font-medium mt-2 md:mt-4 transition-colors duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Show Less" : "Show More"}
      </button>
    </span>
  );
};

export default TextExpander;
