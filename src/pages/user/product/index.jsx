import { useState } from "react";
import { useSelector } from "react-redux";
import SidebarProduct from "./components/SidebarProduct";
import DrawerProduct from "./components/DrawerProduct";
import ProductListHeader from "./components/ProductListHeader";
import ProductGrid from "./components/ProductGrid";
import Pagination from "./components/Pagination";
import { useProductFilter } from "./hooks/useProductFilter";
import { useWishlistToggle } from "./hooks/useWishlistToggle";
import { useAddToCart } from "../../../hooks/user/useAddToCart";

const Product = () => {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const {
    currentProducts,
    filterApplied,
    products,
    currentPage,
    setCurrentPage,
    totalPages,
    handleFilterChange,
  } = useProductFilter();

  const { handleToggleWishlist, isProductInWishlist } = useWishlistToggle({
    isLoggedIn,
    userId: user?.id,
  });

  const { loadingProductId, addCart } = useAddToCart({ userId: user?.id });

  return (
    <section className="md:mx-24 lg:mx-14 2xl:mx-32 mx-7 mt-10 md:pb-10">
      <DrawerProduct
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onFilterChange={handleFilterChange}
      />

      <div className="lg:flex mt-3 md:mt-10 md:gap-10">
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <SidebarProduct onFilterChange={handleFilterChange} />
          </div>
        </div>

        <div className="w-full">
          <ProductListHeader
            filterApplied={filterApplied}
            productCount={products.length}
            onOpenDrawer={() => setIsDrawerOpen(true)}
          />

          <ProductGrid
            products={currentProducts}
            loadingProductId={loadingProductId}
            isProductInWishlist={isProductInWishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={addCart}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
};

export default Product;
