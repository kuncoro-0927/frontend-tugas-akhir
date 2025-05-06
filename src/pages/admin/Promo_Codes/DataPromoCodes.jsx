import React, { useEffect, useState, useRef } from "react";
import AdminNavBar from "../../../components/Admin/AdminNavBar";
import SidebarAdmin from "../../../components/Admin/SidebarAdmin";
import { instanceAdmin } from "../../../utils/axiosAdmin";
import FormInput from "../../../components/TextField";
const DataPromoCodes = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Data yang sudah difilter
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Query untuk search
  const dropdownRef = useRef(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar collapsed by default
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); // Toggle state
  };

  // Handle hover effect for sidebar
  const handleSidebarHover = (isHovered) => {
    setIsSidebarHovered(isHovered);
  };

  const fetchPromos = async () => {
    try {
      const response = await instanceAdmin.get("/all/promo");
      setUsers(response.data);
      setFilteredUsers(response.data);
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
      setFilteredUsers(users); // Jika tidak ada query, tampilkan semua pengguna
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
      setFilteredUsers(filtered); // Update filtered users
    }
  }, [searchQuery, users]);

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

  const handleToggle = async (id) => {
    try {
      await instanceAdmin.put(`/toggle/${id}`);
      fetchPromos(); // Refresh data setelah toggle
    } catch (error) {
      console.error("Gagal toggle status:", error);
    }
  };

  return (
    <section className="flex gap-10">
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
          Data Pengguna
          <div className="border p-5 mt-10">
            <div className="flex  items-start justify-between">
              <p className="font-semibold text-sm">Tabel Data Pengguna</p>

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
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
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
                      placeholder="Cari Kode Promo"
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
                      "Kode Promo",
                      "Tipe Diskon",
                      "Maks. Diskon",
                      "Kontrol Status",
                      "Tanggal Expired",
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
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="">
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                              {user.code}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          {user.discount_type === "fixed"
                            ? "Rp (Potongan Tetap)"
                            : user.discount_type === "percentage"
                            ? "% (Diskon Persen)"
                            : "Tidak diketahui"}
                        </p>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex flex-col">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            {user.discount_value
                              ? user.discount_type === "percentage"
                                ? `${user.discount_value}%${
                                    user.max_discount
                                      ? ` (max Rp${user.max_discount.toLocaleString(
                                          "id-ID"
                                        )})`
                                      : ""
                                  }`
                                : `Rp${user.discount_value.toLocaleString(
                                    "id-ID"
                                  )}`
                              : "Tidak ada data"}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <button
                          onClick={() => handleToggle(user.id)}
                          className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
                            user.is_active === 1
                              ? "bg-green-100 border border-green-400"
                              : "bg-red-100 border border-red-400"
                          }`}
                        >
                          <div
                            className={`border  w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
                              user.is_active === 1
                                ? "translate-x-6 bg-green-200 border-green-400"
                                : "translate-x-0 bg-red-200 border-red-400"
                            }`}
                          ></div>
                        </button>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
                          {user.expiry_date
                            ? new Date(user.expiry_date).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                }
                              )
                            : "Tidak ada data"}
                        </p>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50 relative">
                        <div
                          className="relative inline-block text-left"
                          ref={dropdownRef}
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdown(user.id);
                            }}
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
                          >
                            ⋮
                          </button>

                          {openDropdown === user.id && (
                            <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                              <div className="py-1">
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  Edit
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                  Detail
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
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

export default DataPromoCodes;
