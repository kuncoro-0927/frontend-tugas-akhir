import { Modal, Box, Radio } from "@mui/material";
import { IoClose } from "react-icons/io5";

const ShippingServiceModal = ({
  open,
  onClose,
  shippingOptions,
  selectedService,
  onSelectService,
}) => (
  <Modal open={open}>
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        boxShadow: 24,
        borderRadius: 5,
        width: { xs: "350px", sm: "550px" },
        maxWidth: "100%",
        maxHeight: { xs: "70vh", md: "90vh" },
      }}
    >
      <div>
        <div
          className="bg-blue-400/10 mb-3"
          style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
        >
          <button onClick={onClose} className="text-2xl flex p-4 justify-end ml-auto">
            <IoClose />
          </button>
          <div className="px-5 pb-2">
            <h2 className="text-2xl font-bold text-hitam2 mb-2">
              Pilih Layanan / Kurir
            </h2>
            <p className="text-sm">
              Untuk pengiriman, kami menggunakan layanan{" "}
              <span className="font-medium">JNE</span>.
            </p>
          </div>
        </div>
        <div className="flex justify-center mx-5 items-center">
          <div className="overflow-y-auto scrollbar-hide max-h-[40vh] text-black w-full">
            {[...shippingOptions]
              .sort((a, b) => a.cost - b.cost)
              .map((service, index) => (
                <div
                  className={`py-2 flex justify-start items-start pl-2 pr-2 md:pr-5 mt-2 rounded-lg cursor-pointer ${
                    selectedService?.service === service.service
                      ? "border bg-gray-100 border-gray-500"
                      : "bg-white border border-gray-300"
                  }`}
                  key={index}
                  onClick={() => onSelectService(service)}
                >
                  <Radio
                    checked={selectedService?.service === service.service}
                    size="small"
                    sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                  />
                  <div className="w-full items-center justify-between">
                    <div className="md:flex items-center justify-between">
                      <h1 className="font-semibold">
                        {service.name} - {service.service}
                      </h1>
                      <p className="text-sm ml-auto font-semibold">
                        IDR {parseInt(service.cost).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-gray-950/60 mt-1 font-medium text-sm">
                      <p>
                        Estimasi: <span>{service.etd}</span>
                      </p>
                      <p className="text-sm">
                        {service.description} - {service.name} -
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex justify-center mx-5 items-center pb-7 mt-5"></div>
      </div>
    </Box>
  </Modal>
);

export default ShippingServiceModal;