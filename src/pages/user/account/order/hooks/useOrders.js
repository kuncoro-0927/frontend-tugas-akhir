import { useEffect, useState } from "react";
import { instance } from "../../../../../utils/axios";

export function useOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await instance.get("/orders/user/full");
        setOrders(res.data);
      } catch (err) {
        console.error("Gagal mengambil pesanan:", err);
      }
    };
    fetchOrders();
  }, []);

  return { orders };
}