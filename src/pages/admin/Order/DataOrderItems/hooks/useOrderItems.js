import { useEffect, useState } from "react";
import { instanceAdmin } from "../../../../../utils/axiosAdmin";

export function useOrderItems() {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const response = await instanceAdmin.get("/all/order/items");
        setOrderItems(response.data);
      } catch (error) {
        console.error("Failed to fetch order items:", error);
      }
    };
    fetchOrderItems();
  }, []);

  return { orderItems };
}
