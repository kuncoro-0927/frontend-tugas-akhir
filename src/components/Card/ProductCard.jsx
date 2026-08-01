import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { RiPokerHeartsLine, RiPokerHeartsFill } from "react-icons/ri";
import Card from "./Card";

const ProductCard = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  isAddingToCart,
  className = "",
}) => {
  const isSoldOut = product.stock === 0;

  return (
    <div className={`relative ${className}`}>
      <Link to={`/product/detail/${product.id}`} state={{ from: "produk" }}>
        <Card
          title={product.name}
          stock={product.stock}
          image={`${import.meta.env.VITE_BACKEND_URL}${product.image_url}`}
          price={Number(product.price).toLocaleString("id-ID")}
          average_rating={product.rating || "0.0"}
          status={product.status}
        />
      </Link>

      <div className="absolute top-1 right-1">
        <IconButton
          onClick={() => onToggleWishlist(product.id)}
          className="p-2"
        >
          <div className="bg-white pt-2 pb-2 px-2 rounded-full">
            {isWishlisted ? (
              <RiPokerHeartsFill className="text-red-500 text-xl" />
            ) : (
              <RiPokerHeartsLine className="text-xl" />
            )}
          </div>
        </IconButton>
      </div>

      <button
        className={`border duration-300 border-gray-400 font-medium flex items-center justify-center gap-2 text-sm px-5 py-2 rounded-full ${
          isSoldOut
            ? "text-black/50 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-100"
        }`}
        onClick={() => onAddToCart(product, 1)}
        disabled={isAddingToCart || isSoldOut}
      >
        {isSoldOut ? (
          <span>Sudah Terjual</span>
        ) : isAddingToCart ? (
          <span className="animate-pulse">Menambahkan...</span>
        ) : (
          "Tambah Item"
        )}
      </button>
    </div>
  );
};

export default ProductCard;
