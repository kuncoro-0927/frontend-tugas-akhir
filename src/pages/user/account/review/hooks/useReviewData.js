import { useEffect, useState } from "react";
import { instance } from "../../../../../utils/axios";

export function useReviewData() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await instance.get("/product/review/user");
      setProducts(response.data);
    } catch (error) {
      console.error("Gagal memuat produk yang telah dipesan.", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await instance.get("/review/user");
      setReviews(response.data.reviews);
    } catch (error) {
      console.error("Gagal memuat ulasan.", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchReviews();
  }, []);

  const handleOpenReviewModal = (productId) => {
    setSelectedProductId(productId);
    setModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedProductId(null);
    setModalOpen(false);
  };

  const hasReviewedProduct = (product) =>
    reviews.some((review) => review.product_id === product.id);

  return {
    products,
    reviews,
    modalOpen,
    selectedProductId,
    handleOpenReviewModal,
    handleCloseReviewModal,
    hasReviewedProduct,
    refetchReviews: fetchReviews, // exposed so ModalReview's onSuccess can refresh this list
  };
}
