import React from "react";
import OrderItemRow from "./OrderItemRow";
import PromoInput from "./PromoInput";
import OrderTotals from "./OrderTotals";

const OrderSummary = ({
  orderItems,
  orderDetails,
  formData,
  formErrors,
  onChange,
  onApplyPromo,
  promo,
  promoError,
}) => {
  return (
    <div className="space-y-3 mt-10 lg:sticky lg:top-28 lg:self-start lg:max-w-[380px] w-full">
      <h1 className="text-xl font-bold mb-5">Ringkasan Pesanan</h1>

      {orderItems.map((item, index) => (
        <OrderItemRow
          key={item.product_id}
          item={item}
          isLast={index === orderItems.length - 1}
        />
      ))}

      <PromoInput
        value={formData.promoCode}
        onChange={onChange}
        error={!!formErrors.promoCode}
        helperText={formErrors.promoCode}
        onApply={onApplyPromo}
        promoError={promoError}
      />

      <OrderTotals orderDetails={orderDetails} promo={promo} />
    </div>
  );
};

export default OrderSummary;
