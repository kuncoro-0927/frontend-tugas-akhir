import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import CardImage from "../../../../../components/Card/CardImage";
import { formatDate } from "../../../../../utils/formatDate";

const ReviewCard = ({ review }) => (
  <div className={review.is_deleted ? "opacity-70 grayscale pointer-events-none select-none" : ""}>
    <div className="md:h-[150px] lg:h-[200px] lg:max-w-[800px] h-[120px] mt-10 border flex border-gray-200 w-full rounded-t-lg shadow-sm">
      <div className="lg:h-[200px] h-[120px] md:h-[150px] md:w-[220px] w-[160px] lg:w-[300px]">
        <CardImage image={`${import.meta.env.VITE_BACKEND_URL}${review.image_url}`} />
      </div>
      <div className="px-4 py-2 md:p-4 w-full flex flex-col justify-start">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xs text-black/60 md:text-sm">{review.category_name}</h1>
          {review.is_deleted === 1 && (
            <h1 className="text-sm bg-red-100 px-3 py-2 text-red-500 rounded-md mb-2">
              Ulasan telah dihapus oleh admin
            </h1>
          )}
        </div>
        <h1 className="font-bold text-sm md:text-xl">{review.product_name}</h1>

        <p className="font-bold md:mt-0 lg:mt-5 text-xs md:text-sm">
          IDR {Number(review.price).toLocaleString("id-ID", { minimumFractionDigits: 2 })}
        </p>

        <div className="flex mt-auto justify-between items-end">
          <p className="mt-2 text-xs hidden md:flex md:text-sm items-center text-hitam2 font-semibold">
            Diberikan pada: {formatDate(review.created_at)}
          </p>
          <Link to={`/product/detail/${review.product_id}`} className="underline text-xs md:text-sm">
            Lihat produk
          </Link>
        </div>
      </div>
    </div>

    <div className="product-card p-2 max-w-[800px] mb-4 border border-gray-200 w-full rounded-b-lg shadow-sm">
      <p className="mt-2 mb-2 text-xs md:hidden md:text-sm items-center text-hitam2 font-semibold">
        Diberikan pada: {formatDate(review.created_at)}
      </p>
      <Rating name="read-only" value={review.rating} readOnly sx={{ fontSize: "1.5rem" }} />
      <p className="text-sm w-full md:max-w-[400px] lg:max-w-[700px] break-words md:text-base mt-1 md:mt-0 text-hitam2">
        {review.comment}
      </p>
    </div>
  </div>
);

export default ReviewCard;
