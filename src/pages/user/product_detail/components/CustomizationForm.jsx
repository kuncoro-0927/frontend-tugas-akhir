import React from "react";
import FormInput from "../../../../components/ui/TextField";

const CustomizationForm = ({
  file,
  setFile,
  custom_width,
  setWidth,
  custom_height,
  setHeight,
  custom_notes,
  setNotes,
}) => {
  return (
    <>
      <h1 className="font-bold text-base">Mau Custom?</h1>
      <span className="text-sm font-medium text-black/60">
        Sesuaikan desain bingkai sesuai keinginanmu.
      </span>

      <div className="mt-4 max-w-md space-y-4 border p-4 rounded-lg bg-gray-50">
        <div>
          <label className="block font-semibold mb-1">Upload Foto</label>

          <input
            type="file"
            id="fileUpload"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
          />

          <button
            type="button"
            onClick={() => document.getElementById("fileUpload").click()}
            className="px-4 py-2 bg-black text-sm text-white rounded hover:bg-black/80"
          >
            Pilih Gambar
          </button>

          {file && <p className="mt-2 text-sm text-gray-700">{file.name}</p>}
        </div>

        <div className="flex items-center gap-4">
          <FormInput
            type="number"
            label="Lebar"
            value={custom_width}
            onChange={(e) => setWidth(e.target.value)}
          />
          <FormInput
            type="number"
            label="Tinggi"
            value={custom_height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div>
          <FormInput
            type="textarea"
            label="Catatan"
            value={custom_notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default CustomizationForm;
