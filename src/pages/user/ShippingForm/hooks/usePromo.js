import { useState } from "react";
import { instance } from "../../../../utils/axios";

export default function usePromo(orderDetails) {
  const [promo, setPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  const applyPromo = async (promoCode) => {
    if (!promoCode) {
      return { error: "Silakan masukkan kode promo" };
    }

    try {
      const response = await instance.post("/promo/check", {
        code: promoCode,
        total: orderDetails?.total_amount,
      });
      setPromo(response.data); // { valid, code, discount, total_after_discount }
      setPromoError("");
      return { error: "" };
    } catch (error) {
      setPromo(null);
      const message = error.response?.data?.error || "Kode promo tidak valid";
      setPromoError(message);
      return { error: "" }; // error promo ditampilkan lewat promoError, bukan formErrors
    }
  };

  return { promo, promoError, applyPromo };
}
