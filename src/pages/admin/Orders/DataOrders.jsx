import React, { useEffect, useState, useRef } from "react";
import AdminNavBar from "../../../components/Admin/AdminNavBar";
import SidebarAdmin from "../../../components/Admin/SidebarAdmin";
import { instanceAdmin } from "../../../utils/axiosAdmin";
const DataOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true); // Sidebar collapsed by default
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); // Toggle state
  };

  // Handle hover effect for sidebar
  const handleSidebarHover = (isHovered) => {
    setIsSidebarHovered(isHovered);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instanceAdmin.get("/all/orders");

        setOrders(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    try {
      if (searchQuery === "") {
        setFilteredUsers(orders);
      } else {
        const lowerSearch = searchQuery.toLowerCase();
        const filtered = orders.filter((order) => {
          return (
            order.order_code?.toLowerCase().includes(lowerSearch) ||
            order.user_name?.toLowerCase().includes(lowerSearch) ||
            order.user_email?.toLowerCase().includes(lowerSearch) ||
            order.status?.toLowerCase().includes(lowerSearch) ||
            order.shipping_method?.toLowerCase().includes(lowerSearch) ||
            order.total_amount?.toString().toLowerCase().includes(lowerSearch)
          );
        });
        setFilteredUsers(filtered);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat memfilter data:", error);
      setFilteredUsers([]); // fallback: kosongkan hasil jika error
    }
  }, [searchQuery, orders]);

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

  const getInitials = (firstName, lastName) => {
    if (!firstName && !lastName) return "NN";
    const first = firstName?.[0] || "";
    const last = lastName?.[0] || "";
    return (first + last).toUpperCase();
  };

  // Fungsi hash sederhana untuk warna dari string unik
  const getColorFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 60%)`; // warna pastel-ish
  };

  return (
    <section className="flex gap-10">
      <div
        className={`h-screen  fixed top-0 left-0 z-50 transition-all duration-300 ${
          isSidebarCollapsed ? "w-[100px]" : "w-[300px]"
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
              ? "ml-[300px]"
              : "ml-[100px]"
            : "ml-[300px]"
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
                      "ID Pesanan",
                      "Nama",
                      "Pengiriman",
                      "Status",
                      "Total Harga",
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
                  {filteredUsers.map((order) => (
                    <tr key={order.id}>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div className="">
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                              {order.order_code}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                          <div
                            className="rounded-full w-9 h-9 flex items-center justify-center text-white font-semibold text-sm"
                            style={{
                              backgroundColor: getColorFromString(
                                order.user_email || order.user_name || "NN"
                              ),
                            }}
                          >
                            {getInitials(order.firstname, order.lastname)}
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm text-blue-gray-900 font-normal">
                              {order.user_name}
                            </p>
                            <p className="text-xs text-blue-gray-900 font-normal opacity-70">
                              {order.user_email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            {order.shipping_method}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="">
                          <p
                            className={`block w-fit px-2 py-0.5 rounded-md antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal
      ${
        order.status === "paid"
          ? "text-blue-600 font-bold bg-blue-200"
          : order.status === "shipped"
          ? "text-orange-600 font-bold bg-orange-200"
          : order.status === "completed"
          ? "text-green-600 font-bold bg-green-200"
          : "text-gray-500"
      }`}
                          >
                            {order.status}
                          </p>
                        </div>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                          IDR{" "}
                          {Number(order.total_amount).toLocaleString("id-ID", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
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
                              setOpenDropdown(order.id);
                            }}
                            type="button"
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
                          >
                            ⋮
                          </button>

                          {openDropdown === order.id && (
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

export default DataOrders;
