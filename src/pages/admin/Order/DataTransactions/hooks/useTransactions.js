import { useState, useEffect, useCallback } from "react";
import { instanceAdmin } from "../../../../../utils/axiosAdmin";
const useTransactions = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [filteredOrderItems, setFilteredOrderItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await instanceAdmin.get("/all/transactions");
      setOrderItems(response.data);
      setFilteredOrderItems(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredOrderItems(orderItems);
    } else {
      const filtered = orderItems.filter((order) => {
        try {
          const lowerSearch = searchQuery.toLowerCase();
          return (
            order.order_code?.toLowerCase().includes(lowerSearch) ||
            order.product_name?.toLowerCase().includes(lowerSearch) ||
            order.price?.toString().toLowerCase().includes(lowerSearch) ||
            order.quantity?.toString().toLowerCase().includes(lowerSearch) ||
            order.total?.toString().toLowerCase().includes(lowerSearch)
          );
        } catch (error) {
          console.error("Error filtering order item:", error, order);
          return false;
        }
      });

      setFilteredOrderItems(filtered);
    }
  }, [searchQuery, orderItems]);

  return {
    filteredOrderItems,
    searchQuery,
    setSearchQuery,
    fetchTransactions,
  };
};

export default useTransactions;
