import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { instance } from "../../../../../utils/axios";
import { toggleWishlist, fetchWishlist } from "../../../../../redux/wishlistSlice";
import { addToCart, fetchCartItemCount } from "../../../../../redux/cartSlice";
import { showSnackbar } from "../../../../../components/CustomSnackbar";

export function useWishlistPage() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [loadingProductId, setLoadingProductId] = useState(null);

  // Redux `wishlist` is the single source of truth here — refresh it on mount
  // instead of keeping a separate local fetch (the old local state/fetch was
  // broken: `const [setWishlist] = useState([])` destructured the STATE
  // VALUE, not the setter, so it never actually updated anything).
  useEffect(() => {
    if (isLoggedIn && user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [isLoggedIn, user?.id, dispatch]);

  const isProductInWishlist = (productId) =>
    Array.isArray(wishlist) && wishlist.some((item) => item && item.id === productId);

  const handleToggleWishlist = (productId) => {
    if (!isLoggedIn) {
      showSnackbar("Silakan login terlebih dahulu", "warning");
      return;
    }

    dispatch(toggleWishlist({ productId, user_id: user.id }))
      .unwrap()
      .then((res) => {
        showSnackbar(res.message || "Berhasil ubah wishlist", "success");
        dispatch(fetchWishlist(user.id));
      })
      .catch((err) => {
        showSnackbar(err?.message || err || "Gagal mengubah wishlist", "error");
      });
  };

  const addCart = async (product, quantity) => {
    try {
      setLoadingProductId(product.id);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await instance.post("/add/to/cart", { product_id: product.id, quantity });

      dispatch(addToCart({ product_id: product.id, name: product.name, quantity }));
      dispatch(fetchCartItemCount(user.id));
      showSnackbar("Produk berhasil ditambahkan ke keranjang!", "success");
    } catch (err) {
      console.error("Gagal menambahkan produk ke cart:", err.message);
      showSnackbar("Gagal menambahkan produk ke keranjang", "error");
    } finally {
      setLoadingProductId(null);
    }
  };

  return {
    wishlist: Array.isArray(wishlist) ? wishlist : [],
    loadingProductId,
    isProductInWishlist,
    handleToggleWishlist,
    addCart,
  };
}
