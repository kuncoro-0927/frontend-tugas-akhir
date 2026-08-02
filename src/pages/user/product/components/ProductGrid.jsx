import ProductCard from "../../../../components/Card/ProductCard";

const ProductGrid = ({
  products,
  loadingProductId,
  isProductInWishlist,
  onToggleWishlist,
  onAddToCart,
}) => (
  <div className="lg:grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
    {products.map((product) => (
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
);

export default ProductGrid;
