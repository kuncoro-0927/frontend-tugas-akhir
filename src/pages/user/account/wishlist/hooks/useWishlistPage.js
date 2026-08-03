import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleWishlist,
  fetchWishlist,
} from "../../../../../redux/wishlistSlice";
import { showSnackbar } from "../../../../../components/ui/CustomSnackbar";
import { useAddToCart } from "../../../../../hooks/user/useAddToCart";
export function useWishlistPage() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const { loadingProductId, addCart } = useAddToCart({ userId: user?.id });

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [isLoggedIn, user?.id, dispatch]);

  const isProductInWishlist = (productId) =>
    Array.isArray(wishlist) &&
    wishlist.some((item) => item && item.id === productId);

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

  return {
    wishlist: Array.isArray(wishlist) ? wishlist : [],
    loadingProductId,
    isProductInWishlist,
    handleToggleWishlist,
    addCart,
  };
}
