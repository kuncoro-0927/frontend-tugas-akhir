import { useEffect, useState } from "react";
import { instanceAdmin } from "../../../../utils/axiosAdmin";

const useTotalAmount = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [changeLoading, setChangeLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChange = async () => {
      try {
        const response = await instanceAdmin.get("/total/amount/change");
        setPercentageChange(response.data.percentageChange);
      } catch (error) {
        console.error("Gagal mengambil persentase perubahan:", error);
      } finally {
        setChangeLoading(false);
      }
    };

    fetchChange();
  }, []);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await instanceAdmin.get("/total/amount");
        setTotalAmount(response.data.totalAmount);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Gagal memuat total amount");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalAmount();
  }, []);

  return { totalAmount, percentageChange, changeLoading, loading, error };
};

export default useTotalAmount;
