import { useState } from "react";

import FormInput from "../components/TextField";
import { instance } from "../utils/axios"; // Pastikan Anda menginstal axios (npm install axios)
import { showSnackbar } from "../components/CustomSnackbar";
import CircularProgress from "@mui/material/CircularProgress";
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
} from "react-icons/io5";
const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, email, message } = form;
    if (!name || !email || !message) {
      setFeedbackMsg("Mohon isi semua field yang wajib.");
      return;
    }

    try {
      setLoading(true);
      await instance.post("/send/feedback", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });
      setFeedbackMsg("Pesan berhasil dikirim! Terima kasih.");
      showSnackbar("Pesan berhasil dikirim!", "success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setFeedbackMsg("Terjadi kesalahan saat mengirim. Coba lagi nanti.");
      showSnackbar("Terjadi kesalahan saat mengirim", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="py-32 mt-16 md:mt-0 px-7 md:px-14 bg-gradient-to-l from-white to-birumuda">
        <div className="text-center space-y-2">
          <p className="font-bold text-2xl md:text-4xl">Hubungi kami</p>
          <p className="md:text-6xl text-5xl font-semibold ">
            Ada yang bisa <span className="font-extrabold">dibantu?</span>
          </p>
          <p className="text-base mt-2 text-graytext font-semibold">
            Tim kami siap membantu Anda dengan pertanyaan atau kebutuhan apa
            pun.
          </p>
        </div>
      </section>

      <section className="lg:justify-center lg:mx-32 2xl:mx-52 mx-4 mt-10 lg:mt-28 flex flex-col-reverse md:grid md:grid-cols-2 gap-10">
        <div className=" border p-4 rounded-lg  w-full">
          <h1 className="text-2xl font-bold mb-4">Punya pertanyaan?</h1>

          <p className="text-sm mt-2 text-graytext font-medium">
            Jika Anda memiliki pertanyaan, masukan, atau membutuhkan bantuan
            lebih lanjut, jangan ragu untuk menghubungi tim kami. Kami siap
            membantu Anda secepat mungkin.
          </p>

          <div className="flex mt-5 flex-col gap-4 mb-4">
            <FormInput
              type="text"
              name="name"
              label="Nama"
              value={form.name}
              onChange={handleChange}
            />
            <FormInput
              type="email"
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
            />
            <FormInput
              type="tel"
              name="phone"
              label="Nomor Telepon"
              value={form.phone}
              onChange={handleChange}
            />
            <FormInput
              type="textarea"
              name="message"
              label="Pesan / Masukan"
              value={form.message}
              onChange={handleChange}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-black text-white rounded-md py-3 hover:bg-black/80 duration-300"
            >
              {loading ? (
                <CircularProgress size={17} color="inherit" />
              ) : (
                "Kirim"
              )}
            </button>
            {feedbackMsg && (
              <p className="text-sm text-center text-gray-700 mt-2">
                {feedbackMsg}
              </p>
            )}
          </div>
        </div>
        <div className="p-4  h-fit w-full">
          <h1 className="text-xl font-semibold">Pusat Bantuan</h1>
          <p className="text-sm mt-2 text-gray-700">
            Kami senang dapat mendengar Anda, Jangan ragu untuk menghubungi kami
            melalui cara berikut.
          </p>

          <div className="mt-10 flex items-center gap-5">
            <div className="bg-birumuda w-fit p-3 rounded-full">
              <IoLocationOutline className="text-xl" />
            </div>
            <div className="space-y-1">
              <p className="font-bold">Alamat</p>

              <p className="text-sm font-medium">
                Cuwik Ngampel Ploso Pacitan, Pacitan, Jawa Timur, Indonesia
                63515
              </p>
            </div>
          </div>
          <h1 className="border-b mt-5"></h1>
          <div className="mt-10 flex items-center gap-5">
            <div className="bg-birumuda w-fit p-3 rounded-full">
              <IoCallOutline className="text-xl" />
            </div>
            <div className="space-y-1">
              <p className="font-bold">Nomor Telepon</p>

              <p className="text-xs font-medium">+62 819-3859-4567</p>
            </div>
          </div>
          <h1 className="border-b mt-5"></h1>
          <div className="mt-10 flex items-center gap-5">
            <div className="bg-birumuda w-fit p-3 rounded-full">
              <IoMailOutline className="text-xl" />
            </div>
            <div className="space-y-1">
              <p className="font-bold">Email</p>

              <p className="text-sm font-medium">fazaframe271@gmail.com</p>
            </div>
          </div>
          <h1 className="border-b mt-5"></h1>
        </div>
      </section>
    </>
  );
};

export default Contact;
