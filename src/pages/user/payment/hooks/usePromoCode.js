import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearPromo } from "../../../../redux/checkoutSlice";
import { instance } from "../../../../utils/axios";

export function usePromoCode({ finalTotal }) {
  const dispatch = useDispatch();
  const [promocode, setPromocode] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [promoCodeInput, setPromoCodeInput] = useState("");

  const handleApplyPromo = async () => {
    try {
      const response = await instance.post("/promo/check", {
        code: promoCodeInput,
        total: finalTotal,
      });
      setPromocode(response.data);
      setPromoError("");
    } catch (error) {
      setPromoError(error.response?.data?.error || "Kode promo tidak valid");
    }
  };

  const handleCancelPromo = () => {
    dispatch(clearPromo(null));
    setPromocode(null);
    setPromoCodeInput("");
    setPromoError("");
  };

  return {
    promocode,
    promoError,
    promoCodeInput,
    setPromoCodeInput,
    handleApplyPromo,
    handleCancelPromo,
  };
}