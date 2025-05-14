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
      const order = res.data; // <== penting!

      console.log("data res", order);
      setFormData({
        order_id: order.order_id || "",
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
      });

      // Set status editable sesuai dengan response
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
      });
      setIsEditable(true); // Reset editable jika modal ditutup
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await instanceAdmin.put(`/update/order/${orderId}`, formData);
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
            <div className="grid gap-4">
              <FormInput
                name="order_id"
                type="text"
                value={formData.order_id}
                label="ID Pesanan"
                onChange={handleChange}
                readOnly={!isEditable}
                disabled
              />
            </div>
            <div className="grid mt-7 gap-4">
              <FormInput
                name="order_code"
                type="text"
                value={formData.order_code}
                label="Kode Pesanan"
                onChange={handleChange}
                disabled
                readOnly={!isEditable}
              />
            </div>

            <div className="grid mt-7 gap-4">
              <FormInput
                name="invoice_url"
                type="text"
                value={formData.invoice_url}
                label="Invoice"
                onChange={handleChange}
                disabled
                readOnly={!isEditable}
              />
            </div>

            <div className="flex mt-7 gap-4">
              <FormInput
                name="user_id"
                type="text"
                value={formData.user_email}
                label="Pemesan"
                onChange={handleChange}
                disabled
                readOnly={!isEditable}
              />
            </div>

            <div className="flex mt-7 gap-4">
              <FormInput
                name="admin_fee"
                type="text"
                value={formData.admin_fee}
                label="Biaya Admin"
                onChange={handleChange}
                disabled
                readOnly={!isEditable}
              />

              <FormInput
                name="shipping_fee"
                type="text"
                value={formData.shipping_fee}
                label="Biaya Pengiriman"
                onChange={handleChange}
                disabled
                readOnly={!isEditable}
              />
            </div>

            <div className="flex mt-7 gap-4">
              <FormInput
                name="promo_code"
                type="text"
                value={formData.promo_code}
                label="Kode Promo"
                onChange={handleChange}
                disabled
                readOnly={!isEditable}
              />

              <FormInput
                name="discount_amount"
                type="text"
                value={formData.discount_amount}
                label="Total Diskon"
                onChange={handleChange}
                disabled
                readOnly={!isEditable}
              />
            </div>

            <div className="flex mt-7 gap-4">
              <FormInput
                name="subtotal"
                type="text"
                value={formData.subtotal}
                label="Subtotal"
                onChange={handleChange}
                disabled
                readOnly={!isEditable}
              />

              <FormInput
                name="total_amount"
                type="text"
                value={formData.total_amount}
                label="Total Bayar"
                onChange={handleChange}
                disabled
                readOnly={!isEditable}
              />
            </div>
            <div className="flex mt-7 gap-4">
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
            <div className="text-right mt-5 ">
              <button
                type="submit"
                className="bg-black px-4 py-2 text-white rounded-md hover:bg-black/80 duration-300"
                variant="contained"
                color="primary"
                disabled={!isEditable} // Disable tombol submit jika tidak bisa di-edit
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
