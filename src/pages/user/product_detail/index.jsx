import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import AuthModal from "../../auth/AuthModal";
import useProductDetail from "./hooks/useProductDetail";
import useProductReviews from "./hooks/useProductReviews";
import useCustomPrice from "./hooks/useCustomPrice";
import useWishlist from "./hooks/useWishlist";
import useAddToCart from "./hooks/useAddToCart";

import ProductBreadcrumb from "./components/ProductBreadcrumb";
import ProductGallery from "./components/ProductGallery";
import ProductHeader from "./components/ProductHeader";
import ProductInfo from "./components/ProductInfo";
import CustomizationForm from "./components/CustomizationForm";
import ActionButtons from "./components/ActionButtons";
import ReviewSummary from "./components/ReviewSummary";
import ReviewList from "./components/ReviewList";

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const from = location.state?.from;

  const { product } = useProductDetail(id);
  const { reviews, averageRating } = useProductReviews(id);

  const [file, setFile] = useState(null);
  const [custom_width, setWidth] = useState("");
  const [custom_height, setHeight] = useState("");
  const [custom_notes, setNotes] = useState("");

  const customPrice = useCustomPrice(product, custom_width, custom_height);

  const {
    isLoggedIn,
    user,
    openAuthModal,
    setOpenAuthModal,
    isProductInWishlist,
    handleToggleWishlist,
  } = useWishlist();

  const { addCart } = useAddToCart(user);

  const handleOrder = () => {
    if (!isLoggedIn) {
      setOpenAuthModal(true);
      return;
    }
    addCart(product, 1, {
      file,
      custom_width,
      custom_height,
      custom_notes,
      customPrice,
    });
  };

  const isCustomizable = [3, 4, 5].includes(product?.category_id);

  return (
    <>
      <section className="md:mx-[75px] mx-7 mt-10">
        <AuthModal
          open={openAuthModal}
          handleClose={() => setOpenAuthModal(false)}
          initialContent="login"
        />

        <ProductBreadcrumb productName={product?.name} from={from} />

        <div className="md:mt-10 mt-5 md:flex md:gap-10 lg:gap-20">
          <ProductGallery
            imageUrl={`${import.meta.env.VITE_BACKEND_URL}${
              product?.image_url
            }`}
          />

          <div className="flex flex-col md:w-1/2">
            <ProductHeader
              product={product}
              customPrice={customPrice}
              averageRating={averageRating}
              reviewCount={reviews.length}
            />

            <div className="flex flex-col gap-2 mt-3">
              <ProductInfo product={product} />

              {isCustomizable && (
                <CustomizationForm
                  file={file}
                  setFile={setFile}
                  custom_width={custom_width}
                  setWidth={setWidth}
                  custom_height={custom_height}
                  setHeight={setHeight}
                  custom_notes={custom_notes}
                  setNotes={setNotes}
                />
              )}

              <ActionButtons
                product={product}
                onOrder={handleOrder}
                isInWishlist={product ? isProductInWishlist(product.id) : false}
                onToggleWishlist={() => handleToggleWishlist(product.id)}
              />
            </div>
          </div>
        </div>
        <div className="border-t mt-10 md:pb-10"></div>
      </section>

      <section className="md:mx-[75px] mx-7 pb-20">
        <div className="mt-7">
          <h2 className="text-2xl text-hitam2 font-extrabold">
            Ulasan Pengguna
          </h2>
        </div>

        <div className="lg:flex items-start justify-start md:gap-10">
          <ReviewSummary reviews={reviews} />

          <div className="w-full mt-5">
            <ReviewList reviews={reviews} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
