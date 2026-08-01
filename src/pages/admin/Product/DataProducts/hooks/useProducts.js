import { useState, useEffect, useCallback } from "react";
import { instanceAdmin } from "../../../../../utils/axiosAdmin";
const useProducts = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = useCallback(async () => {
    try {
      const response = await instanceAdmin.get("/all/products");
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.role_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.city &&
            user.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (user.province &&
            user.province.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (user.phone &&
            user.phone.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      });
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const handleToggle = async (id) => {
    try {
      await instanceAdmin.put(`/toggle/status/${id}`);
      fetchProducts(); // Refresh data setelah toggle
    } catch (error) {
      console.error("Gagal toggle status:", error);
    }
  };

  return {
    filteredUsers,
    searchQuery,
    setSearchQuery,
    fetchProducts,
    handleToggle,
  };
};

export default useProducts;
