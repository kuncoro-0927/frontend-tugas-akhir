import { useEffect, useState } from "react";
import { instance } from "../../../../utils/axios";

export default function useOrderDetails(orderId) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await instance.get(`/detail/order/${orderId}`);
        setOrderDetails(response.data.order);
        setOrderItems(response.data.items);
      } catch (error) {
        console.error("Gagal mengambil detail pesanan:", error);
      }
    };

    if (orderId) fetchOrderDetails();
  }, [orderId]);

  const totalWeight = orderItems.reduce((acc, item) => {
    return acc + (item.weight_gram || 0) * item.quantity;
  }, 0);

  return { orderDetails, orderItems, totalWeight };
}
