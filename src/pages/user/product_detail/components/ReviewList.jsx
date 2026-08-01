import React from "react";
import Rating from "@mui/material/Rating";

const ReviewList = ({ reviews }) => {
  if (reviews.length === 0) {
    return <p className="text-gray-600">Belum ada ulasan untuk produk ini.</p>;
  }

  return (
    <>
      {reviews.map((review) => (
        <div key={review.id} className="mb-6">
          <Rating name="read-only" value={review.rating} readOnly />
          <h1 className="text-xs font-semibold mt-1">
            {review.user_name || "Anonymous"}
          </h1>
          <div className="text-base w-full border-b pb-5 mt-2 rounded-md max-w-full break-words">
            {review.comment || "Tidak ada komentar."}
          </div>
        </div>
      ))}
    </>
  );
};

export default ReviewList;
