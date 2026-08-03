import { useDispatch } from "react-redux";
import { instance } from "../../../../utils/axios";
import { addToCart } from "../../../../redux/cartSlice";
import { fetchCartItemCount } from "../../../../redux/cartSlice";
import { showSnackbar } from "../../../../components/ui/CustomSnackbar";

export default function useAddToCart(user) {
  const dispatch = useDispatch();

  const addCart = async (
    product,
    quantity,
    { file, custom_width, custom_height, custom_notes, customPrice }
  ) => {
    try {
      const formData = new FormData();
      formData.append("product_id", product.id);
      formData.append("quantity", quantity);
      if (file) formData.append("image", file);
      if (custom_width) formData.append("custom_width", custom_width);
      if (custom_height) formData.append("custom_height", custom_height);
      if (custom_notes) formData.append("custom_notes", custom_notes);
      formData.append("custom_price", customPrice);

      await instance.post("/add/to/cart", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(
        addToCart({
          product_id: product.id,
          name: product.name,
          weight: product.weight,
          quantity,
          image: file ? URL.createObjectURL(file) : null,
          custom_width,
          custom_height,
          custom_notes,
          custom_price: customPrice,
        })
      );

      dispatch(fetchCartItemCount(user.id));
      showSnackbar("Produk berhasil ditambahkan ke keranjang!", "success");
    } catch (err) {
      console.error("Gagal menambahkan produk ke cart:", err.message);
      showSnackbar("Gagal menambahkan produk ke keranjang", "error");
    }
  };

  return { addCart };
}
