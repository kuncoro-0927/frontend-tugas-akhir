import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SidebarAccount from "../../../../components/SidebarforAccount";
import ModalReview from "../../../../components/Modal/ModalReview";
import ReviewTabs from "./components/ReviewTabs";
import ProductEmptyState from "./components/ProductEmptyState";
import ProductReviewCard from "./components/ProductReviewCard";
import ReviewCard from "./components/ReviewCard";
import { useReviewData } from "./hooks/useReviewData";

const Review = () => {
  const [activeTab, setActiveTab] = useState("products");
  const {
    products,
    reviews,
    modalOpen,
    selectedProductId,
    handleOpenReviewModal,
    handleCloseReviewModal,
    hasReviewedProduct,
    refetchReviews,
  } = useReviewData();

  return (
    <section className="flex min-h-screen mt-16 md:mt-0 2xl:mx-32">
      <ModalReview
        open={modalOpen}
        handleClose={handleCloseReviewModal}
        productId={selectedProductId}
        onSuccess={refetchReviews}
      />

      <div className="hidden sm:block md:block lg:block">
        <SidebarAccount />
      </div>

      <div className="mt-5 md:pt-8 lg:p-8 mx-7 w-full text-hitam">
        <h1 className="font-extrabold text-2xl md:text-3xl">Ulasan</h1>
        <p className="text-sm mb-5 flex items-center gap-1">
          Hanya produk yang sudah diterima yang bisa diulas.
          <Tooltip title="Produk yang ditampilkan adalah produk yang telah diterima. Jika Anda membeli lebih dari satu item yang sama, hanya satu yang ditampilkan.">
            <InfoOutlinedIcon style={{ fontSize: "17px" }} className="text-blue-500 cursor-pointer" />
          </Tooltip>
        </p>

        <ReviewTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === "products" ? (
          products.length === 0 ? (
            <ProductEmptyState />
          ) : (
            products.map((product) => (
              <ProductReviewCard
                key={product.id}
                product={product}
                isReviewed={hasReviewedProduct(product)}
                onOpenReviewModal={handleOpenReviewModal}
              />
            ))
          )
        ) : reviews.length === 0 ? (
          <p className="mt-10 text-center text-hitam font-bold">Anda belum memberikan ulasan.</p>
        ) : (
          reviews.map((review) => <ReviewCard key={review.id} review={review} />)
        )}
      </div>
    </section>
  );
};

export default Review;
