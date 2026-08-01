import { useState, useEffect, useMemo, useCallback } from "react";
import { instanceAdmin } from "../../../../../utils/axiosAdmin";
const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("paid");

  const fetchOrders = useCallback(async () => {
    try {
      const response = await instanceAdmin.get("/all/orders");
      setOrders(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    try {
      if (searchQuery === "") {
        setFilteredUsers(orders);
      } else {
        const lowerSearch = searchQuery.toLowerCase();
        const filtered = orders.filter((order) => {
          return (
            order.order_code?.toLowerCase().includes(lowerSearch) ||
            order.user_name?.toLowerCase().includes(lowerSearch) ||
            order.user_email?.toLowerCase().includes(lowerSearch) ||
            order.status?.toLowerCase().includes(lowerSearch) ||
            order.total_amount?.toString().toLowerCase().includes(lowerSearch)
          );
        });
        setFilteredUsers(filtered);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat memfilter data:", error);
      setFilteredUsers([]); // fallback: kosongkan hasil jika error
    }
  }, [searchQuery, orders]);

  const filteredOrders = useMemo(
    () =>
      activeTab === "all"
        ? filteredUsers
        : filteredUsers.filter((order) => order.status === activeTab),
    [activeTab, filteredUsers]
  );

  return {
    orders,
    filteredUsers,
    filteredOrders,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    fetchOrders,
  };
};

export default useOrders;
