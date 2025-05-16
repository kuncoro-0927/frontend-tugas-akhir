/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import FormInput from "../../../TextField";
import { showSnackbar } from "../../../CustomSnackbar";
import { instanceAdmin } from "../../../../utils/axiosAdmin";
import { IoClose } from "react-icons/io5";
import { Modal, Box } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const ModalUpdateOrder = ({ open, handleClose, onUpdate, orderId }) => {
  const [formData, setFormData] = useState({
    order_id: "",
    order_code: "",
    invoice_url: "",
    user_email: "",
    subtotal: "",
    admin_fee: "",
    shipping_fee: "",
    promo_code: "",
    discount_amount: "",
    total_amount: "",
    status: "",
    tracking_number: "",

    // Shipping detail:
    shipping_firstname: "",
    shipping_lastname: "",
    shipping_phone: "",
    shipping_address: "",
    province: "",
    city: "",
    postal_code: "",
    courier: "",
    etd: "",
    shipping_cost: "",

    // Optional: items
    items: [],
  });

  const [isEditable, setIsEditable] = useState(true); // Variabel untuk status editable

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchOrderDetails = async () => {
    try {
      const res = await instanceAdmin.get(`/get/order/${orderId}`);
      const order = res.data;

      console.log("data res", order);

      setFormData({
        order_id: order.order_id || "", // perhatikan: `order.id`, bukan `order.order_id` lagi
        order_code: order.order_code || "",
        invoice_url: order.invoice_url || "",
        user_email: order.user_email || "",
        subtotal: order.subtotal || "",
        admin_fee: order.admin_fee || "",
        shipping_fee: order.shipping_fee || "",
        promo_code: order.promo_code || "",
        discount_amount: order.discount_amount || "",
        total_amount: order.total_amount || "",
        status: order.status || "",
        tracking_number: order.tracking_number || "",

        // Shipping details
        shipping_firstname: order.shipping_firstname || "",
        shipping_lastname: order.shipping_lastname || "",
        shipping_phone: order.shipping_phone || "",
        shipping_address: order.shipping_address || "",
        province: order.province || "",
        city: order.city || "",
        postal_code: order.postal_code || "",
        courier: order.courier || "",
        etd: order.etd || "",
        shipping_cost: order.shipping_cost || "",

        // Tambahkan item list ke formData jika perlu (misalnya untuk ditampilkan)
        items: order.items || [],
      });

      // Atur status apakah form editable atau tidak
      setIsEditable(order.isEditable);
    } catch (err) {
      console.error("Failed to fetch order details", err);
    }
  };

  useEffect(() => {
    console.log("Order ID:", orderId);
    if (open) {
      fetchOrderDetails();
    } else {
      setFormData({
        order_id: "",
        order_code: "",
        invoice_url: "",
        user_email: "",
        subtotal: "",
        admin_fee: "",
        shipping_fee: "",
        promo_code: "",
        discount_amount: "",
        total_amount: "",
        status: "",
        tracking_number: "",

        // Shipping detail:
        shipping_firstname: "",
        shipping_lastname: "",
        shipping_phone: "",
        shipping_address: "",
        province: "",
        city: "",
        postal_code: "",
        courier: "",
        etd: "",
        shipping_cost: "",

        // Optional: items
        items: [],
      });
      setIsEditable(true); // Reset editable jika modal ditutup
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };

      // Jika tidak ingin update items, hapus key-nya
      if (!payload.items || payload.items.length === 0) {
        delete payload.items;
      }
      const res = await instanceAdmin.put(`/update/order/${orderId}`, payload);
      console.log("Order berhasil:", res.data);
      showSnackbar("Order berhasil diperbarui", "success");
      handleClose();
      onUpdate();
    } catch (err) {
      console.error("Gagal:", err.message);
      showSnackbar("Gagal memperbarui order", "error");
    }
  };

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") handleClose();
      }}
    >
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 5,
          width: { xs: "350px", sm: "550px" },
          maxHeight: "90vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <div>
          <div
            className="bg-blue-400/10"
            style={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <button
              onClick={handleClose}
              className="text-2xl flex pt-4 pr-4 justify-end ml-auto"
            >
              <IoClose />
            </button>
            <div className="px-5 pb-2">
              <h2 className="text-2xl font-bold text-hitam2">Edit Pesanan</h2>
            </div>
          </div>
          <div className="mx-5 mt-5 mb-7">
            <h1 className="font-bold text-lg">Edit Data Pesanan</h1>
            <p className="text-sm text-graytext">
              Isi data berikut yang dapat diedit. Beberapa kolom tidak dapat
              diubah sesuai dengan status pesanan.
            </p>
          </div>

          <form className="px-6 mt-5 pb-6" onSubmit={handleSubmit}>
            {/* Informasi Dasar Pesanan */}
            <div className="grid gap-4">
              <FormInput
                name="order_id"
                type="text"
                value={formData.order_id}
                label="ID Pesanan"
                onChange={handleChange}
                readOnly
                disabled
              />
              <FormInput
                name="order_code"
                type="text"
                value={formData.order_code}
                label="Kode Pesanan"
                onChange={handleChange}
                readOnly
                disabled
              />
              <FormInput
                name="invoice_url"
                type="text"
                value={formData.invoice_url}
                label="Invoice"
                onChange={handleChange}
                readOnly
                disabled
              />
              <FormInput
                name="user_id"
                type="text"
                value={formData.user_email}
                label="Pemesan"
                onChange={handleChange}
                readOnly
                disabled
              />
            </div>

            {/* Informasi Biaya */}
            <div className="grid mt-7 gap-4">
              <div className="flex items-center gap-5">
                <FormInput
                  name="admin_fee"
                  type="text"
                  value={formData.admin_fee}
                  label="Biaya Admin"
                  onChange={handleChange}
                  readOnly
                  disabled
                />
                <FormInput
                  name="shipping_fee"
                  type="text"
                  value={formData.shipping_fee}
                  label="Biaya Pengiriman"
                  onChange={handleChange}
                  readOnly
                  disabled
                />
              </div>
              <div className="flex items-center gap-5">
                <FormInput
                  name="promo_code"
                  type="text"
                  value={formData.promo_code}
                  label="Kode Promo"
                  onChange={handleChange}
                  readOnly
                  disabled
                />
                <FormInput
                  name="discount_amount"
                  type="text"
                  value={formData.discount_amount}
                  label="Total Diskon"
                  onChange={handleChange}
                  readOnly
                  disabled
                />
              </div>
              <div className="flex items-center gap-5">
                <FormInput
                  name="subtotal"
                  type="text"
                  value={formData.subtotal}
                  label="Subtotal"
                  onChange={handleChange}
                  readOnly
                  disabled
                />
                <FormInput
                  name="total_amount"
                  type="text"
                  value={formData.total_amount}
                  label="Total Bayar"
                  onChange={handleChange}
                  readOnly
                  disabled
                />
              </div>
            </div>

            {/* Status & Tracking */}
            <div className="flex mt-5 gap-4">
              <FormInput
                name="status"
                type="select"
                value={formData.status}
                label="Status"
                onChange={handleChange}
                options={[
                  { label: "pending", value: "pending" },
                  { label: "paid", value: "paid" },
                  { label: "shipped", value: "shipped" },
                  { label: "completed", value: "completed" },
                  { label: "cancelled", value: "cancelled" },
                ]}
              />
              <FormInput
                name="tracking_number"
                type="text"
                value={formData.tracking_number}
                label="Nomor Resi"
                onChange={handleChange}
                disabled={formData.status === "pending"}
              />
            </div>

            <h1 className="mt-7 font-bold text-lg">Informasi Penerima</h1>
            <p className="text-sm text-graytext">
              Berikut informasi data penerima pesanan.
            </p>
            {/* Informasi Pengiriman */}
            <div className="grid mt-7 gap-4">
              <div className="flex items-center gap-5">
                <FormInput
                  name="shipping_firstname"
                  type="text"
                  value={formData.shipping_firstname}
                  label="Nama Depan Penerima"
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
                <FormInput
                  name="shipping_lastname"
                  type="text"
                  value={formData.shipping_lastname}
                  label="Nama Belakang Penerima"
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>

              <FormInput
                name="shipping_address"
                type="text"
                value={formData.shipping_address}
                label="Alamat Lengkap"
                onChange={handleChange}
                readOnly={!isEditable}
              />
              <div className="flex items-center gap-5">
                <FormInput
                  name="province"
                  type="text"
                  value={formData.province}
                  label="Provinsi"
                  onChange={handleChange}
                  readOnly={!isEditable}
                  disabled
                />
                <FormInput
                  name="city"
                  type="text"
                  value={formData.city}
                  label="Kota"
                  onChange={handleChange}
                  readOnly={!isEditable}
                  disabled
                />
              </div>
              <div className="flex items-center gap-5">
                <FormInput
                  name="postal_code"
                  type="text"
                  value={formData.postal_code}
                  label="Kode Pos"
                  onChange={handleChange}
                  readOnly={!isEditable}
                  disabled
                />
                <FormInput
                  name="shipping_phone"
                  type="text"
                  value={formData.shipping_phone}
                  label="No. HP Penerima"
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
              <div className="flex items-center gap-5">
                <FormInput
                  name="courier"
                  type="text"
                  value={formData.courier}
                  label="Kurir"
                  onChange={handleChange}
                  readOnly={!isEditable}
                  disabled
                />
                <FormInput
                  name="etd"
                  type="text"
                  value={formData.etd}
                  label="Estimasi Pengiriman (ETD)"
                  onChange={handleChange}
                  readOnly={!isEditable}
                />
              </div>
            </div>

            {/* Tombol Submit */}
            <div className="text-right mt-6">
              <button
                type="submit"
                className="bg-black px-4 py-2 text-white rounded-md hover:bg-black/80 duration-300"
                disabled={!isEditable}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalUpdateOrder;
