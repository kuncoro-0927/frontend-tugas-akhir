import { useState, useEffect } from "react";
import { instanceAdmin } from "../../../../utils/axiosAdmin";
import { showSnackbar } from "../../../CustomSnackbar";
import { IoClose } from "react-icons/io5";
import FormInput from "../../../TextField";
import { IoImageOutline } from "react-icons/io5";
import { Modal, Box, Button } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
const ModalCreateUser = ({ open, handleClose, onUpdate }) => {
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    role_id: "",
    postal_code: "",
    isverified: 1,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = "Nama Lengkap wajib diisi";
    if (!formData.firstname) newErrors.firstname = "Nama Depan wajib diisi";
    if (!formData.lastname) newErrors.lastname = "Nama Belakang wajib diisi";
    if (!formData.email) newErrors.email = "Email wajib diisi";
    if (!formData.password) newErrors.password = "Password wajib diisi";
    if (!formData.phone) newErrors.phone = "Nomor telepon wajib diisi";
    if (!formData.address) newErrors.address = "Alamat wajib diisi";
    if (!formData.city) newErrors.city = "Kota wajib diisi";
    if (!formData.province) newErrors.province = "Provinsi wajib diisi";
    if (!formData.role_id) newErrors.role_id = "Role wajib dipilih";
    if (!formData.postal_code) newErrors.postal_code = "Kode pos wajib dipilih";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      showSnackbar("Periksa kembali form Anda", "warning");
      return;
    }

    try {
      const res = await instanceAdmin.post("/create/users", formData);
      console.log(res);
      showSnackbar("Pengguna berhasil ditambahkan", "success");
      handleClose();
      onUpdate();
    } catch (err) {
      console.error("Error detail:", err);
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Data:", err.response.data);
      }
      showSnackbar("Gagal menambahkan Pengguna", "error");
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await instanceAdmin.get("/roles");
        setRoles(res.data);
        console.log("role", res.data);
      } catch (err) {
        console.error("Gagal mengambil role:", err);
      }
    };

    fetchRoles();
  }, []);

  useEffect(() => {
    if (!open) {
      setFormData({
        name: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        role_id: "",
        postal_code: "",
        isverified: 1,
      });
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") handleClose();
      }}
    >
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
          maxHeight: "90vh",
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome/Safari/Edge
          },
        }}
      >
        <div>
          <div
            className="bg-blue-400/10"
            style={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <button
              onClick={handleClose}
              className="text-2xl flex pt-4 pr-4 justify-end ml-auto"
            >
              <IoClose />
            </button>
            <div className="px-5 pb-2">
              <h2 className="text-2xl font-bold text-hitam2">
                Tambah Pengguna
              </h2>
            </div>
          </div>
          <div className="mx-5 mt-5 mb-7">
            <h1 className="font-bold text-lg">Lengkapi Detail Pengguna</h1>
            <p className="text-sm text-graytext">
              Isi detail pengguna agar mudah dikenali.
            </p>
          </div>

          <form className="px-6 mt-5 pb-6" onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="flex gap-5">
                <FormInput
                  name="name"
                  type="text"
                  value={formData.name}
                  label="Nama Lengkap"
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />{" "}
              </div>

              <div className="flex gap-5">
                <FormInput
                  name="firstname"
                  type="text"
                  value={formData.firstname}
                  label="Nama Depan"
                  onChange={handleChange}
                  error={!!errors.firstname}
                  helperText={errors.firstname}
                />{" "}
                <FormInput
                  name="lastname"
                  type="text"
                  value={formData.lastname}
                  label="Nama Belakang"
                  onChange={handleChange}
                  error={!!errors.lastname}
                  helperText={errors.lastname}
                />{" "}
              </div>

              <div className="flex gap-5">
                <FormInput
                  name="email"
                  type="text"
                  value={formData.email}
                  label="Email"
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />{" "}
                <FormInput
                  name="password"
                  type="password"
                  value={formData.password}
                  label="Password"
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />{" "}
              </div>
              <MuiTelInput
                value={formData.phone}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, phone: value }))
                }
                fullWidth
                label="Nomor Telepon"
                size="small"
                error={!!errors.phone}
                helperText={errors.phone}
                defaultCountry="ID"
                InputLabelProps={{
                  sx: {
                    fontSize: "0.78rem",
                    pointerEvents: "none",
                  },
                }}
                InputProps={{
                  sx: {
                    "& input": {
                      fontSize: "0.87rem",
                      lineHeight: "2.2",
                      transition: "transform 0.2s ease",
                    },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "49px",
                    fontSize: "1rem",
                    color: "black !important",
                    "& fieldset": {
                      borderWidth: "0.3px !important",
                      borderColor: "gray !important",
                    },
                    "&:hover fieldset": {
                      borderWidth: "0.5px !important",
                      borderColor: "black !important",
                    },
                    "&.Mui-focused fieldset": {
                      borderWidth: "1.5px !important",
                      borderColor: "black !important",
                    },
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black !important",
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray !important",
                  },
                  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                    fontSize: "1rem",
                    color: "black !important",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    fontSize: "1rem",
                    color: "black !important",
                  },
                  "& .MuiOutlinedInput-input": {
                    marginTop: 0,
                  },
                }}
              />

              <FormInput
                name="address"
                type="text"
                label="Alamat Lengkap"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
              />
              <div className="flex gap-5">
                <FormInput
                  name="province"
                  type="text"
                  label="Provinsi"
                  value={formData.province}
                  onChange={handleChange}
                  error={!!errors.province}
                  helperText={errors.province}
                />
                <FormInput
                  name="city"
                  type="text"
                  label="Kota"
                  value={formData.city}
                  onChange={handleChange}
                  error={!!errors.city}
                  helperText={errors.city}
                />
              </div>
              <div className="flex gap-5">
                <FormInput
                  name="postal_code"
                  type="text"
                  label="Kode Pos"
                  value={formData.postal_code}
                  onChange={handleChange}
                  error={!!errors.postal_code}
                  helperText={errors.postal_code}
                />
                <FormInput
                  name="role_id"
                  type="select"
                  label="Role"
                  value={formData.role_id}
                  options={roles.map((cat) => ({
                    value: cat.id,
                    label: cat.name,
                  }))}
                  onChange={handleChange}
                  error={!!errors.role_id}
                  helperText={errors.role_id}
                />
              </div>
            </div>

            <div className="text-right mt-5 ">
              <button
                type="submit"
                className="bg-black px-4 py-2 text-white rounded-md hover:bg-black/80 duration-300"
                variant="contained"
                color="primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCreateUser;
