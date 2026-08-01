import React from "react";

const ProductInfo = ({ product }) => {
  return (
    <>
      <p className="mt-5 font-bold">Ukuran</p>
      <div className="flex gap-2 mt-3">
        <p className="rounded-md px-3 py-1 border border-gray-400 text-sm">
          {product?.width} x {product?.height}
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <p className="font-bold text-base">Deskripsi Produk</p>
        <span className="text-sm font-medium text-black/60">
          {product?.description}
        </span>
      </div>
    </>
  );
};

export default ProductInfo;
