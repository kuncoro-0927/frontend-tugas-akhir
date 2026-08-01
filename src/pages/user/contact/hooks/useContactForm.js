import { useState } from "react";
import { instance } from "../../../../utils/axios";
import { showSnackbar } from "../../../../components/CustomSnackbar";

const INITIAL_FORM = { name: "", email: "", phone: "", message: "" };

export function useContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const { name, email, message } = form;
    if (!name || !email || !message) {
      setFeedbackMsg("Mohon isi semua field yang wajib.");
      return;
    }

    try {
      setLoading(true);
      await instance.post("/send/feedback", form);
      setFeedbackMsg("Pesan berhasil dikirim! Terima kasih.");
      showSnackbar("Pesan berhasil dikirim!", "success");
      setForm(INITIAL_FORM);
    } catch {
      setFeedbackMsg("Terjadi kesalahan saat mengirim. Coba lagi nanti.");
      showSnackbar("Terjadi kesalahan saat mengirim", "error");
    } finally {
      setLoading(false);
    }
  };

  return { form, loading, feedbackMsg, handleChange, handleSubmit };
}