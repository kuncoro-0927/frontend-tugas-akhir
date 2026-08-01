import { useEffect, useState } from "react";
import { instanceAdmin } from "../../../../utils/axiosAdmin";

const useTotalProducts = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchTotalProducts = async () => {
    try {
      const response = await instanceAdmin.get("/all/products");
      setTotalProducts(response.data.total);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchTotalProducts();
  }, []);

  return { totalProducts, fetchTotalProducts };
};

export default useTotalProducts;
