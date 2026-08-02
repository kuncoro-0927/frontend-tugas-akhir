import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import AuthModal from "../../auth/AuthModal";
import Hero from "./sections/Hero";
import Gallery from "./sections/Gallery";
import WhyChooseUs from "./sections/WhyChooseUs";
import Testimonials from "./sections/Testimonials";
import { useHomeProducts } from "./hooks/useHomeProducts";
import { useWishlistToggle } from "./hooks/useWishlistToggle";

const Home = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const { products, loadingProductId, addCart } = useHomeProducts({
    userId: user?.id,
  });
  const { handleToggleWishlist, isProductInWishlist } = useWishlistToggle({
    isLoggedIn,
    userId: user?.id,
    onRequireAuth: () => setOpenAuthModal(true),
  });

  useEffect(() => {
    if (isLoggedIn) setOpenAuthModal(false);
  }, [isLoggedIn]);

  const handleAddToCart = (product, quantity) => {
    if (!isLoggedIn) {
      setOpenAuthModal(true);
      return;
    }
    addCart(product, quantity);
  };

  return (
    <>
      <AuthModal
        open={openAuthModal}
        handleClose={() => setOpenAuthModal(false)}
        initialContent="login"
      />
      <Hero />
      <Gallery
        products={products}
        loadingProductId={loadingProductId}
        isProductInWishlist={isProductInWishlist}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
};

export default Home;
