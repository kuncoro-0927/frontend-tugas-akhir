import { useState, useEffect } from "react";
import { instanceAdmin } from "../../../utils/axiosAdmin";
import { showSnackbar } from "../../CustomSnackbar";
import { IoClose } from "react-icons/io5";
import FormInput from "../../TextField";
import { IoImageOutline } from "react-icons/io5";
import { Modal, Box, Button } from "@mui/material";

const ModalCreateProduct = ({ open, handleClose, onUpdate }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    size: "",
    weight: "",
  });
  const [image, setImage] = useState(null);
  const [imageInfo, setImageInfo] = useState({
    name: "",
    size: 0,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageInfo({
        name: file.name,
        size: file.size,
      });
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageInfo({
      name: "",
      size: 0,
    });
    document.getElementById("imageUpload").value = ""; // Mengosongkan input file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }
      if (image) data.append("image", image); // Menambahkan image ke FormData

      const res = await instanceAdmin.post("/create/product", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Produk berhasil:", res.data);
      showSnackbar("Produk berhasil ditambahkan", "success");
      handleClose();
      onUpdate();
    } catch (err) {
      console.error("Gagal:", err.message);
      showSnackbar("Gagal menambahkan produk", "error");
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await instanceAdmin.get("/all/category");
        setCategories(res.data.categories);
      } catch (err) {
        console.error("Gagal mengambil kategori:", err);
      }
    };

    fetchCategories();
  }, []);

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
              <h2 className="text-2xl font-bold text-hitam2">Tambah Produk</h2>
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
                onChange={handleChange}
              />
              <div className="flex gap-5">
                <FormInput
                  name="category"
                  type="select"
                  label="Kategori"
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
                  onChange={handleChange}
                />
              </div>
              <FormInput
                name="description"
                type="text"
                label="Deskripsi"
                onChange={handleChange}
              />
              <div className="flex gap-5">
                <FormInput
                  name="size"
                  type="text"
                  helperText="Ukuran dalam cm, contoh: 40 x 50"
                  label="Ukuran"
                  onChange={handleChange}
                />
                <FormInput
                  name="weight"
                  type="text"
                  helperText="Berat (gram), contoh: 1000 untuk 1kg"
                  label="Berat / gram"
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

export default ModalCreateProduct;
