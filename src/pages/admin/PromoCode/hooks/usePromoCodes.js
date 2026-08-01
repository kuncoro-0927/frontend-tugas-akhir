import { useState, useEffect, useCallback } from "react";
import { instanceAdmin } from "../../../../utils/axiosAdmin";

const usePromoCodes = () => {
  const [promos, setPromos] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPromos = useCallback(async () => {
    try {
      const response = await instanceAdmin.get("/all/promo");
      setPromos(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch promos:", error);
    }
  }, []);

  useEffect(() => {
    fetchPromos();
  }, [fetchPromos]);

  // Filter pengguna berdasarkan search query
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredUsers(promos); // Jika tidak ada query, tampilkan semua pengguna
    } else {
      const filtered = promos.filter((user) => {
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
  }, [searchQuery, promos]);

  const handleToggle = async (id) => {
    try {
      await instanceAdmin.put(`/toggle/${id}`);
      fetchPromos(); // Refresh data setelah toggle
    } catch (error) {
      console.error("Gagal toggle status:", error);
    }
  };

  return {
    filteredUsers,
    searchQuery,
    setSearchQuery,
    fetchPromos,
    handleToggle,
  };
};

export default usePromoCodes;
