import SidebarAccount from "../../../../components/common/SidebarforAccount";
import ProductCard from "../../../../components/Card/ProductCard";
import WishlistEmptyState from "./components/WishlistEmptyState";
import { useWishlistPage } from "./hooks/useWishlistPage";

const Wishlist = () => {
  const { wishlist, loadingProductId, isProductInWishlist, handleToggleWishlist, addCart } =
    useWishlistPage();

  return (
    <section className="flex mt-16 md:mt-0 mb-10 md:mb-0 min-h-screen 2xl:mx-32">
      <div className="hidden sm:block md:block lg:block">
        <SidebarAccount />
      </div>
      <div className="mt-5 md:p-8 mx-7 w-full text-hitam">
        <h1 className="font-extrabold text-2xl md:text-3xl">Produk yang Anda sukai</h1>
        <p className="text-sm mt-1 mb-5 text-black/60">
          Yuk, lihat kembali produk yang sempat Anda sukai dan lanjutkan belanja sebelum
          kehabisan!
        </p>

        {wishlist.length === 0 ? (
          <WishlistEmptyState />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={isProductInWishlist(product.id)}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={addCart}
                isAddingToCart={loadingProductId === product.id}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
