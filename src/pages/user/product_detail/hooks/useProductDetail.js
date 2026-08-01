import { useEffect, useState } from "react";
import { instance } from "../../../../utils/axios";
export default function useProductDetail(id) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await instance.get(`/product/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Gagal ambil detail produk:", err);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  return { product };
}
