import ProductCard from "../../../../components/Card/ProductCard";

const Gallery = ({
  products,
  loadingProductId,
  isProductInWishlist,
  onToggleWishlist,
  onAddToCart,
}) => (
  <section className="py-6 md:py-8 2xl:py-16 mx-7 sm:mx-12 md:mx-24 lg:mx-14 2xl:mx-32">
    <div className="flex justify-between items-center">
      <h1 className="font-extrabold text-2xl md:text-3xl">Galeri Kami</h1>
      <button className="border border-gray-300 py-2 px-5 rounded-full text-sm hover:-translate-y-1 duration-300">
        Lihat semua
      </button>
    </div>

    {/* Mobile Carousel */}
    <div className="flex md:hidden mt-6 gap-4 overflow-x-auto scrollbar-hide">
      {products.slice(0, 8).map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          className="min-w-[250px] flex-shrink-0"
          isWishlisted={isProductInWishlist(product.id)}
          onToggleWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
          isAddingToCart={loadingProductId === product.id}
        />
      ))}
    </div>

    {/* Desktop Grid */}
    <div className="hidden md:grid mt-10 justify-between md:grid-cols-3 lg:grid-cols-4 gap-10">
      {products.slice(0, 8).map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishlisted={isProductInWishlist(product.id)}
          onToggleWishlist={onToggleWishlist}
          onAddToCart={onAddToCart}
          isAddingToCart={loadingProductId === product.id}
        />
      ))}
    </div>
  </section>
);

export default Gallery;