/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import FormInput from "../../../TextField";
import { Modal, Box, Button } from "@mui/material";
import { instanceAdmin } from "../../../../utils/axiosAdmin";
import { showSnackbar } from "../../../CustomSnackbar";
import { IoImageOutline } from "react-icons/io5";
const ModalEditProduct = ({ open, handleClose, productId, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    size: "",
    weight: "",
  });
  const [oldImageUrl, setOldImageUrl] = useState("");

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [imageInfo, setImageInfo] = useState({
    name: "",
    size: 0,
  });
  // Handle form data change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageInfo({
      name: "",
      size: 0,
    });
    document.getElementById("imageUpload").value = ""; // Mengosongkan input file
  };
  const fetchProductDetails = async () => {
    try {
      const res = await instanceAdmin.get(`/product/${productId}`);
      const product = res.data.data; // <== penting!
      console.log("data res", product);
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price || "",
        category: product.category_id || "",
        size: product.size || "",
        weight: product.weight_gram || "",
      });
      setOldImageUrl(product.image_url || "");
    } catch (err) {
      console.error("Failed to fetch product details", err);
    }
  };

  // Fetch categories for select
  const fetchCategories = async () => {
    try {
      const res = await instanceAdmin.get("/all/category");
      setCategories(res.data.categories);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    console.log("Product ID:", productId); // <== tambahkan ini
    if (open) {
      fetchProductDetails();
      fetchCategories();
    } else {
      // Reset form ketika modal ditutup
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        size: "",
        weight: "",
      });
      setImage(null);
    }
  }, [open]);

  // Handle image change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle product update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      if (image) data.append("image", image);

      const res = await instanceAdmin.put(
        `/update/product/${productId}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.error(res);

      showSnackbar("Produk berhasil diperbarui", "success");
      handleClose();
      onUpdate();
    } catch (err) {
      console.error("Failed to update product", err);
      console.error(
        "Failed to update product",
        err.response?.data || err.message
      );

      showSnackbar("Gagal memperbarui produk", "error");
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
              <h2 className="text-2xl font-bold">Edit Produk</h2>
            </div>
          </div>
          <div className="mx-5 mt-5 mb-7">
            <h1 className="font-bold text-lg">Lengkapi Detail Produk</h1>
            <p className="text-sm text-graytext">
              Isi detail produk agar mudah dikenali dan menarik bagi pelanggan.
            </p>
          </div>
          <form className="px-6 mt-5 pb-6" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <FormInput
                name="name"
                type="text"
                label="Nama Produk"
                value={formData.name}
                onChange={handleChange}
              />
              <div className="flex gap-5">
                <FormInput
                  name="category"
                  type="select"
                  label="Kategori"
                  value={formData.category}
                  onChange={handleChange}
                  options={categories.map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                  }))}
                />
                <FormInput
                  name="price"
                  type="text"
                  helperText="Contoh: 100000 untuk Rp100.000"
                  label="Harga"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <FormInput
                name="description"
                type="text"
                label="Deskripsi"
                value={formData.description}
                onChange={handleChange}
              />
              <div className="flex gap-5">
                <FormInput
                  name="size"
                  type="text"
                  helperText="Ukuran dalam cm, contoh: 40 x 50"
                  label="Ukuran"
                  value={formData.size}
                  onChange={handleChange}
                />
                <FormInput
                  name="weight"
                  type="text"
                  label="Berat (gram)"
                  helperText="Berat (gram), contoh: 1000 untuk 1kg"
                  value={formData.weight}
                  onChange={handleChange}
                />
              </div>

              <label
                htmlFor="imageUpload"
                className="border-dashed border border-black px-5 py-4 rounded-md cursor-pointer flex flex-col items-center justify-center gap-2"
              >
                <div className="bg-blue-400/15 w-fit p-3 mb-3 rounded-full">
                  <IoImageOutline className="text-2xl" />
                </div>
                <p className="text-base font-semibold">
                  Pilih <span className="text-blue-600">gambar</span> Produk
                  untuk diunggah
                </p>
                <span className="text-gray-500 text-xs">
                  Gambar harus 100 x 100 px - Max 2MB
                </span>

                {/* Menampilkan nama dan ukuran gambar yang dipilih */}
                {image && (
                  <div className=" text-xs text-gray-700">
                    <p>
                      File yang dipilih: {imageInfo.name} /{" "}
                      {(imageInfo.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}

                {/* Tombol Hapus */}
                <div className="flex gap-2 mt-2">
                  {image && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-4 py-2 text-sm bg-red-500 text-white rounded-md"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {/* Jika belum memilih gambar baru, tampilkan gambar lama */}
              {!image && oldImageUrl && (
                <div className="mt-3">
                  <p className="text-base text-graytext  mr-auto">
                    Gambar saat ini:
                  </p>
                  <div className="mt-3 border border-black rounded-md border-dashed flex flex-col items-center p-4 justify-center">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}${oldImageUrl}`}
                      alt="Gambar Lama"
                      className="w-32 h-auto mt-1 rounded-md shadow"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="text-right mt-10 ">
              <button
                type="submit"
                className="bg-black px-4 py-2 text-white rounded-md hover:bg-black/80 duration-300"
                variant="contained"
                color="primary"
              >
                Perbarui
              </button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalEditProduct;
