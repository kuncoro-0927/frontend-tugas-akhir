import { useState, useEffect } from "react";
import { instance } from "../../utils/axios";
import { IoClose } from "react-icons/io5";
import { Modal, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { TextField } from "@mui/material";
import CardImage from "../Card/CardImage";
import { HiArrowRight } from "react-icons/hi2";
import FormInput from "../TextField";
export default function ModalSearch({ isOpen, handleClose, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsList, setProductsList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(1); // Set Kaligrafi (id: 1) aktif saat modal pertama dibuka
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const response = await instance.get("/user/categories");
          setCategories(response.data.categories);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };

      const fetchProducts = async () => {
        setLoading(true);
        try {
          const response = await instance.get("/product");
          setProductsList(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCategories();
      fetchProducts();
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeCategory !== null) {
      const filtered = productsList.filter(
        (product) => product.category_id === activeCategory
      );
      setFilteredProducts(filtered);
    }
  }, [activeCategory, productsList]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredProducts(
        productsList.filter((product) => product.category_id === activeCategory)
      );
    } else {
      setFilteredProducts(
        productsList.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, productsList, activeCategory]);

  const handleSelect = (item) => {
    onSelect(item);
    navigate(`/product/detail/${item.id}`);
    handleClose();
  };

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <Modal
      open={isOpen}
      onClose={(event, reason) => {
        if (reason !== "backdropClick") {
          handleClose();
        }
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
          width: { xs: "350px", sm: "600px" },
          maxWidth: "100%",
          maxHeight: { xs: "80vh", md: "90vh" },
        }}
      >
        <div className="p-6 md:p-7 h-screen">
          {/* Search input */}
          <div className="flex mb-4 items-center gap-10">
            <div className="w-full">
              <FormInput
                label="Cari produk"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                name="search"
              />
            </div>
            <button onClick={handleClose} className="text-2xl ml-auto">
              <IoClose />
            </button>
          </div>

          {/* Text untuk menemukan produk */}
          {searchTerm === "" && !loading && (
            <p className="font-bold mb-4">Temukan produk Anda di:</p>
          )}

          {/* Button untuk kategori */}
          <div className="flex overflow-x-auto scrollbar-hide items-center gap-2 md:gap-5 mb-4">
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={`p-2 cursor-pointer rounded-full px-4 py-2 ${
                  activeCategory === category.id
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black opacity-70"
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <p className="font-semibold text-sm ">{category.name}</p>
              </button>
            ))}
          </div>

          {/* Tampilkan produk berdasarkan kategori yang dipilih */}
          {loading ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="max-h-[350px] md:max-h-[350px] text-hitam2 overflow-y-auto">
              <div className="md:flex md:flex-wrap">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="w-1/2 p-2 relative group flex justify-start items-center gap-2 hover:bg-gray-100 hover:bg-opacity-80 cursor-pointer"
                  >
                    <div className="h-[75px] w-[75px] flex-shrink-0">
                      <CardImage
                        image={`${import.meta.env.VITE_BACKEND_URL}${
                          item.image_url
                        }`}
                        alt={item.name}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-sm truncate max-w-[130px]">
                        {item.name}
                      </p>
                      <p className="font-medium text-sm">
                        {item.category_name}
                      </p>
                      <p className="font-medium text-xs">{item.size}</p>
                    </div>

                    {/* Ikon muncul dengan animasi saat hover */}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-out ">
                      <HiArrowRight className="text-xl" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
}
