import React, { useEffect, useState, useRef } from "react";
import AdminNavBar from "../../../components/Admin/AdminNavBar";
import SidebarAdmin from "../../../components/Admin/SidebarAdmin";
import ModalCreateCategory from "../../../components/Admin/Modal/Categories/CreateCategory";
import ModalUpdateCategory from "../../../components/Admin/Modal/Categories/UpdateCategory";
import { instanceAdmin } from "../../../utils/axiosAdmin";
import ModalDeleteCategory from "../../../components/Admin/Modal/Categories/DeleteCategory";
import { LuLayers } from "react-icons/lu";
import { BiLayerPlus } from "react-icons/bi";
const DataCategories = () => {
  const [categoriesItems, setCategoriesItems] = useState([]);
  const [filteredCategoriesItems, setFilteredCategoriesItems] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar collapsed by default
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const handleOpenCreateModal = () => setCreateModal(true);
  const handleCloseCreateModal = () => setCreateModal(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const handleCloseEditModal = () => setEditModal(false);
  const handleOpenEditModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setEditModal(true);
  };

  const handleCloseDeleteModal = () => setDeleteModal(false);
  const handleOpenDeleteModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setDeleteModal(true);
  };
  const handleCreateSuccess = () => {
    fetchCategories();
  };
  const handleEditSuccess = () => {
    fetchCategories();
  };
  const handleDeleteSuccess = () => {
    fetchCategories();
  };
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); // Toggle state
  };

  // Handle hover effect for sidebar
  const handleSidebarHover = (isHovered) => {
    setIsSidebarHovered(isHovered);
  };
  const fetchCategories = async () => {
    try {
      const response = await instanceAdmin.get("/all/category");
      setCategoriesItems(response.data.categories);
      setFilteredCategoriesItems(response.data.categories);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredCategoriesItems(categoriesItems);
    } else {
      const filtered = categoriesItems.filter((category) => {
        try {
          const lowerSearch = searchQuery.toLowerCase();
          return category.name?.toLowerCase().includes(lowerSearch);
        } catch (error) {
          console.error("Error filtering order item:", error, category);
          return false;
        }
      });

      setFilteredCategoriesItems(filtered);
    }
  }, [searchQuery, categoriesItems]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    });
    return formatter.format(date);
  };

  return (
    <section className="flex gap-10">
      <ModalCreateCategory
        open={createModal}
        handleClose={handleCloseCreateModal}
        onUpdate={handleCreateSuccess}
      />
      <ModalUpdateCategory
        open={editModal}
        handleClose={handleCloseEditModal}
        categoryId={selectedCategoryId}
        onUpdate={handleEditSuccess}
      />
      <ModalDeleteCategory
        open={deleteModal}
        handleClose={handleCloseDeleteModal}
        categoryId={selectedCategoryId}
        onUpdate={handleDeleteSuccess}
      />
      <div
        className={`h-screen  fixed top-0 left-0 z-50 transition-all duration-300 ${
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
            <h1 className="text-2xl font-extrabold">Data Kategori</h1>
            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-600/80 duration-200 rounded-md text-white px-4 py-2 font-normal text-base"
            >
              <BiLayerPlus className="text-lg" />
              Tambah
            </button>
          </div>
          <div className="border p-5 mt-10">
            <div className="flex  items-start justify-between">
              <p className="font-semibold text-sm">Tabel Data Kategori</p>

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
                      "ID",
                      "Nama",
                      "Jumlah produk",
                      "Dibuat pada",
                      "Diperbarui pada",
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
                  {filteredCategoriesItems.map((category) => (
                    <tr key={category.id}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="">
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                              {category.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <p className="text-sm text-blue-gray-900 font-normal">
                              {category.name}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <p className="text-sm text-blue-gray-900 font-normal">
                              {category.total_products}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <p className="text-sm text-blue-600 underline font-normal">
                              {formatDate(category.created_at)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <p className="text-sm text-blue-gray-900 font-normal">
                              {formatDate(category.updated_at)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50 relative">
                        <div
                          className="relative inline-block text-left"
                          ref={dropdownRef}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(category.id);
                            }}
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
                          >
                            ⋮
                          </button>

                          {openDropdown === category.id && (
                            <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                              <div className="py-1">
                                <button
                                  onClick={() =>
                                    handleOpenEditModal(category.id)
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() =>
                                    handleOpenDeleteModal(category.id)
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
                  {filteredCategoriesItems.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-5 text-gray-500"
                      >
                        Tidak ada data kategori.
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

export default DataCategories;
