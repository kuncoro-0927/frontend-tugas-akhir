/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { instanceAdmin } from "../../../../utils/axiosAdmin";
import { showSnackbar } from "../../../CustomSnackbar";
import { IoClose } from "react-icons/io5";
import FormInput from "../../../TextField";
import { IoImageOutline } from "react-icons/io5";
import { Modal, Box, Button } from "@mui/material";

const ModalUpdatePromo = ({ open, handleClose, onUpdate, promoId }) => {
  const [formData, setFormData] = useState({
    code: "",
    discount_type: "",
    discount_value: "",
    max_discount: "",
    min_order: 0,
    expiry_date: "",
    is_active: 1,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchPromoDetails = async () => {
    try {
      const res = await instanceAdmin.get(`/promo/${promoId}`);
      const promo = res.data; // <== penting!

      console.log("data res", promo);
      setFormData({
        code: promo.code || "",
        discount_type: promo.discount_type || "",
        discount_value: promo.discount_value || "",
        max_discount: promo.max_discount || "",
        min_order: promo.min_order || "",
        expiry_date: promo.expiry_date
          ? promo.expiry_date.slice(0, 10) // Format ke YYYY-MM-DD
          : "",
        is_active: promo.is_active || "",
      });
    } catch (err) {
      console.error("Failed to fetch category details", err);
    }
  };

  useEffect(() => {
    if (open) {
      fetchPromoDetails();
    } else {
      // Reset form ketika modal ditutup
      setFormData({
        code: "",
        discount_type: "",
        discount_value: "",
        max_discount: "",
        min_order: 0,
        expiry_date: "",
        is_active: 1,
      });
    }
  }, [open]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data sebelum submit:", formData);

    try {
      const res = await instanceAdmin.put(`/update/promo/${promoId}`, formData);

      console.log("Response sukses:", res.data);

      showSnackbar("Promo berhasil diperbarui", "success");
      handleClose();
      onUpdate();
    } catch (err) {
      console.error("Gagal:", err.response?.data || err.message);
      showSnackbar("Gagal memperbarui promo", "error");
    }
  };

  useEffect(() => {
    if (!open) {
      setFormData({
        code: "",
        discount_type: "",
        discount_value: "",
        max_discount: "",
        min_order: 0,
        expiry_date: "",
        is_active: 1,
      });
    }
  }, [open]);

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
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome/Safari/Edge
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
              <h2 className="text-2xl font-bold text-hitam2">Edit Promo</h2>
            </div>
          </div>
          <div className="mx-5 mt-5 mb-7">
            <h1 className="font-bold text-lg">Lengkapi Detail Promo</h1>
            <p className="text-sm text-graytext">
              Isi detail promo agar mudah dikenali dan menarik bagi pelanggan.
            </p>
          </div>

          <form className="px-6 mt-5 pb-6" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="flex gap-5">
                <FormInput
                  name="code"
                  type="text"
                  value={formData.code}
                  label="Nama Promo"
                  onChange={handleChange}
                />{" "}
                <FormInput
                  label="Tipe Diskon"
                  name="discount_type"
                  type="select"
                  value={formData.discount_type}
                  onChange={handleChange}
                  options={[
                    { value: "percentage", label: "Persentase" },
                    { value: "fixed", label: "Tetap" },
                  ]}
                />
              </div>
              <div className="flex gap-5">
                <FormInput
                  name="discount_value"
                  type="text"
                  value={formData.discount_value}
                  helperText="Contoh: Persentase = 10 untuk 10%, Tetap = 10000 untuk IDR 10.000"
                  label="Jumlah diskon"
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-5">
                <FormInput
                  name="max_discount"
                  type="text"
                  value={formData.max_discount}
                  label="Max. Diskon"
                  disabled={formData.discount_type === "fixed"}
                  helperText="Hanya untuk diskon persentase"
                  onChange={handleChange}
                />
                <FormInput
                  name="min_order"
                  type="text"
                  value={formData.min_order}
                  helperText="Minimal pesanan untuk diskon"
                  label="Min. Pesanan"
                  onChange={handleChange}
                />
              </div>
              <FormInput
                name="expiry_date"
                type="date"
                value={formData.expiry_date}
                label="Tanggal kadaluwarsa"
                onChange={handleChange}
              />
            </div>

            <div className="text-right mt-5 ">
              <button
                type="submit"
                className="bg-black px-4 py-2 text-white rounded-md hover:bg-black/80 duration-300"
                variant="contained"
                color="primary"
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

export default ModalUpdatePromo;
