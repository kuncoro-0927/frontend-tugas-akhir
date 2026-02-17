import React, { useEffect, useState, useRef } from "react";
import AdminNavBar from "../../../components/Admin/AdminNavBar";
import SidebarAdmin from "../../../components/Admin/SidebarAdmin";
import { instanceAdmin } from "../../../utils/axiosAdmin";
import Rating from "@mui/material/Rating";
import CardImage from "../../../components/Card/CardImage";
import DetailReview from "../../../components/Admin/Modal/Reviews/DetailReview";
import ModalDeleteReview from "../../../components/Admin/Modal/Reviews/DeleteReviews";
const DataReview = () => {
  const [promos, setPromos] = useState([]);
  const [filteredReviews, setFilteredUsers] = useState([]); // Data yang sudah difilter
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Query untuk search
  const dropdownRef = useRef(null);
  const [selectedPromoId, setSelectedPromoId] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar collapsed by default
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleOpenDrawer = (promoId) => {
    setSelectedPromoId(promoId);
    setDrawerOpen(true);
  };

  const handleCloseDeleteModal = () => setDeleteModal(false);
  const handleOpenDeleteModal = (promoId) => {
    setSelectedPromoId(promoId);
    setDeleteModal(true);
  };

  const handleDeleteSuccess = () => {
    fetchPromos();
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); // Toggle state
  };

  const handleSidebarHover = (isHovered) => {
    setIsSidebarHovered(isHovered);
  };

  const fetchPromos = async () => {
    try {
      const response = await instanceAdmin.get("/get/all/reviews");
      setPromos(response.data.data);
      setFilteredUsers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch promos:", error);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  // Filter pengguna berdasarkan search query
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredUsers(promos); // Jika tidak ada query, tampilkan semua pengguna
    } else {
      const filtered = promos.filter((user) => {
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
      setFilteredUsers(filtered); // Update filtered users
    }
  }, [searchQuery, promos]);

  // Handle klik di luar dropdown
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

  return (
    <section className="flex gap-10">
      <DetailReview
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        promoId={selectedPromoId}
      />

      <ModalDeleteReview
        open={deleteModal}
        handleClose={handleCloseDeleteModal}
        promoId={selectedPromoId}
        onUpdate={handleDeleteSuccess}
      />
      <div
        className={`h-screen  fixed top-0 left-0 z-40 transition-all duration-300 ${
          isSidebarCollapsed ? "w-[100px]" : "w-[250px]"
        }`}
      >
        <SidebarAdmin
          onSidebarHover={handleSidebarHover}
          isSidebarCollapsed={isSidebarCollapsed}
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
            <h1 className="text-2xl font-extrabold">Data Ulasan</h1>
          </div>
          <div className="border p-5 mt-10">
            <div className="flex  items-start justify-between">
              <p className="font-semibold text-sm">Tabel Data Ulasan</p>

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
                      className="peer h-full w-full font-normal outline-none text-sm text-graytext pr-2"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      id="search"
                      placeholder="Cari Ulasan"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="  px-0">
              <table className=" w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {["Email", "Produk", "Rating", "Ulasan", "Aksi"].map(
                      (header, index) => (
                        <th
                          key={index}
                          className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                        >
                          <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                            {header}
                          </p>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map((promo) => (
                    <tr key={promo.id}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="">
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                              {promo.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="">
                            <CardImage
                              image={`${import.meta.env.VITE_BACKEND_URL}${
                                promo.image_url
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
                              {promo.product_name}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="">
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                              <Rating
                                name="read-only"
                                value={promo.rating}
                                size="small"
                                precision={0.1}
                                readOnly
                              />
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="">
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                              {promo.comment}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* <td className="p-4 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                          {promo.expiry_date
                            ? new Date(promo.expiry_date).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "Tidak ada data"}
                        </p>
                      </td> */}

                      <td className="p-4 border-b border-blue-gray-50 relative">
                        <div
                          className="relative inline-block text-left"
                          ref={dropdownRef}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(promo.id);
                            }}
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
                          >
                            ⋮
                          </button>

                          {openDropdown === promo.id && (
                            <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                              <div className="py-1">
                                <button
                                  onClick={() => handleOpenDrawer(promo.id)}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Detail
                                </button>
                                <button
                                  onClick={() =>
                                    handleOpenDeleteModal(promo.id)
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
                  {filteredReviews.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-5 text-gray-500"
                      >
                        Tidak ada data ulasan.
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

export default DataReview;
