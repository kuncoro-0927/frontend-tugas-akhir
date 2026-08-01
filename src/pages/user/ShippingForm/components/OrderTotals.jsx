import React from "react";

const OrderTotals = ({ orderDetails, promo }) => {
  return (
    <div className="w-full pt-3 text-sm h-fit">
      <div>
        <div className="flex justify-between">
          <p className="text-sm">Subtotal</p>
          <span>
            {orderDetails && orderDetails.subtotal != null
              ? `IDR ${Number(orderDetails.subtotal).toLocaleString("id-ID", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`
              : "Loading..."}
          </span>
        </div>

        <div className="flex mt-2 justify-between">
          <p>Biaya admin</p>
          <span>
            {orderDetails?.admin_fee != null
              ? `IDR ${Number(orderDetails.admin_fee).toLocaleString("id-ID", {
                  minimumFractionDigits: 2,
                })}`
              : "Loading..."}
          </span>
        </div>

        {promo && (
          <p className="text-green-600 flex items-center justify-between text-sm mt-1">
            <span>
              Promo <strong>{promo.code}</strong>
            </span>
            <strong>
              - IDR{" "}
              {Number(promo.discount).toLocaleString("id-ID", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </strong>
          </p>
        )}

        <div className="border-b hidden md:block mt-5"></div>

        <div className="flex mt-5 justify-between font-semibold text-lg">
          <p>Total</p>
          <span>
            IDR{" "}
            {promo
              ? Number(promo.total_after_discount).toLocaleString("id-ID", {
                  minimumFractionDigits: 2,
                })
              : orderDetails?.total_amount != null
              ? Number(orderDetails.total_amount).toLocaleString("id-ID", {
                  minimumFractionDigits: 2,
                })
              : "Loading..."}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderTotals;
