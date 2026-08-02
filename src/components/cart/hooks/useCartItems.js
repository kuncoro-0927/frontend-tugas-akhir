import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { instance } from "../../../utils/axios";
import { setItemCount, removeFromCart } from "../../../redux/cartSlice";

export function useCartItems(isOpen) {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await instance.get("/get/cart");
        setCartItems(res.data.data || []); // ← fallback kalau backend balikin null
      } catch (err) {
        console.error("Gagal ambil cart:", err);
        setCartItems([]); // ← fallback kalau request gagal
      }
    };
    fetchCart();
  }, [isOpen]);

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) {
      await handleRemoveItem(cartId);
      return;
    }
    try {
      await instance.patch(`/update/cart/${cartId}`, { quantity: newQuantity });
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cartId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    } catch (err) {
      console.error("Gagal update quantity:", err);
    }
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

  const subtotal = (cartItems || []).reduce((acc, item) => {
    const price = item.is_custom
      ? Number(item.custom_price)
      : Number(item.price);
    return acc + price * item.quantity;
  }, 0);

  return {
    cartItems: cartItems || [],
    updateQuantity,
    handleRemoveItem,
    subtotal,
  };
}
