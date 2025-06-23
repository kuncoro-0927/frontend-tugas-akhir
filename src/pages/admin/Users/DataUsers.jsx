import React, { useEffect, useState, useRef } from "react";
import AdminNavBar from "../../../components/Admin/AdminNavBar";
import SidebarAdmin from "../../../components/Admin/SidebarAdmin";
import { instanceAdmin } from "../../../utils/axiosAdmin";
import FormInput from "../../../components/TextField";
import { LuUserRoundPlus } from "react-icons/lu";
import ModalCreateUser from "../../../components/Admin/Modal/Users/CreateUser";
import ModalUpdateUser from "../../../components/Admin/Modal/Users/UpdateUser";
import DetailUsers from "../../../components/Admin/Modal/Users/DetailUser";
import ModalDeleteUsers from "../../../components/Admin/Modal/Users/DeleteUser";
const DataUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Data yang sudah difilter
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Query untuk search
  const dropdownRef = useRef(null);
  const [activeTab, setActiveTab] = useState("user");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const handleOpenCreateModal = () => setCreateModal(true);
  const handleCloseCreateModal = () => setCreateModal(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const handleOpenUpdateModal = (userId) => {
    setSelectedUserId(userId);
    setUpdateModal(true);
  };
  const handleCloseUpdateModal = () => setUpdateModal(false);
  const [updateModal, setUpdateModal] = useState(false);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Sidebar collapsed by default
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed); // Toggle state
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleOpenDrawer = (id) => {
    setSelectedUserId(id);
    setDrawerOpen(true);
  };

  const handleCloseDeleteModal = () => setDeleteModal(false);
  const handleOpenDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setDeleteModal(true);
  };
  const handleCreateSuccess = () => {
    fetchUsers();
  };
  const handleDeleteSuccess = () => {
    fetchUsers();
  };
  // Handle hover effect for sidebar
  const handleSidebarHover = (isHovered) => {
    setIsSidebarHovered(isHovered);
  };

  // Fetch data pengguna

  const fetchUsers = async () => {
    try {
      const response = await instanceAdmin.get("/all/users");
      console.log("DATA USERS:", response.data);
      setUsers(response.data);
      setFilteredUsers(response.data); // Set users awal sebagai filtered
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = users.filter((user) => user.role_name === activeTab);

    if (searchQuery !== "") {
      filtered = filtered.filter((user) => {
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
    }

    setFilteredUsers(filtered);
  }, [searchQuery, users, activeTab]);

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
      <DetailUsers
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        userId={selectedUserId}
      />
      <ModalCreateUser
        open={createModal}
        handleClose={handleCloseCreateModal}
        onUpdate={handleCreateSuccess}
      />

      <ModalUpdateUser
        open={updateModal}
        handleClose={handleCloseUpdateModal}
        onUpdate={handleCreateSuccess}
        userId={selectedUserId}
      />
      <ModalDeleteUsers
        open={deleteModal}
        handleClose={handleCloseDeleteModal}
        userId={selectedUserId}
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
            <h1>Data Pengguna</h1>
            <div className="flex items-center gap-5">
              <button
                onClick={handleOpenCreateModal}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-600/80 duration-200 rounded-md text-white px-4 py-2 font-normal text-base"
              >
                <LuUserRoundPlus className="text-lg" />
                Tambah
              </button>
            </div>
          </div>
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
              <div className="flex  ">
                {["admin", "user"].map((role_name) => (
                  <button
                    key={role_name}
                    onClick={() => setActiveTab(role_name)}
                    className={`px-4 py-2  text-sm 
        ${
          activeTab === role_name
            ? "border-b-2 font-bold border-blue-500"
            : "font-normal"
        }`}
                  >
                    {role_name.charAt(0).toUpperCase() + role_name.slice(1)}
                  </button>
                ))}
              </div>
              <table className=" w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {[
                      "Nama",
                      "Role",
                      "Kota / Provinsi",
                      "Status",
                      "Nomor Telepon",
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
                          <div
                            className="rounded-full w-9 h-9 flex items-center justify-center text-white font-semibold text-sm"
                            style={{
                              backgroundColor: getColorFromString(
                                user.email || user.name || "NN"
                              ),
                            }}
                          >
                            {getInitials(user.firstname, user.lastname)}
                          </div>
                          <div className="flex flex-col">
                            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                              {user.name}
                            </p>
                            <p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal opacity-70">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          {user.role_name}
                        </p>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex flex-col">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            {user.city ? user.city : "Tidak ada data"}
                          </p>
                          <p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal opacity-70">
                            {user.province ? user.province : "Tidak ada data"}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 border-b border-blue-gray-50">
                        <div className="w-max">
                          <div
                            className={`relative grid items-center font-sans font-bold whitespace-nowrap select-none ${
                              user.isverified === 1
                                ? "bg-green-500/20 text-green-600"
                                : "bg-red-500/20 text-red-600"
                            } py-1 px-2 text-xs rounded-md`}
                          >
                            <span>
                              {user.isverified === 1
                                ? "Terverifikasi"
                                : "Belum Verifikasi"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 border-b border-blue-gray-50">
                        <p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
                          {user.phone ? user.phone : "Tidak ada data"}
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
                                <button
                                  onClick={() => handleOpenUpdateModal(user.id)}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleOpenDrawer(user.id)}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Detail
                                </button>
                                <button
                                  onClick={() => handleOpenDeleteModal(user.id)}
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

export default DataUsers;
