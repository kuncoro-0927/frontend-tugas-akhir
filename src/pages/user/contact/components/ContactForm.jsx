import FormInput from "../../../../components/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const ContactForm = ({ form, loading, feedbackMsg, onChange, onSubmit }) => (
  <div className="border p-4 rounded-lg w-full">
    <h1 className="text-2xl font-bold mb-4">Punya pertanyaan?</h1>

    <p className="text-sm mt-2 text-graytext font-medium">
      Jika Anda memiliki pertanyaan, masukan, atau membutuhkan bantuan lebih
      lanjut, jangan ragu untuk menghubungi tim kami. Kami siap membantu Anda
      secepat mungkin.
    </p>

    <div className="flex mt-5 flex-col gap-4 mb-4">
      <FormInput type="text" name="name" label="Nama" value={form.name} onChange={onChange} />
      <FormInput type="email" name="email" label="Email" value={form.email} onChange={onChange} />
      <FormInput type="tel" name="phone" label="Nomor Telepon" value={form.phone} onChange={onChange} />
      <FormInput
        type="textarea"
        name="message"
        label="Pesan / Masukan"
        value={form.message}
        onChange={onChange}
      />
      <button
        onClick={onSubmit}
        disabled={loading}
        className="bg-black text-white rounded-md py-3 hover:bg-black/80 duration-300"
      >
        {loading ? <CircularProgress size={17} color="inherit" /> : "Kirim"}
      </button>
      {feedbackMsg && <p className="text-sm text-center text-gray-700 mt-2">{feedbackMsg}</p>}
    </div>
  </div>
);

export default ContactForm;