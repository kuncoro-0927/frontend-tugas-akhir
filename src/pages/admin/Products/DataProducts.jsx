import React, { useEffect, useState, useRef } from "react";
import AdminNavBar from "../../../components/Admin/AdminNavBar";
import SidebarAdmin from "../../../components/Admin/SidebarAdmin";
import { instanceAdmin } from "../../../utils/axiosAdmin";
import { LuPackagePlus } from "react-icons/lu";
import CardImage from "../../../components/Card/CardImage";
import ModalCreateProduct from "../../../components/Admin/Modal/Products/CreateProduct";
import ModalEditProduct from "../../../components/Admin/Modal/Products/UpdateProduct";
import ModalDeleteProduct from "../../../components/Admin/Modal/Products/DeleteProduct";
import DetailProduct from "../../../components/Admin/Modal/Products/DetailProduct";
const DataProducts = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = (productId) => {
    setSelectedProductId(productId);
    setDrawerOpen(true);
  };
  const handleCloseEditModal = () => setEditModal(false);
  const handleOpenEditModal = (productId) => {
    setSelectedProductId(productId);
    setEditModal(true);
  };
  const handleCloseDeleteModal = () => setDeleteModal(false);
  const handleOpenDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setDeleteModal(true);
  };
  const handleOpenCreateModal = () => setCreateModal(true);
  const handleCloseCreateModal = () => setCreateModal(false);
  const handleDeleteSuccess = () => {
    fetchProducts();
  };
  const handleCreateSuccess = () => {
    fetchProducts();
  };
  const handleEditSuccess = () => {
    fetchProducts();
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleSidebarHover = (isHovered) => {
    setIsSidebarHovered(isHovered);
  };

  const fetchProducts = async () => {
    try {
      const response = await instanceAdmin.get("/all/products");
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) => {
        return (
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.role_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (user.city &&
            user.city.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (user.province &&
            user.province.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (user.phone &&
            user.phone.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      });
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleToggle = async (id) => {
    try {
      await instanceAdmin.put(`/toggle/status/${id}`);
      fetchProducts(); // Refresh data setelah toggle
    } catch (error) {
      console.error("Gagal toggle status:", error);
    }
  };

  return (
    <section className="flex gap-10">
      <DetailProduct
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        productId={selectedProductId}
      />
      <ModalCreateProduct
        open={createModal}
        handleClose={handleCloseCreateModal}
        onUpdate={handleCreateSuccess}
      />
      <ModalEditProduct
        open={editModal}
        handleClose={handleCloseEditModal}
        productId={selectedProductId}
        onUpdate={handleEditSuccess}
      />
      <ModalDeleteProduct
        open={deleteModal}
        handleClose={handleCloseDeleteModal}
        productId={selectedProductId}
        onUpdate={handleDeleteSuccess} // ✅ ini akan memicu fetch ulang data
      />

      <div
        className={`h-screen  fixed top-0 left-0 z-40 transition-all duration-300 ${
          isSidebarCollapsed ? "w-[100px]" : "w-[250px]"
        }`}
      >
        <SidebarAdmin
          onSidebarHover={handleSidebarHover} // Pass hover handler to SidebarAdmin
          isSidebarCollapsed={isSidebarCollapsed} // Pass collapsed state to SidebarAdmin
        />
      </div>
      <div
        className={`w-full transition-all duration-300 ${
          isSidebarCollapsed
            ? isSidebarHovered
              ? "ml-[250px]"
              : "ml-[100px]"
            : "ml-[250px]"
        }`}
      >
        <AdminNavBar onToggleSidebar={toggleSidebar} />
        <div className="mt-10 px-5 text-xl font-bold">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-extrabold">Data Produk</h1>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-600/80 duration-200 rounded-md text-white px-4 py-2 font-normal text-base"
            >
              <LuPackagePlus className="text-lg" />
              Tambah
            </button>
          </div>
          <div className="border p-5 mt-10">
            <div className="flex  items-start justify-between">
              <p className="font-bold text-sm">Tabel Data Produk</p>

              {/* Search Input */}
              <div className=" mb-4">
                <div className="max-w-md mx-auto">
                  <div className="relative flex items-center border border-gray-400 w-full h-10 rounded-lg focus-within:border-gray-700 bg-white overflow-hidden">
                    <div className="grid place-items-center h-full w-12 text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>

                    <input
                      className="peer h-full w-full outline-none text-sm text-gray-500 pr-2"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      id="search"
                      placeholder="Cari data pengguna"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="  px-0">
              <table className=" w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {[
                      "Nama",
                      "Ukuran / cm",
                      "Berat / gram",
                      "Kategori",
                      "Harga",
                      "Status",
                      "Aksi",
                    ].map((header, index) => (
                      <th
                        key={index}
                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                      >
                        <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                          {header}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((product) => (
                    <tr key={product.id}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="">
                            <CardImage
                              image={`${import.meta.env.VITE_BACKEND_URL}${
                                product.image_url
                              }`}
                              width="w-[70px]"
                              height="h-[70px]"
                            />
                          </div>
                          {/* <img
                            src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                            alt="John Michael"
                            className="inline-block relative object-cover object-center rounded-full w-9 h-9"
                          /> */}
                          <div className="">
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                              {product.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          {product.size}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            {product.weight_gram}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            {product.category_name}
                          </p>
                        </div>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                          IDR{" "}
                          {Number(product.price).toLocaleString("id-ID", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <button
                          onClick={() => handleToggle(product.id)}
                          className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                            product.status?.toLowerCase().trim() === "available"
                              ? "bg-green-100 border border-green-400"
                              : "bg-red-100 border border-red-400"
                          }`}
                        >
                          <div
                            className={`border  w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                              product.status?.toLowerCase().trim() ===
                              "available"
                                ? "translate-x-6 bg-green-200 border-green-400"
                                : "translate-x-0 bg-red-200 border-red-400"
                            }`}
                          ></div>
                        </button>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50 relative">
                        <div
                          className="relative inline-block text-left"
                          ref={dropdownRef}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(product.id);
                            }}
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
                          >
                            ⋮
                          </button>

                          {openDropdown === product.id && (
                            <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                              <div className="py-1">
                                <button
                                  onClick={() =>
                                    handleOpenEditModal(product.id)
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleOpenDrawer(product.id)}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Detail
                                </button>
                                <button
                                  onClick={() =>
                                    handleOpenDeleteModal(product.id)
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                  Hapus
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-5 text-gray-500"
                      >
                        Tidak ada data pengguna.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataProducts;
