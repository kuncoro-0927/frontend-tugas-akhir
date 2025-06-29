import { useState, useEffect } from "react";
import { instanceAdmin } from "../../../../utils/axiosAdmin";
import { showSnackbar } from "../../../CustomSnackbar";
import { IoClose } from "react-icons/io5";
import FormInput from "../../../TextField";
import { Modal, Box } from "@mui/material";
import CardImage from "../../../Card/CardImage";

const ModalCreateOrderByAdmin = ({ open, handleClose, onUpdate }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customFile, setCustomFile] = useState(null);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");
  const [customNotes, setCustomNotes] = useState("");
  const [customPrice, setCustomPrice] = useState(0);
  const [currentCustomProduct, setCurrentCustomProduct] = useState(null);

  const [formData, setFormData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    promo_code: "",
    discount_amount: 0,
    subtotal: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instanceAdmin.get("/all/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const newSubtotal = selectedItems.reduce((acc, item) => {
      let price = item.product.price;

      // Kalau produk custom dan item.custom ada, pakai harga dari item.custom
      if (item.product.is_custom && item.custom?.price) {
        price = item.custom.price;
      }

      return acc + price * item.quantity;
    }, 0);

    setFormData((prev) => ({ ...prev, subtotal: newSubtotal }));
  }, [selectedItems]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (
      customWidth &&
      customHeight &&
      currentCustomProduct?.width &&
      currentCustomProduct?.height &&
      currentCustomProduct?.price
    ) {
      const baseWidth = Number(currentCustomProduct.width);
      const baseHeight = Number(currentCustomProduct.height);
      const basePrice = Number(currentCustomProduct.price);

      const baseArea = baseWidth * baseHeight;
      const pricePerCm2 = basePrice / baseArea;

      const customArea = Number(customWidth) * Number(customHeight);
      const newPriceRaw = pricePerCm2 * customArea;

      // Pembulatan ke 1.000 terdekat
      const newPrice = Math.round(newPriceRaw / 1000) * 1000;

      setCustomPrice(newPrice);
    } else if (currentCustomProduct?.price) {
      setCustomPrice(Number(currentCustomProduct.price));
    }
  }, [customWidth, customHeight, currentCustomProduct]);

  useEffect(() => {
    const hasIncompleteCustom = selectedItems.some(
      (item) =>
        item.product?.category_id === 5 &&
        item.product?.is_custom &&
        !item.custom // form hanya dibuka kalau belum diisi
    );
    setShowCustomForm(hasIncompleteCustom);
  }, [selectedItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Bangun objek payload yang akan dikirim sebagai JSON
      const payload = {
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        promo_code: formData.promo_code,
        discount_amount: formData.discount_amount,
        shipping_fee: 0, // default jika manual
        subtotal: 0, // kita akan hitung total harga produk
        products: [],
      };

      let subtotal = 0;

      selectedItems.forEach((item, index) => {
        const product = item.product;
        const custom = item.custom || {};
        const quantity = Number(item.quantity) || 1;
        let price = product.price;

        if (product.is_custom && custom.price) {
          price = Number(custom.price);
        }

        const total = price * quantity;
        subtotal += total;

        const productData = {
          product_id: product.id,
          product_name: product.name,
          price,
          quantity,
          total,
        };

        // Jika ada custom
        if (product.is_custom) {
          const fileKey = `customFile_${index}`;

          productData.custom = {
            price: custom.price,
            width: custom.width,
            height: custom.height,
            notes: custom.notes,
            fileKey, // untuk dicocokkan di backend
          };

          if (custom.file) {
            formDataToSend.append(fileKey, custom.file);
          }
        }

        payload.products.push(productData);
      });

      payload.subtotal = subtotal;

      // Kirim semua data (kecuali file) sebagai JSON di field "data"
      formDataToSend.append("data", JSON.stringify(payload));

      // Debug preview
      console.group("📦 Payload Preview");
      console.log(payload);
      console.groupEnd();

      // Kirim ke backend
      await instanceAdmin.post("/order/offline", formDataToSend);
      showSnackbar("Berhasil membuat pesanan.", "success");
      handleClose();
      onUpdate();
    } catch (err) {
      console.error(err);
      showSnackbar("Gagal membuat pesanan.", "error");
    }
  };

  useEffect(() => {
    console.log("Selected Items", selectedItems);
  }, [selectedItems]);

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
          width: { xs: "360px", sm: "650px" },
          maxHeight: "90vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <div>
          <div className="bg-blue-400/10 rounded-t-2xl">
            <button
              onClick={handleClose}
              className="text-2xl flex pt-4 pr-4 justify-end ml-auto"
            >
              <IoClose />
            </button>
            <div className="px-5 pb-2">
              <h2 className="text-2xl font-bold text-hitam2">
                Tambah Pesanan Offline
              </h2>
            </div>
          </div>

          <form className="px-6 mt-5 pb-6" onSubmit={handleSubmit}>
            <h1 className="font-bold text-lg mb-3">Informasi Pelanggan</h1>
            <div className="grid gap-4 mb-4">
              <FormInput
                name="customer_name"
                label="Nama"
                value={formData.customer_name}
                onChange={handleChange}
              />
              <FormInput
                name="customer_email"
                label="Email"
                type="email"
                value={formData.customer_email}
                onChange={handleChange}
              />
              <FormInput
                name="customer_phone"
                label="No. HP"
                value={formData.customer_phone}
                onChange={handleChange}
              />
            </div>

            <h1 className="font-bold text-lg mt-6 mb-3">Produk Dipesan</h1>
            <div className="grid gap-4">
              <div className="mb-4">
                <div className="mb-5">
                  <h1 className="text-lg font-semibold ">Pilih Produk</h1>
                  <p className="text-sm">
                    Silakan pilih produk yang ingin Anda beli dari daftar
                    berikut.
                  </p>
                </div>
                <FormInput
                  type="text"
                  label="Cari Produk"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <div className="border rounded mt-1 max-h-48 overflow-y-auto bg-white z-10 relative">
                    {products.data
                      ?.filter(
                        (p) =>
                          p.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) &&
                          (p.category_id === 5 || // custom bisa muncul terus
                            !selectedItems.some((i) => i.product.id === p.id)) // non-custom 1x
                      )

                      .map((product) => {
                        const isDisabled =
                          product.stock === 0 || product.status === "sold";
                        return (
                          <div
                            key={product.id}
                            className={`px-3 py-2 ${
                              isDisabled
                                ? "cursor-not-allowed opacity-50"
                                : "hover:bg-gray-100 cursor-pointer"
                            }`}
                            onClick={() => {
                              if (!isDisabled) {
                                if (product.category_id === 5) {
                                  // Produk custom: langsung masuk ke selectedItems dan buka form
                                  const customProduct = {
                                    ...product,
                                    name: `${product.name} (Custom)`,
                                    is_custom: true,
                                  };

                                  setSelectedItems((prev) => [
                                    ...prev,
                                    {
                                      product: customProduct,
                                      quantity: 1,
                                    },
                                  ]);

                                  setCurrentCustomProduct(customProduct);
                                  setShowCustomForm(true);
                                } else {
                                  // Produk biasa: hanya bisa dipilih 1x
                                  setSelectedItems((prev) => [
                                    ...prev,
                                    {
                                      product,
                                      quantity: 1,
                                    },
                                  ]);
                                }

                                setSearchQuery("");
                              }
                            }}
                            title={
                              isDisabled
                                ? product.stock === 0
                                  ? "Stok habis"
                                  : "Produk sudah terjual"
                                : ""
                            }
                          >
                            <div className="flex gap-5">
                              <div className="h-[60px] w-[60px]">
                                <CardImage
                                  image={`${import.meta.env.VITE_BACKEND_URL}${
                                    product.image_url
                                  }`}
                                  alt={product.name}
                                />
                              </div>
                              <div className="flex-col flex">
                                <div className="flex  w-[400px] items-center justify-between">
                                  <p className="font-semibold">
                                    {product.name}
                                  </p>
                                  <p className="text-sm font-semibold ml-auto">
                                    IDR{" "}
                                    {Number(product.price).toLocaleString(
                                      "id-ID"
                                    )}
                                  </p>
                                </div>
                                <span className="text-xs">
                                  <span className="font-bold">
                                    Stok barang:
                                  </span>{" "}
                                  {product.stock}
                                </span>
                                <div className="flex items-center justify-between">
                                  <p className="text-xs">{product.size}</p>
                                  <div className="text-xs w-fit">
                                    {product.status === "sold" ? (
                                      <p className="bg-red-100 rounded-full px-3 py-0.5 text-red-600">
                                        Terjual
                                      </p>
                                    ) : (
                                      <p className="bg-green-100 rounded-full px-3 py-0.5 text-green-600">
                                        Tersedia
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              {selectedItems.length > 0 && (
                <div className="space-y-4 mt-4">
                  <h1 className="text-lg font-semibold">Produk yang dipilih</h1>
                  {selectedItems.map((item, index) => (
                    <div
                      key={item.product.id}
                      className="flex mx-4 items-center justify-between border-b pb-4 "
                    >
                      <div className="flex gap-5">
                        <div className="h-[60px] w-[60px]">
                          <CardImage
                            image={`${import.meta.env.VITE_BACKEND_URL}${
                              item.product.image_url
                            }`}
                            alt={item.product.name}
                          />
                        </div>

                        <div className="flex-col flex">
                          {item.custom && (
                            <div className="mt-2 space-y-1 text-xs text-gray-700">
                              <p>
                                <span className="font-semibold">Ukuran:</span>{" "}
                                {item.custom.width} x {item.custom.height} cm
                              </p>
                              <p>
                                <span className="font-semibold">Catatan:</span>{" "}
                                {item.custom.notes || "-"}
                              </p>
                              <p>
                                <span className="font-semibold">
                                  Harga Custom:
                                </span>{" "}
                                IDR{" "}
                                {Number(item.custom.price).toLocaleString(
                                  "id-ID"
                                )}
                              </p>
                              {item.custom.file && (
                                <p className="flex items-center gap-2">
                                  <span className="font-semibold">Gambar:</span>
                                  <span className="text-blue-600 underline">
                                    {item.custom.file.name}
                                  </span>
                                </p>
                              )}
                            </div>
                          )}
                          <div className="flex w-[400px] items-center justify-between">
                            <div className="flex gap-2 items-center font-semibold">
                              <p>{item.product.name}</p>
                              <span className="flex items-center justify-between">
                                <span className="text-xs w-fit">
                                  {item.product.status === "sold" ? (
                                    <span className="bg-red-100 rounded-full px-3 py-0.5 text-red-600">
                                      Terjual
                                    </span>
                                  ) : (
                                    <span className="bg-green-100 rounded-full px-3 py-0.5 text-green-600">
                                      Tersedia
                                    </span>
                                  )}
                                </span>
                              </span>
                            </div>
                            <p className="text-sm font-semibold ml-auto">
                              IDR{" "}
                              {Number(item.product.price).toLocaleString(
                                "id-ID"
                              )}
                            </p>
                          </div>
                          <span className="text-xs">
                            <span className="font-bold">Stok barang:</span>{" "}
                            {item.product.stock}
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="text-xs">{item.product.size}</span>
                            <div className="flex items-center gap-10">
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedItems((prev) =>
                                      prev
                                        .map((val, i) =>
                                          i === index
                                            ? {
                                                ...val,
                                                quantity: val.quantity - 1,
                                              }
                                            : val
                                        )
                                        .filter((item) => item.quantity > 0)
                                    );
                                  }}
                                  className="py-0 px-1 text-xs border border-gray-400 rounded-sm"
                                >
                                  −
                                </button>
                                <span className="w-6 text-sm text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (item.quantity < item.product.stock) {
                                      setSelectedItems((prev) =>
                                        prev.map((val, i) =>
                                          i === index
                                            ? {
                                                ...val,
                                                quantity: val.quantity + 1,
                                              }
                                            : val
                                        )
                                      );
                                    }
                                  }}
                                  className="py-0 px-1 text-xs border border-gray-400 rounded-sm disabled:opacity-50"
                                  disabled={item.quantity >= item.product.stock}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showCustomForm && (
                <div className="mt-4 max-w-md space-y-4 border p-4 rounded-lg bg-gray-50">
                  <h1 className="font-bold text-base">Form Custom</h1>
                  <span className="text-sm font-medium text-black/60">
                    Sesuaikan desain bingkai sesuai keinginanmu.
                  </span>

                  <div>
                    <label className="block font-semibold mb-1">
                      Upload Foto
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      id="fileUploadCustom"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setCustomFile(file); // ✅ Simpan langsung ke state, tanpa index
                      }}
                      className="hidden"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("fileUploadCustom").click()
                      }
                      className="px-4 py-2 bg-black text-sm text-white rounded hover:bg-black/80"
                    >
                      Pilih Gambar
                    </button>

                    {customFile && (
                      <p className="mt-2 text-sm text-gray-700">
                        {customFile.name}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <FormInput
                      type="number"
                      label="Lebar"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                    />
                    <FormInput
                      type="number"
                      label="Tinggi"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(e.target.value)}
                    />
                  </div>

                  <FormInput
                    type="textarea"
                    label="Catatan"
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!currentCustomProduct) {
                        alert("Produk custom belum dipilih.");
                        return;
                      }

                      if (!customFile || !customWidth || !customHeight) {
                        alert("Lengkapi semua data custom terlebih dahulu.");
                        return;
                      }

                      setSelectedItems((prev) => {
                        const updated = [...prev];
                        const targetIndex = [...prev]
                          .reverse()
                          .findIndex(
                            (item) =>
                              item.product.id === currentCustomProduct.id &&
                              item.product.is_custom &&
                              !item.custom
                          );

                        if (targetIndex !== -1) {
                          const realIndex = prev.length - 1 - targetIndex;
                          updated[realIndex] = {
                            ...updated[realIndex],
                            custom: {
                              width: customWidth,
                              height: customHeight,
                              price: customPrice,
                              notes: customNotes,
                              file: customFile,
                            },
                          };
                        }

                        return updated;
                      });

                      // ✅ Reset form dan tutup
                      setCustomFile(null);
                      setCustomWidth("");
                      setCustomHeight("");
                      setCustomNotes("");
                      setCurrentCustomProduct(null);
                      setShowCustomForm(false);
                    }}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Simpan Custom
                  </button>
                </div>
              )}
            </div>

            <h1 className="font-bold text-lg mt-6 mb-3">Diskon & Total</h1>
            <div className="grid gap-4 mb-6">
              <FormInput
                name="subtotal"
                label="Subtotal"
                value={formData.subtotal}
                onChange={handleChange}
                disabled
              />
              <FormInput
                name="promo_code"
                label="Kode Promo"
                value={formData.promo_code}
                onChange={handleChange}
              />
              <FormInput
                name="discount_amount"
                label="Diskon (angka)"
                value={formData.discount_amount}
                onChange={handleChange}
              />
            </div>

            <div className="text-right mt-4">
              <button
                type="submit"
                className="bg-black px-4 py-2 text-white rounded-md hover:bg-black/80 duration-300"
              >
                Buat Pesanan
              </button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCreateOrderByAdmin;
