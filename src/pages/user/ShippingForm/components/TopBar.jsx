import React from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../../../redux/cartDrawer";
const TopBar = () => {
  const dispatch = useDispatch();

  return (
    <div className="border-b  flex items-center justify-between mx-7 sm:mx-12 md:mx-24 lg:mx-14 2xl:mx-32 py-4">
      <Link to="/">
        <img className="w-10" src="/logoindex.svg" alt="" />
      </Link>
      <button
        onClick={() => dispatch(openDrawer())}
        className="relative   rounded-full hover:bg-gray-200/15 "
      >
        <CiShoppingCart className="text-3xl" />
      </button>
    </div>
  );
};

export default TopBar;
