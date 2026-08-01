import { useEffect, useState } from "react";

export function useOrderItemsSearch(orderItems) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrderItems, setFilteredOrderItems] = useState([]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredOrderItems(orderItems);
      return;
    }

    const lowerSearch = searchQuery.toLowerCase();
    const filtered = orderItems.filter((order) => {
      try {
        return (
          order.order_code?.toLowerCase().includes(lowerSearch) ||
          order.product_name?.toLowerCase().includes(lowerSearch) ||
          order.price?.toString().includes(lowerSearch) ||
          order.quantity?.toString().includes(lowerSearch) ||
          order.total?.toString().includes(lowerSearch)
        );
      } catch (error) {
        console.error("Error filtering order item:", error, order);
        return false;
      }
    });

    setFilteredOrderItems(filtered);
  }, [searchQuery, orderItems]);

  return { searchQuery, setSearchQuery, filteredOrderItems };
}
