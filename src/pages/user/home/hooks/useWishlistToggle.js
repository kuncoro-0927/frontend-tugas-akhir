import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist, fetchWishlist } from "../../../../redux/wishlistSlice";
import { showSnackbar } from "../../../../components/CustomSnackbar";

export function useWishlistToggle({ isLoggedIn, userId, onRequireAuth }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const handleToggleWishlist = (productId) => {
    if (!isLoggedIn) {
      onRequireAuth();
      return;
    }

    dispatch(toggleWishlist({ productId, user_id: userId }))
      .unwrap()
      .then((res) => {
        showSnackbar(res.message || "Berhasil ubah wishlist", "success");
        dispatch(fetchWishlist(userId));
      })
      .catch((err) => {
        showSnackbar(err?.message || err || "Gagal mengubah wishlist", "error");
      });
  };

  const isProductInWishlist = (productId) =>
    Array.isArray(wishlist) && wishlist.some((item) => item?.id === productId);

  return { handleToggleWishlist, isProductInWishlist };
}