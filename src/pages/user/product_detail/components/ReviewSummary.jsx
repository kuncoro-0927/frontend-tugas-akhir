import React from "react";
import Rating from "@mui/material/Rating";
import LinearProgress from "@mui/material/LinearProgress";

const ReviewSummary = ({ reviews }) => {
  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0;

  return (
    <div className="mt-3 lg:flex-col md:flex-row md:flex md:gap-20  lg:gap-10 lg:flex items-start justify-between text-hitam2 w-fit p-5 rounded-md">
      <div className="items-end gap-3">
        <h1 className="flex items-center text-3xl md:text-5xl font-extrabold text-hitam2">
          <Rating
            readOnly
            max={1}
            value={1}
            sx={{ fontSize: "4rem" }}
            className="mr-2"
          />
          {averageRating.toFixed(1)}
        </h1>
        <p className="mt-2">{reviews.length} ulasan terverifikasi</p>
      </div>

      <div>
        {[5, 4, 3, 2, 1].map((star) => {
          const count = reviews.filter((r) => r.rating === star).length;
          const percentage = (count / reviews.length) * 100 || 0;

          return (
            <div key={star} className="flex items-center gap-3 mb-1">
              <span className="text-sm font-semibold text-hitam2">{star}</span>
              <LinearProgress
                variant="determinate"
                value={percentage}
                color="inherit"
                sx={{
                  width: "270px",
                  borderRadius: 5,
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 5,
                  },
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewSummary;
