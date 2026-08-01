import ProductCard from "../../../../components/Card/ProductCard";

const ProductGrid = ({
  products,
  loadingProductId,
  isProductInWishlist,
  onToggleWishlist,
  onAddToCart,
}) => (
  <div className="lg:grid grid lg:grid-cols-3 gap-10">
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
