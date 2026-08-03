import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../utils/axios";
import { showSnackbar } from "../../ui/CustomSnackbar";

export function useCheckout({ cartItems, onSuccess }) {
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      showSnackbar("Keranjang kosong.", "warning");
      return;
    }

    setLoadingCheckout(true);

    const itemsToSend = cartItems.map((item) =>
      item.is_custom
        ? {
            id: item.id,
            product_id: item.product_id,
            product_name: item.product_name,
            quantity: item.quantity,
            custom_image: item.custom_image_url || item.custom_image || null,
            custom_width: Number(item.custom_width) || null,
            custom_height: Number(item.custom_height) || null,
            custom_notes: item.custom_notes || item.notes || null,
            custom_price: Number(item.custom_price),
            is_custom: 1,
          }
        : {
            product_id: item.product_id,
            product_name: item.product_name,
            quantity: item.quantity,
            price: Number(item.price),
            total: Number(item.total),
            weight_gram: Number(item.weight_gram) || 0,
            width: Number(item.width) || null,
            height: Number(item.height) || null,
            is_custom: 0,
          },
    );

    try {
      const res = await instance.post("/checkout", { items: itemsToSend });
      onSuccess();
      navigate(`/shipping/form/${res.data.order_id}`);
    } catch (err) {
      console.error("Gagal melanjutkan pembayaran:", err);
      const errorMsg =
        err?.response?.data?.msg || "Terjadi kesalahan saat melanjutkan pembayaran.";
      showSnackbar(errorMsg, "error");
    } finally {
      setLoadingCheckout(false);
    }
  };

  return { loadingCheckout, handleCheckout };
}