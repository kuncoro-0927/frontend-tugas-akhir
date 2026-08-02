import { useEffect, useState } from "react";
import { instance } from "../../../../utils/axios";
import { useAddToCart } from "../../../../hooks/user/useAddToCart";
export function useHomeProducts({ userId }) {
  const [products, setProducts] = useState([]);
  const { loadingProductId, addCart } = useAddToCart({ userId });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await instance.get("/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return { products: sortedProducts, loadingProductId, addCart };
}
