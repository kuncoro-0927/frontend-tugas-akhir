import React from "react";

const ActionButtons = ({
  product,
  onOrder,
  isInWishlist,
  onToggleWishlist,
}) => {
  const isSoldOut = product?.stock === 0;

  return (
    <div className="flex mt-10 items-center gap-3">
      <button
        onClick={onOrder}
        disabled={isSoldOut}
        className={`w-full rounded-lg py-2  ${
          isSoldOut
            ? "bg-gray-200 text-gray-500 opacity-50 cursor-not-allowed"
            : "bg-black text-white hover:bg-black/85 transition"
        }`}
      >
        {isSoldOut ? "Sudah terjual" : "Pesan"}
      </button>

      {product && (
        <button
          className={`w-full border border-gray-400 py-2 rounded-lg ${
            isInWishlist
              ? "text-black/50 cursor-not-allowed "
              : "hover:bg-gray-100"
          }`}
          disabled={isInWishlist}
          onClick={onToggleWishlist}
        >
          {isInWishlist ? "Sudah ditambahkan" : "Tambah ke favorit"}
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
