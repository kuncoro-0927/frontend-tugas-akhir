/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import FormInput from "../../../TextField";
import { showSnackbar } from "../../../CustomSnackbar";
import { instanceAdmin } from "../../../../utils/axiosAdmin";
import { IoClose } from "react-icons/io5";
import { Modal, Box } from "@mui/material";

const ModalUpdateCategory = ({ open, handleClose, onUpdate, categoryId }) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchCategoryDetails = async () => {
    try {
      const res = await instanceAdmin.get(`/get/category/${categoryId}`);
      const category = res.data; // <== penting!
      console.log("data res", category);
      setFormData({
        name: category.name || "",
      });
    } catch (err) {
      console.error("Failed to fetch category details", err);
    }
  };

  useEffect(() => {
    console.log("Product ID:", categoryId); // <== tambahkan ini
    if (open) {
      fetchCategoryDetails();
    } else {
      // Reset form ketika modal ditutup
      setFormData({
        name: "",
      });
    }
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await instanceAdmin.put(
        `/update/category/${categoryId}`,
        formData
      );
      console.log("Kategori berhasil:", res.data);
      showSnackbar("Kategori berhasil diperbarui", "success");
      handleClose();
      onUpdate();
    } catch (err) {
      console.error("Gagal:", err.message);
      showSnackbar("Gagal memperbarui kategori", "error");
    }
  };

  useEffect(() => {
    if (!open) {
      // Reset formData
      setFormData({
        name: "",
      });

      // Kosongkan input file jika masih ada
      const input = document.getElementById("imageUpload");
      if (input) input.value = "";
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
              <h2 className="text-2xl font-bold text-hitam2">
                Tambah Kategori
              </h2>
            </div>
          </div>
          <div className="mx-5 mt-5 mb-7">
            <h1 className="font-bold text-lg">Buat Nama Kategori</h1>
            <p className="text-sm text-graytext">
              Isi nama kategori agar mudah dikenali dan menarik bagi pelanggan.
            </p>
          </div>

          <form className="px-6 mt-5 pb-6" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <FormInput
                name="name"
                type="text"
                value={formData.name}
                label="Nama Kategori"
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

export default ModalUpdateCategory;
