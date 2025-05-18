import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardImage from "../components/Card/CardImage";
import { instance } from "../utils/axios";
import QuantitySelector from "../components/QuantitySelector";
import { TfiClose } from "react-icons/tfi";
import { setItemCount, removeFromCart } from "../redux/cartSlice";
import { closeDrawer } from "../redux/cartDrawer";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { showSnackbar } from "../components/CustomSnackbar";
const Cart = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.cartDrawer.isDrawerOpen);
  const handleCloseDrawer = () => dispatch(closeDrawer());
  const [cartItems, setCartItems] = useState([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
  }, [isOpen]); // refresh saat cart dibuka

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) {
      await handleRemoveItem(cartId);
      return;
    }
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

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleRemoveItem = async (id) => {
    try {
      await instance.delete(`/delete/cart/${id}`);
      const updated = cartItems.filter((item) => item.id !== id);
      setCartItems(updated);
      dispatch(removeFromCart(id));
      dispatch(setItemCount(updated.length));
    } catch (error) {
      console.error("Gagal menghapus item:", error);
    }
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Keranjang kosong.");
      return;
    }

    setLoadingCheckout(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const res = await instance.post("/checkout", {
        items: cartItems,
      });

      handleCloseDrawer();
      navigate(`/shipping/form/${res.data.order_id}`);
    } catch (err) {
      console.error("Gagal melanjutkan pembayaran:", err);

      // Ambil pesan error dari response
      const errorMsg =
        err?.response?.data?.msg ||
        "Terjadi kesalahan saat melanjutkan pembayaran.";

      showSnackbar(errorMsg, "error");
    } finally {
      setLoadingCheckout(false);
    }
  };

  // const handleSelectMethod = async (method) => {
  //   setShippingMethod(method);
  //   handleClose();
  //   await handleCheckout(method);
  // };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => dispatch(closeDrawer())}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[100] h-full w-full max-w-[500px] bg-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <button
          className="flex justify-end items-center px-6 py-7"
          onClick={handleCloseDrawer}
        >
          <TfiClose className="text-lg" />
        </button>

        {cartItems && cartItems.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto pb-5  px-10 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 mb-10 rounded-lg transition"
                >
                  <div className="h-[90px] w-[90px] flex-shrink-0">
                    <CardImage
                      image={`${import.meta.env.VITE_BACKEND_URL}${
                        item.image_url
                      }`}
                      alt={item.name}
                    />
                  </div>
                  <div className="flex flex-col  justify-between w-full h-[110px]">
                    <p className="font-bold max-w-[250px]">{item.name}</p>

                    <p className="text-sm">{item.size}</p>

                    <div className="flex justify-between items-end mt-auto">
                      <div className="border-b-2 border-black px-2">
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          onDecrease={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        />
                      </div>
                      <p className="font-medium">
                        IDR {Number(item.price).toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t py-6 mx-10 ">
              <div className="space-y-2">
                <div className="flex font-semibold justify-between">
                  <p>Subtotal</p>
                  <p>
                    IDR {calculateSubtotal().toLocaleString("id-ID") || "0"}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Biaya pengiriman & admin dihitung di halaman pembayaran.
                </p>
                <button
                  onClick={handleCheckout}
                  disabled={loadingCheckout}
                  className={`w-full rounded-lg py-2 mt-4 transition 
    ${
      loadingCheckout
        ? "bg-gray-300 text-gray-700 opacity-50 cursor-not-allowed"
        : "bg-black text-white"
    }`}
                >
                  {loadingCheckout ? (
                    <CircularProgress size={17} color="inherit" />
                  ) : (
                    "Beli Sekarang"
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-10">
            <img
              src="/images/emptycart.svg"
              alt="Empty"
              className="w-64 mb-6"
            />
            <p className="text-center text-lg font-semibold">
              Oops, keranjang Anda masih kosong.
            </p>
            <Link
              to="/product"
              className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-opacity-80 transition"
              onClick={handleCloseDrawer}
            >
              Lanjut Belanja
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
