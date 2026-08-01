export const formatDiscountType = (discountType) => {
  if (discountType === "fixed") return "IDR (Potongan Tetap)";
  if (discountType === "percentage") return "% (Diskon Persen)";
  return "Tidak diketahui";
};

export const formatDiscountValue = (promo) => {
  if (!promo.discount_value) return "Tidak ada data";

  if (promo.discount_type === "percentage") {
    const maxDiscount = promo.max_discount
      ? ` (max IDR ${promo.max_discount.toLocaleString("id-ID")})`
      : "";
    return `${promo.discount_value}%${maxDiscount}`;
  }

  return `IDR ${promo.discount_value.toLocaleString("id-ID")}`;
};

export const formatExpiryDate = (expiryDate) => {
  if (!expiryDate) return "Tidak ada data";
  return new Date(expiryDate).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const isPromoActive = (isActive) => isActive === 1;
