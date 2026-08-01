import { IoInformation } from "react-icons/io5";

const ShippingCourierSection = ({ formData, selectedService, onOpenModal }) => (
  <div className="border-b pb-2 flex items-start justify-between border-gray-400 max-w-[700px]">
    <div>
      <h1 className="font-bold text-2xl">Layanan/Kurir</h1>
      <div>
        <p className="text-sm mt-3">
          <span className="font-bold text-sm">Pengiriman ke:</span>
          {formData?.firstName} / {formData?.lastname} / {formData?.address} /{" "}
          {formData?.phone}
        </p>

        {selectedService ? (
          <p className="text-sm mt-3">
            <span className="mt-2 font-bold">Layanan:</span>{" "}
            {selectedService.name} - {selectedService.service} / Estimasi:{" "}
            <span className="font-extrabold">{selectedService.etd}</span> /
            Biaya:{" "}
            <span className="font-bold">
              IDR {parseInt(selectedService.cost).toLocaleString()}
            </span>
          </p>
        ) : (
          <p className="mt-3 text-sm text-gray-500">
            Silakan pilih layanan terlebih dahulu
          </p>
        )}
      </div>
    </div>

    <button
      onClick={onOpenModal}
      className="bg-black hover:-translate-y-1 duration-300 p-0.5 rounded-full w-fit"
    >
      <IoInformation className="text-white text-base" />
    </button>
  </div>
);

export default ShippingCourierSection;