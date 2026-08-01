import React from "react";
import { BiLayerPlus } from "react-icons/bi";

const CategoriesHeader = ({ onCreateClick }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-extrabold">Data Kategori</h1>
      <button
        onClick={onCreateClick}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-600/80 duration-200 rounded-md text-white px-4 py-2 font-normal text-base"
      >
        <BiLayerPlus className="text-lg" />
        Tambah
      </button>
    </div>
  );
};

export default CategoriesHeader;
