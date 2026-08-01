import React from "react";
import FormInput from "../../../../components/TextField";
import CityAutocomplete from "./CityAutocomplete";
import PhoneField from "./PhoneField";

const AddressForm = ({
  formData,
  formErrors,
  onChange,
  onPhoneChange,
  onSubmit,
  loadingOngkir,
  destinationResults,
  onSearchCity,
  onSelectCity,
}) => {
  return (
    <div className="max-w-[600px] h-full mb-10 lg:my-10 overflow-y-auto w-full">
      <h1 className="font-extrabold text-2xl md:text-3xl">
        Lengkapi Alamat Penerima
      </h1>
      <p className="mt-2">
        Mohon isi alamat lengkap untuk pengiriman barang ke tempat yang tepat.
        Pastikan data yang dimasukkan benar dan sesuai.
      </p>

      <form onSubmit={onSubmit} className="space-y-5  w-full mt-6">
        <div>
          <FormInput
            type="email"
            error={!!formErrors.email}
            helperText={formErrors.email}
            name="email"
            label="Email"
            value={formData.email || ""}
            onChange={onChange}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <FormInput
              type="text"
              name="firstName"
              label="Nama Depan"
              value={formData.firstName || ""}
              onChange={onChange}
              error={!!formErrors.firstName}
              helperText={formErrors.firstName}
            />
          </div>
          <div>
            <FormInput
              type="text"
              name="lastname"
              label="Nama Belakang"
              value={formData.lastname || ""}
              onChange={onChange}
              error={!!formErrors.lastname}
              helperText={formErrors.lastname}
            />
          </div>
        </div>

        <div>
          <FormInput
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={onChange}
            label="Alamat Lengkap"
            error={!!formErrors.address}
            helperText={formErrors.address}
          />
        </div>

        <CityAutocomplete
          formData={formData}
          formErrors={formErrors}
          onChange={onChange}
          onSearchCity={onSearchCity}
          destinationResults={destinationResults}
          onSelectCity={onSelectCity}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="relative">
              <FormInput
                type="text"
                name="province"
                value={formData.province}
                onChange={onChange}
                label="Provinsi"
                error={!!formErrors.province}
                helperText={formErrors.province}
              />
            </div>
          </div>

          <div>
            <FormInput
              type="text"
              label="Kode Pos"
              name="postalCode"
              value={formData.postalCode || ""}
              onChange={onChange}
              error={!!formErrors.postalCode}
              helperText={formErrors.postalCode}
            />
          </div>
        </div>

        <div>
          <PhoneField
            value={formData.phone}
            onChange={onPhoneChange}
            error={!!formErrors.phone}
            helperText={formErrors.phone}
          />
        </div>

        <button
          disabled={loadingOngkir}
          onClick={onSubmit}
          className="border mt-5 py-3 hover:bg-black/80 rounded-lg bg-black text-white px-3 w-full"
        >
          Bayar
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
