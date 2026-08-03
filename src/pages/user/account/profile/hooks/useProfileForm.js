import { useEffect, useState } from "react";
import { instance } from "../../../../../utils/axios";
import { showSnackbar } from "../../../../../components/ui/CustomSnackbar";

const INITIAL_FORM = {
  firstname: "",
  lastname: "",
  address: "",
  province: "",
  city: "",
  postal_code: "",
  phone: "",
};

const INITIAL_ERROR = {
  firstname: false,
  lastname: false,
  address: false,
  province: false,
  city: false,
  postal_code: false,
  phone: false,
};

export function useProfileForm() {
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [error, setError] = useState(INITIAL_ERROR);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await instance.get("/user");
        setFormData(res.data.data);
        setIsDataFetched(true);
      } catch (err) {
        console.error("Gagal fetch data user:", err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newError = Object.keys(INITIAL_ERROR).reduce((acc, key) => {
      acc[key] = (formData[key] || "").trim() === "";
      return acc;
    }, {});

    setError(newError);
    return !Object.values(newError).includes(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDataFetched) return;

    setIsSubmitted(true);
    if (!validateForm()) return;

    try {
      await instance.put("/user/profile", formData);
      showSnackbar("Update berhasil!", "success");
    } catch (err) {
      console.error("Gagal update:", err.response?.data);
      showSnackbar("Update gagal!", "error");
    }
  };

  return { formData, error, isSubmitted, handleChange, handleSubmit };
}
