import { Link } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import CardImage from "../../../../../components/Card/CardImage";
import { formatDate } from "../../../../../utils/formatDate";

const ProductReviewCard = ({ product, isReviewed, onOpenReviewModal }) => (
  <div className="max-w-[800px] md:h-[150px] h-[120px] lg:h-[200px] mb-4 mt-5 md:mt-10 border flex border-gray-200 w-full rounded-lg shadow-sm">
    <div className="lg:h-[200px] h-[120px] md:h-[150px] md:w-[220px] w-[160px] lg:w-[300px]">
      <CardImage image={`${import.meta.env.VITE_BACKEND_URL}${product.image_url}`} />
    </div>
    <div className="p-4 w-full md:p-4 flex flex-col justify-start">
      <h1 className="font-bold text-xs text-black/60 md:text-sm">{product.category_name}</h1>
      <h1 className="font-bold text-sm lg:text-xl">{product.name}</h1>
      <p className="md:mt-3 mt-1 text-xs md:text-sm flex items-center">
        <CiCalendar className="md:text-lg text-base mr-1" />
        <span className="mr-1">Pesanan:</span> <span>{formatDate(product.ordered_at)}</span>
      </p>

      <div className="mt-2 md:mt-auto flex justify-between items-end">
        <button
          onClick={() => onOpenReviewModal(product.id)}
          disabled={isReviewed}
          className={`${
            isReviewed
              ? "bg-gray-100/70 text-gray-500/50 cursor-not-allowed"
              : "bg-black text-white"
          } md:px-4 px-2.5 w-fit py-1.5 rounded-md text-xs md:text-sm`}
        >
          {isReviewed ? "Selesai" : "Beri Ulasan"}
        </button>
        <Link to={`/product/detail/${product.id}`} className="underline md:text-sm text-xs">
          Lihat produk
        </Link>
      </div>
    </div>
  </div>
);

export default ProductReviewCard;
