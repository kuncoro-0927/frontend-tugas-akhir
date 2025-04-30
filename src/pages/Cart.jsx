/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardImage from "../components/Card/CardImage";
import { instance } from "../utils/axios";
import QuantitySelector from "../components/QuantitySelector";
import { IoIosCloseCircle } from "react-icons/io";
import { setItemCount, removeFromCart } from "../redux/cartSlice";
import { useDispatch } from "react-redux";
import { IoHeartCircleOutline, IoHeartCircle } from "react-icons/io5";
import ModalSelectMethod from "../components/Modal/ModalSelectMethod";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [shippingMethod, setShippingMethod] = useState(""); // state untuk menyimpan metode pengiriman yang dipilih
  const navigate = useNavigate();

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await instance.get("/get/cart");
        setCartItems(res.data.data);
      } catch (err) {
        console.error("Gagal ambil cart:", err);
      }
    };

    fetchCart();
  }, []);

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await instance.patch(`/update/cart/${cartId}`, { quantity: newQuantity });
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("Gagal update quantity:", err);
    }
  };

  const handleSelectItem = (cartId) => {
    setSelectedItems((prev) =>
      prev.includes(cartId)
        ? prev.filter((id) => id !== cartId)
        : [...prev, cartId]
    );
  };

  const calculateSubtotal = () => {
    const filteredItems = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );
    return filteredItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  };

  const handleRemoveItem = async (id) => {
    try {
      await instance.delete(`/delete/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      dispatch(removeFromCart(id));
      const newItemCount = cartItems.filter((item) => item.id !== id).length;
      dispatch(setItemCount(newItemCount));
    } catch (error) {
      console.error("Gagal menghapus item:", error);
    }
  };

  const handleCheckout = async (method) => {
    // Filter cart items yang dipilih
    const selectedData = cartItems.filter((item) =>
      selectedItems.includes(item.id)
    );

    if (selectedData.length === 0) {
      alert("Pilih produk terlebih dahulu.");
      return;
    }

    // Pastikan shippingMethod yang dipilih digunakan
    if (!method) {
      alert("Pilih metode pengiriman terlebih dahulu.");
      return;
    }

    try {
      const res = await instance.post("/checkout", {
        shipping_method: method, // Kirimkan metode pengiriman yang dipilih
        items: selectedData,
      });

      console.log("Pesanan berhasil dibuat!", res.data);
      navigate(`/shipping/form/${res.data.order_id}`);
    } catch (err) {
      console.error("Gagal melanjutkan pembayaran:", err);
      alert("Terjadi kesalahan saat melanjutkan pembayaran.");
    }
  };

  const handleSelectMethod = async (method) => {
    setShippingMethod(method);
    handleClose(); // tutup modal
    await handleCheckout(method); // langsung checkout setelah pilih metode
  };

  // Checkout tetap dipicu user manual, lewat tombol

  return (
    <section
      className={`mx-[75px] mt-10 space-y-6 ${
        cartItems?.length === 0
          ? "justify-center items-center min-h-screen"
          : ""
      }`}
    >
      <h1 className="font-extrabold text-black text-3xl">Keranjang Anda</h1>
      {Array.isArray(cartItems) && cartItems.length > 0 ? (
        <>
          <div className="flex gap-10">
            <div className="max-w-[730px] w-full">
              {cartItems
                .filter((item) => item.id)
                .map((item, index) => (
                  <div key={index} className="mb-4">
                    <div
                      onClick={() => handleSelectItem(item.id)}
                      className={`flex items-start border rounded-lg gap-4 p-4 mr-4 cursor-pointer transition-all duration-300 ${
                        selectedItems.includes(item.id)
                          ? "shadow-md border-blue-400 border bg-blue-100/40"
                          : "hover:shadow-md hover:border-black hover:bg-blue-100/20"
                      }`}
                    >
                      <div className="h-[140px] w-[190px]">
                        <CardImage
                          image={`${import.meta.env.VITE_BACKEND_URL}${
                            item.image_url
                          }`}
                          alt={item.name}
                        />
                      </div>
                      <div className="h-[140px] flex flex-col py-5 w-full justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <p className="text-gray-400/80">{item.category}</p>
                            <div className="flex items-center">
                              <IoHeartCircle
                                className="text-2xl cursor-pointer hover:scale-110 transition-transform"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveItem(item.id);
                                }}
                              />
                              <IoIosCloseCircle
                                className="text-2xl cursor-pointer hover:scale-110 transition-transform"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveItem(item.id);
                                }}
                              />
                            </div>
                          </div>
                          <p className="font-bold text-lg">{item.name}</p>
                          <p className="mt-0">Ukuran: {item.size}</p>
                        </div>
                        <div className="flex items-end justify-between mt-auto">
                          <QuantitySelector
                            quantity={item.quantity}
                            onIncrease={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            onDecrease={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          />
                          <p className="font-bold text-base">
                            IDR {Number(item.price).toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="w-full max-w-sm">
              <h1 className="font-semibold text-xl mb-4">Ringkasan pesanan</h1>
              <div className="flex justify-between">
                <p>Subtotal</p>
                IDR{" "}
                {selectedItems.length > 0
                  ? (calculateSubtotal() || 0).toLocaleString("id-ID")
                  : "0"}
              </div>
              <div className="flex mt-2 justify-between">
                <p>Biaya admin</p>
                <p>{selectedItems.length > 0 ? "IDR 3.000" : "IDR 0"}</p>
              </div>
              <div className="flex mt-2 justify-between">
                <p>Biaya pengiriman</p>
                <p>IDR 0</p>
              </div>
              <p className="mt-10 text-xs text-gray-400/70">
                Biaya pengiriman akan dihitung setelah memasukkan alamat di
                halaman pembayaran.
              </p>
              <div className="border-b mt-5"></div>
              <div className="flex mt-5 justify-between">
                <p>Total</p>
                IDR{" "}
                {selectedItems.length > 0
                  ? ((calculateSubtotal() || 0) + 3000).toLocaleString("id-ID")
                  : "0"}
              </div>
              <button
                onClick={handleOpen}
                className="bg-black text-white w-full py-2 rounded-lg mt-5"
              >
                Beli sekarang
              </button>
              <ModalSelectMethod
                open={openModal}
                handleClose={handleClose}
                onSelectMethod={handleSelectMethod} // Panggil handleSelectMethod untuk memilih metode
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col mx-auto items-center justify-center text-center">
          <img
            className="w-72 mx-auto mt-10"
            src="/images/emptycart.svg"
            alt="empty cart"
          />
          <p className="mt-10 font-semibold text-center">
            Oops, keranjang Anda masih kosong. <br /> Yuk, mulai belanja!
          </p>
          <Link
            to="/product"
            className="bg-black text-sm text-white px-6 mt-10 py-3 hover:bg-black/80 hover:-translate-y-1 duration-500 rounded-md"
          >
            Lanjut Belanja
          </Link>
        </div>
      )}
    </section>
  );
};

export default Cart;
