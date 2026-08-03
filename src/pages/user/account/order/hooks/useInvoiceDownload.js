import { useState } from "react";
import { instance } from "../../../../../utils/axios";
import { showSnackbar } from "../../../../../components/ui/CustomSnackbar";

export function useInvoiceDownload() {
  const [loadingOrderId, setLoadingOrderId] = useState(null);

  const handleDownloadInvoice = async (orderId) => {
    setLoadingOrderId(orderId);
    try {
      const res = await instance.get(`/invoice/${orderId}`);
      window.open(`http://localhost:5000${res.data.invoiceUrl}`, "_blank");
    } catch (err) {
      console.error("Gagal mengambil invoice:", err);
      showSnackbar("Gagal mengunduh invoice.", "error");
    } finally {
      setLoadingOrderId(null);
    }
  };

  return { loadingOrderId, handleDownloadInvoice };
}