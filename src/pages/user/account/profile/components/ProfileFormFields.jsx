import FormInput from "../../../../../components/ui/TextField";

const TEXT_FIELDS = [
  {
    name: "firstname",
    label: "Nama depan",
    errorMsg: "Nama depan tidak boleh kosong",
    placeholder: "Contoh: Budi",
  },
  {
    name: "lastname",
    label: "Nama belakang",
    errorMsg: "Nama belakang tidak boleh kosong",
    placeholder: "Contoh: Santoso",
  },
  {
    name: "phone",
    label: "Nomor telepon",
    errorMsg: "Nomor telepon tidak boleh kosong",
    placeholder: "",
  },
];

const LOCATION_FIELDS = [
  {
    name: "province",
    label: "Provinsi",
    errorMsg: "Provinsi tidak boleh kosong",
    placeholder: "Contoh: Jawa Barat",
  },
  {
    name: "city",
    label: "Kota/kabupaten",
    errorMsg: "Kota tidak boleh kosong",
    placeholder: "Contoh: Tangerang Selatan",
  },
  {
    name: "postal_code",
    label: "Kode Pos",
    errorMsg: "Kode pos tidak boleh kosong",
    placeholder: "Isi dengan kode pos wilayahmu",
  },
];

const ProfileFormFields = ({ formData, error, isSubmitted, onChange }) => {
  const renderField = ({ name, label, errorMsg, placeholder }) => (
    <FormInput
      key={name}
      type="text"
      name={name}
      label={label}
      error={isSubmitted && error[name]}
      helperText={isSubmitted && error[name] ? errorMsg : placeholder}
      value={formData[name] || ""}
      onChange={onChange}
    />
  );

  return (
    <div className="mt-6 space-y-6 lg:w-[650px] lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10 lg:mt-7">
      {TEXT_FIELDS.map(renderField)}

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
          error={isSubmitted && error.address}
          helperText={
            isSubmitted && error.address
              ? "Alamat tidak boleh kosong"
              : "Tolong isi alamat lengkap, termasuk jalan, nomor rumah, dan RT/RW"
          }
          value={formData.address || ""}
          onChange={onChange}
        />
      </div>

      {LOCATION_FIELDS.map(renderField)}
    </div>
  );
};

export default ProfileFormFields;
