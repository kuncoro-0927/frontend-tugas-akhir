import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchButton = ({ onClick, variant = "desktop" }) => {
  const isDesktop = variant === "desktop";

  return (
    <button
      onClick={onClick}
      className={
        isDesktop
          ? "mr-3 flex items-center gap-2 border w-80 rounded-full hover:bg-gray-200/15 px-4 py-2"
          : "flex items-center border w-52 rounded-full hover:bg-gray-200/15 px-4 py-2"
      }
    >
      <CiSearch className={isDesktop ? "text-2xl font-bold" : "text-2xl mr-2 font-bold"} />
      <span className={isDesktop ? "text-sm" : "text-xs"}>Belanja sekarang...</span>
    </button>
  );
};

export default SearchButton;
