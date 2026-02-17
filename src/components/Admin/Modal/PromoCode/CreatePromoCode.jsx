import { useState, useEffect } from "react";
import { instanceAdmin } from "../../../../utils/axiosAdmin";
import { showSnackbar } from "../../../CustomSnackbar";
import { IoClose } from "react-icons/io5";
import FormInput from "../../../TextField";
import { IoImageOutline } from "react-icons/io5";
import { Modal, Box, Button } from "@mui/material";

const ModalCreatePromo = ({ open, handleClose, onUpdate }) => {
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    type: "fixed",
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
  const validateForm = () => {
    const newErrors = {};

    if (!formData.code.trim()) newErrors.code = "Kode promo wajib diisi";
    if (!formData.discount_type)
      newErrors.discount_type = "Tipe diskon wajib dipilih";
    if (!formData.discount_value || isNaN(formData.discount_value)) {
      newErrors.discount_value = "Jumlah diskon harus berupa angka";
    }

    if (
      formData.discount_type === "percentage" &&
      (!formData.max_discount || isNaN(formData.max_discount))
    ) {
      newErrors.max_discount = "Max diskon wajib diisi dan harus angka";
    }

    if (!formData.min_order || isNaN(formData.min_order)) {
      newErrors.min_order = "Min. pesanan harus angka";
    }

    if (!formData.expiry_date)
      newErrors.expiry_date = "Tanggal kadaluarsa wajib diisi";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data sebelum submit:", formData);
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showSnackbar("Periksa kembali data promo", "warning");
      return;
    }
    try {
      const res = await instanceAdmin.post("/create/promo", formData);

      console.log("Response sukses:", res.data);

      showSnackbar("Promo berhasil ditambahkan", "success");
      handleClose();
      onUpdate();
    } catch (err) {
      console.error("Gagal:", err.response?.data || err.message);
      showSnackbar("Gagal menambahkan promo", "error");
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
      setErrors({});
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
              <h2 className="text-2xl font-bold text-hitam2">Tambah Promo</h2>
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
                  error={!!errors.code}
                  helperText={errors.code}
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
                  error={!!errors.discount_type}
                  helperText={errors.discount_type}
                />
              </div>
              <div className="flex gap-5">
                <FormInput
                  name="discount_value"
                  type="text"
                  label="Jumlah diskon"
                  onChange={handleChange}
                  error={!!errors.discount_value}
                  helperText={
                    errors.discount_value ||
                    "Contoh: Persentase = 10 untuk 10%, Tetap = 10000 untuk IDR 10.000"
                  }
                />
              </div>

              <div className="flex gap-5">
                <FormInput
                  name="max_discount"
                  type="text"
                  label="Max. Diskon"
                  disabled={formData.discount_type === "fixed"}
                  onChange={handleChange}
                  error={!!errors.max_discount}
                  helperText={
                    errors.max_discount || "Hanya untuk diskon persentase"
                  }
                />
                <FormInput
                  name="min_order"
                  type="text"
                  label="Min. Pesanan"
                  onChange={handleChange}
                  error={!!errors.min_order}
                  helperText={
                    errors.min_order || "Minimal pesanan untuk diskon"
                  }
                />
              </div>
              <FormInput
                name="expiry_date"
                type="date"
                label="Tanggal kadaluwarsa"
                onChange={handleChange}
                error={!!errors.expiry_date}
                helperText={errors.expiry_date}
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

export default ModalCreatePromo;
