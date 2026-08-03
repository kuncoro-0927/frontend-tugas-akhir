import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist,fetchWishlist } from "../../../../redux/wishlistSlice";
import { showSnackbar } from "../../../../components/ui/CustomSnackbar";
export default function useWishlist() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      setOpenAuthModal(false);
    }
  }, [isLoggedIn]);

  const isProductInWishlist = (productId) => {
    return (
      Array.isArray(wishlist) &&
      wishlist.some((item) => item && item.id === productId)
    );
  };

  const handleToggleWishlist = (productId) => {
    if (!isLoggedIn) {
      setOpenAuthModal(true);
      return;
    }

    dispatch(toggleWishlist({ productId, user_id: user.id }))
      .unwrap()
      .then((res) => {
        showSnackbar(res.message || "Berhasil ubah wishlist", "success");
        dispatch(fetchWishlist(user.id));
      })
      .catch((err) => {
        console.error("Toggle wishlist error:", err);
        showSnackbar(err?.message || err || "Gagal mengubah wishlist", "error");
      });
  };

  return {
    isLoggedIn,
    user,
    openAuthModal,
    setOpenAuthModal,
    isProductInWishlist,
    handleToggleWishlist,
  };
}
