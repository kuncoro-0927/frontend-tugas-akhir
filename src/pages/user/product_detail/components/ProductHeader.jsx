import React from "react";
import { GoShareAndroid } from "react-icons/go";
import Rating from "@mui/material/Rating";

const ProductHeader = ({ product, customPrice, averageRating, reviewCount }) => {
  return (
    <>
      <div className="flex mt-5 items-center justify-between">
        <div className="text-black/60 font-bold  py-1 w-fit">
          {product?.category}
        </div>
        <div className="text-sm">
          {product?.stock === 0 ? (
            <p className="bg-red-100 rounded-full px-5 py-1.5 text-red-500">
              Terjual
            </p>
          ) : (
            <p className="bg-green-100 rounded-full px-5 py-1.5 text-green-600">
              Tersedia
            </p>
          )}
        </div>
      </div>

      <div className="md:flex mt-3 items-center gap-3">
        <div className="flex items-start md:items-center gap-2">
          <h1 className="text-2xl font-extrabold max-w-[250px]">
            {product?.name}
          </h1>
          <GoShareAndroid className="md:text-xl text-2xl" />
        </div>
        <p className="text-2xl mt-2 md:mt-0 ml-auto">
          <span className="font-bold">
            IDR{" "}
            {Number(customPrice).toLocaleString("id-ID", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
          </span>
        </p>
      </div>

      <p className="flex mt-2 items-center gap-2 text-gray-700">
        <Rating
          name="read-only"
          value={averageRating}
          size="small"
          precision={0.1}
          readOnly
        />
        <span>
          {averageRating.toFixed(1)} rating & {reviewCount} ulasan
        </span>
      </p>
    </>
  );
};

export default ProductHeader;
