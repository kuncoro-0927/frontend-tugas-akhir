import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { instance } from "../../../../utils/axios";
import { addToCart, fetchCartItemCount } from "../../../../redux/cartSlice";
import { showSnackbar } from "../../../../components/CustomSnackbar";

export function useHomeProducts() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [loadingProductId, setLoadingProductId] = useState(null);

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

  const addCart = async (product, quantity) => {
    try {
      setLoadingProductId(product.id);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await instance.post("/add/to/cart", {
        product_id: product.id,
        quantity,
      });

      dispatch(
        addToCart({
          product_id: product.id,
          name: product.name,
          weight: product.weight_gram,
          quantity,
        }),
      );
      dispatch(fetchCartItemCount(user.id));
      showSnackbar("Produk berhasil ditambahkan ke keranjang!", "success");
    } catch (err) {
      console.error("Gagal menambahkan produk ke cart:", err.message);
      showSnackbar("Gagal menambahkan produk ke keranjang", "error");
    } finally {
      setLoadingProductId(null);
    }
  };

  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return { products: sortedProducts, loadingProductId, addCart };
}