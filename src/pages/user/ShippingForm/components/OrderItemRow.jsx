import React from "react";
import CardImage from "../../../../components/Card/CardImage";

const OrderItemRow = ({ item, isLast }) => {
  return (
    <div className={`flex items-center gap-5 pb-3 ${isLast ? "" : "border-b"}`}>
      <CardImage
        image={`${import.meta.env.VITE_BACKEND_URL}${item.image_url}`}
        width="w-[76px]"
        height="h-[64px]"
        quantity={item.quantity}
      />
      <div className="lg:max-w-[380px] w-full">
        <div className="flex justify-between items-center">
          <p className="text-base font-bold ">{item.product_name}</p>
          <p className="font-semibold text-sm">
            IDR{" "}
            {Number(item.price).toLocaleString("id-ID", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
          </p>
        </div>
        <p className="text-xs">{item.size}</p>
      </div>
    </div>
  );
};

export default OrderItemRow;
