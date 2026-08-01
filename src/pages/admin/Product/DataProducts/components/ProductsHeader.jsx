import React from "react";
import { LuPackagePlus } from "react-icons/lu";

const ProductsHeader = ({ onCreateClick }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-extrabold">Data Produk</h1>
      <button
        onClick={onCreateClick}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-600/80 duration-200 rounded-md text-white px-4 py-2 font-normal text-base"
      >
        <LuPackagePlus className="text-lg" />
        Tambah
      </button>
    </div>
  );
};

export default ProductsHeader;
