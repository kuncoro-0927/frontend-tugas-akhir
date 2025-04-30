import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setCheckoutItems } from "../redux/checkoutSlice";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { order_id } = useParams();
  const dispatch = useDispatch();

  // Mengambil data checkout dari Redux store
  const { shippingMethod, items, formData, shippingOptions, selectedService } =
    useSelector((state) => state.checkout);

  const handleServiceChange = (service) => {
    // Pastikan data dipassing ke Redux dengan benar
    dispatch(
      setCheckoutItems({
        shippingMethod,
        items,
        formData,
        shippingOptions: shippingOptions.map((option) =>
          option.service === service.service
            ? { ...option, selected: true }
            : { ...option, selected: false }
        ),
        selectedService: service, // Pilihan layanan pengiriman yang dipilih
      })
    );
  };

  const handleConfirm = () => {
    if (!selectedService) return alert("Pilih salah satu layanan pengiriman!");

    // Melanjutkan ke halaman summary setelah konfirmasi
    navigate(`/summary/${order_id}`);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold">Pembayaran</h1>

      <div>
        <div className="p-4">
          <h2 className="text-xl font-medium mb-2">Detail Order</h2>
          <p>
            <strong>Nama:</strong> {formData?.firstName}
          </p>
          <p>
            <strong>Alamat:</strong> {formData?.address}
          </p>
          <p>
            <strong>Kota:</strong> {formData?.city}
          </p>
        </div>
      </div>

      <div>
        <div className="p-4">
          <h2 className="text-xl font-medium mb-2">Pilih Layanan Pengiriman</h2>
          <ul>
            {shippingOptions.map((service, index) => (
              <li
                key={index}
                onClick={() => handleServiceChange(service)} // Pilih layanan pengiriman
                className={`flex flex-col border rounded p-2 my-2 cursor-pointer ${
                  selectedService?.service === service.service
                    ? "bg-gray-200"
                    : ""
                }`}
              >
                <span className="font-semibold">{service.service}</span>
                <span className="text-sm text-muted">
                  Estimasi: {service.etd} hari
                </span>
                <span className="text-sm">
                  Rp{parseInt(service.cost).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <div className="p-4">
          <h2 className="text-xl font-medium mb-2">Ringkasan Pesanan</h2>
          <p>
            Subtotal:{" "}
            <span className="float-right">
              Rp
              {items
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toLocaleString()}
            </span>
          </p>
          <p>
            Ongkir:{" "}
            <span className="float-right">
              Rp
              {selectedService ? selectedService.cost.toLocaleString() : 0}
            </span>
          </p>
          <p>
            Biaya Admin: <span className="float-right">Rp 20000</span>
          </p>{" "}
          {/* Ganti dengan biaya admin yang sesuai */}
          <hr className="my-2" />
          <p className="font-semibold">
            Total:{" "}
            <span className="float-right">
              Rp
              {items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              ) +
                (selectedService ? selectedService.cost : 0) +
                20000}
            </span>
          </p>
        </div>
      </div>

      <div className="text-right">
        <button onClick={handleConfirm}>Konfirmasi & Bayar</button>
      </div>
    </div>
  );
};

export default PaymentPage;
