import { showSnackbar } from "../../../../components/CustomSnackbar";
import { instance } from "../../../../utils/axios";

export function usePayment({ orderId, formData, admin, promo, promocode, finalTotal, items }) {
  const handlePayment = async (selectedService) => {
    try {
      if (!selectedService) {
        showSnackbar("Silakan pilih layanan pengiriman terlebih dahulu.", "error");
        return;
      }

      await instance.post("/shipping/details", {
        order_id: orderId,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastname,
        phone: formData.phone,
        address: formData.address || "-",
        province: formData.province || "-",
        city: formData.city || "-",
        postal_code: formData.postalCode || "-",
        courier: selectedService.name,
        etd: selectedService.etd,
        shipping_cost: parseInt(selectedService.cost),
      });

      const response = await instance.post("/payment", {
        order_id: orderId,
        formData,
        selectedService,
        admin_fee: admin,
        promo,
        promocode,
        total_amount: finalTotal,
        shipping_cost: parseInt(selectedService.cost),
        customer: {
          firstName: formData.firstName,
          email: formData.email,
          phone: formData.phone,
          cartItems: items.map((item) => ({
            productId: item.product_id,
            productName: item.product_name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      });

      const { redirectUrl } = response.data;
      if (!redirectUrl) {
        throw new Error("Redirect URL tidak diterima dari backend.");
      }

      await instance.patch(`/order/${orderId}/status`, {
        status: "pending",
        shipping_fee: parseInt(selectedService.cost),
        total_amount: response.data.grossAmount,
      });

      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Gagal memproses pembayaran:", error);
      showSnackbar("Terjadi kesalahan. Silakan coba lagi.", "error");
    }
  };

  return { handlePayment };
}