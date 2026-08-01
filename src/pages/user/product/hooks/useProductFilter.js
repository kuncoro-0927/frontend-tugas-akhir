import { useEffect, useState } from "react";
import { instance } from "../../../../utils/axios";

const ITEMS_PER_PAGE = 9;

export function useProductFilter() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = ({ category, price, size, keyword }) => {
    setSelectedCategory(category);
    setSelectedPrice(price);
    setSelectedSize(size);
    setSearchKeyword(keyword);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await instance.get("/filtered/product", {
          params: {
            category: selectedCategory,
            size: selectedSize,
            min_price: selectedPrice?.[0] ?? null,
            max_price: selectedPrice?.[1] ?? null,
            keyword: searchKeyword || null,
          },
        });
        setProducts(res.data.data);
      } catch (err) {
        console.error("Gagal fetch produk:", err);
      }
    };
    fetchProducts();
  }, [selectedCategory, selectedPrice, selectedSize, searchKeyword]);

  const filterApplied = selectedCategory || selectedPrice || selectedSize;
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  return {
    products,
    currentProducts,
    filterApplied,
    currentPage,
    setCurrentPage,
    totalPages,
    handleFilterChange,
  };
}