import SidebarAccount from "../../components/SidebarforAccount";
import { instance } from "../../utils/axios";
import { useState, useEffect } from "react";
import FormInput from "../../components/TextField";
import { InputAdornment } from "@mui/material";
import { showSnackbar } from "../../components/CustomSnackbar";

const Profile = () => {
  const [isDataFetched, setIsDataFetched] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    province: "",
    city: "",
    postal_code: "",
    phone: "",
  });

  const [error, setError] = useState({
    firstname: false,
    lastname: false,
    address: false,
    province: false,
    city: false,
    postal_code: false,
    phone: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isDataFetched) {
      return;
    }

    const newError = {
      firstname: formData.firstname.trim() === "",
      lastname: formData.lastname.trim() === "",
      address: formData.address.trim() === "",
      province: formData.province.trim() === "",
      city: formData.city.trim() === "",
      postal_code: formData.postal_code.trim() === "",
      phone: formData.phone.trim() === "",
    };

    setError(newError);

    // If there is any error, don't submit the form
    if (Object.values(newError).includes(true)) {
      return;
    }

    try {
      const response = await instance.put("/user/profile", formData);
      console.log("Sukses update:", response.data);
      showSnackbar("Update berhasil!", "success");
    } catch (err) {
      console.error("Gagal update:", err.response?.data);
      showSnackbar("Update gagal!", "error");
    }
  };

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

  return (
    <section className="flex md:mb-0 mb-10 2xl:mx-32 ">
      <div className="hidden sm:block md:block lg:block ">
        <SidebarAccount />
      </div>
      <div className="md:p-8  mt-5 mx-4">
        <span className="font-extrabold text-3xl">Informasi Akun</span>
        <p>Lengkapi data akun anda untuk pemesanan</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mt-6 space-y-6  md:w-[650px] lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10 lg:mt-7">
            <FormInput
              type="text"
              name="firstname"
              label="Nama depan"
              error={error.firstname}
              helperText={
                error.firstname
                  ? "Nama depan tidak boleh kosong"
                  : "Contoh: Budi"
              }
              value={formData.firstname}
              onChange={handleChange}
            />

            <FormInput
              type="text"
              name="lastname"
              label="Nama belakang"
              error={error.lastname}
              helperText={
                error.lastname
                  ? "Nama belakang tidak boleh kosong"
                  : "Contoh: Santoso"
              }
              value={formData.lastname}
              onChange={handleChange}
            />

            <FormInput
              type="text"
              name="phone"
              label="Nomor telepon"
              error={error.phone}
              helperText={error.phone ? "Nomor telepon tidak boleh kosong" : ""}
              value={formData.phone}
              onChange={handleChange}
            />

            <FormInput
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formData.email || ""}
              disabled
            />

            <div className="lg:col-span-2">
              <FormInput
                type="text"
                name="address"
                label="Alamat lengkap"
                error={error.address}
                helperText={
                  error.address
                    ? "Alamat tidak boleh kosong"
                    : "Tolong isi alamat lengkap, termasuk jalan, nomor rumah, dan RT/RW"
                }
                value={formData.address || ""}
                onChange={handleChange}
              />
            </div>

            <FormInput
              type="text"
              name="province"
              label="Provinsi"
              error={error.province}
              helperText={
                error.province
                  ? "Provinsi tidak boleh kosong"
                  : "Contoh: Jawa Barat"
              }
              value={formData.province || ""}
              onChange={handleChange}
            />

            <FormInput
              type="text"
              name="city"
              label="Kota/kabupaten"
              error={error.city}
              helperText={
                error.city
                  ? "Kota tidak boleh kosong"
                  : "Contoh: Tangerang Selatan"
              }
              value={formData.city || ""}
              onChange={handleChange}
            />

            <FormInput
              type="text"
              name="postal_code"
              label="Kode Pos"
              error={error.postal_code}
              helperText={
                error.postal_code
                  ? "Kode pos tidak boleh kosong"
                  : "Isi dengan kode pos wilayahmu"
              }
              value={formData.postal_code || ""}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center ">
            <button
              type="submit"
              className="px-4 bg-black w-full md:w-fit text-white rounded-md mt-5 lg:mt-7 py-3 md:mr-5 lg:text-base lg:font-medium flex justify-center hover:-translate-y-1 duration-300 $"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
