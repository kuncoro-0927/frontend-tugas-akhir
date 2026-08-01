import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { instance } from "../../../../utils/axios";
import { setCheckoutItems } from "../../../../redux/checkoutSlice";

const ORIGIN_CITY_ID = 40561; // Pacitan
const COURIER = "jne";

const INITIAL_FORM = {
  firstName: "",
  lastname: "",
  phone: "",
  address: "",
  province: "",
  promoCode: "",
  city: "",
  postalCode: "",
  note: "",
};

/**
 * Mengelola state form alamat pengiriman, validasi, perhitungan ongkir,
 * lalu mendorong data ke redux (checkoutSlice) dan pindah ke halaman
 * pembayaran.
 */
export default function useShippingForm({
  orderId,
  orderDetails,
  orderItems,
  totalWeight,
  promo,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [loadingOngkir, setLoadingOngkir] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setPhone = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const validate = () => {
    const errors = {};

    if (!formData.firstName) errors.firstName = "Nama depan wajib diisi";
    if (!formData.lastname) errors.lastname = "Nama belakang wajib diisi";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) errors.email = "Email wajib diisi";
    else if (!emailRegex.test(formData.email))
      errors.email = "Email tidak valid";

    if (!formData.phone) errors.phone = "Nomor telepon wajib diisi";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    if (!formData.city_id) {
      alert("Pilih kota tujuan terlebih dahulu!");
      return;
    }

    setLoadingOngkir(true);

    try {
      const response = await instance.post("/calculate-shipping", {
        origin: ORIGIN_CITY_ID,
        destination: parseInt(formData.city_id),
        weight: totalWeight,
        courier: COURIER,
      });

      const shippingOptions = response.data.data;

      if (!shippingOptions || shippingOptions.length === 0) {
        alert("Tidak ada layanan pengiriman yang tersedia.");
        return;
      }

      dispatch(
        setCheckoutItems({
          admin_fee: orderDetails.admin_fee,
          orderDetails: orderDetails,
          items: orderItems,
          formData: formData,
          promo: promo,
          shippingOptions: shippingOptions,
        })
      );

      navigate(`/checkouts/payment/${orderId}`);
    } catch (err) {
      console.error("Gagal menghitung ongkir:", err);
      alert("Gagal menghitung ongkir. Silakan coba lagi.");
    } finally {
      setLoadingOngkir(false);
    }
  };

  return {
    formData,
    setFormData,
    formErrors,
    setFormErrors,
    loadingOngkir,
    handleChange,
    setPhone,
    handleSubmit,
  };
}
