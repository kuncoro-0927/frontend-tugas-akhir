import { useEffect, useState } from "react";
import { instance } from "../../../../utils/axios";

export default function useProductReviews(id) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await instance.get(`/review/product/${id}`);
        setReviews(res.data.reviews);
        const total = res.data.reviews.reduce((sum, r) => sum + r.rating, 0);
        const avg =
          res.data.reviews.length > 0 ? total / res.data.reviews.length : 0;
        setAverageRating(avg);
      } catch (error) {
        console.error("Gagal mengambil review produk:", error);
      }
    };

    if (id) fetchReviews();
  }, [id]);

  return { reviews, averageRating };
}
