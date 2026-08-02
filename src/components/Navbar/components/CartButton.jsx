import React from "react";
import { CiShoppingCart } from "react-icons/ci";

const CartButton = ({ itemCount, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative rounded-full hover:bg-gray-200/15 px-3 py-1.5"
    >
      <CiShoppingCart className="text-2xl" />
      <span className="absolute top-1 right-1 w-4 h-4 bg-white text-black rounded-full flex items-center justify-center text-[10px]">
        {itemCount}
      </span>
    </button>
  );
};

export default CartButton;
