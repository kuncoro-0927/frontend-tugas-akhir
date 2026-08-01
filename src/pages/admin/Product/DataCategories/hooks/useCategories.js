import { useState, useEffect, useCallback } from "react";
import { instanceAdmin } from "../../../../../utils/axiosAdmin";
const useCategories = () => {
  const [categoriesItems, setCategoriesItems] = useState([]);
  const [filteredCategoriesItems, setFilteredCategoriesItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const response = await instanceAdmin.get("/all/category");
      setCategoriesItems(response.data.categories);
      setFilteredCategoriesItems(response.data.categories);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredCategoriesItems(categoriesItems);
    } else {
      const filtered = categoriesItems.filter((category) => {
        try {
          const lowerSearch = searchQuery.toLowerCase();
          return category.name?.toLowerCase().includes(lowerSearch);
        } catch (error) {
          console.error("Error filtering order item:", error, category);
          return false;
        }
      });

      setFilteredCategoriesItems(filtered);
    }
  }, [searchQuery, categoriesItems]);

  return {
    filteredCategoriesItems,
    searchQuery,
    setSearchQuery,
    fetchCategories,
  };
};

export default useCategories;
