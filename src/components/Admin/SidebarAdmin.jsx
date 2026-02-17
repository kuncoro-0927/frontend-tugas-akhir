import { CiLogout } from "react-icons/ci";
import { BsGrid } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import {
  BsBox,
  BsCart,
  BsCollection,
  BsPercent,
  BsPerson,
} from "react-icons/bs";
import { IoCartOutline, IoWalletOutline } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import { useEffect, useState } from "react";

const SidebarAdmin = ({ onSidebarHover, isSidebarCollapsed }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    onSidebarHover(isHovered); // Notify parent when sidebar is hovered
  }, [isHovered, onSidebarHover]);

  return (
    <div
      className={`py-[20px]  overflow-y-auto scrollbar-hide px-5 bg-opacity-50 h-full border-r border-gray-200 transition-all duration-300 ${
        isSidebarCollapsed
          ? isHovered
            ? "w-[250px]" // Collapsed tapi di-hover
            : "w-[100px]" // Collapsed dan tidak di-hover
          : "w-[250px]" // Tidak collapsed, tetap 300px
      }
      `}
      onMouseEnter={() => setIsHovered(true)} // Hover untuk buka sidebar
      onMouseLeave={() => setIsHovered(false)} // Hover keluar untuk collapse kembali
    >
      <img src="/logoindex.svg" className="w-10" alt="Logo" />

      {/* MENU */}
      <div className="mt-7">
        <h1
          className={`font-semibold text-graytext/40 text-sm ${
            isSidebarCollapsed
              ? isHovered
                ? "" // Jika sidebar collapsed dan di-hover, tampilkan teks "Menu"
                : "font-semibold text-black px-4 mr-2  text-center" // Jika sidebar collapsed dan tidak di-hover, tampilkan tiga titik
              : "" // Jika sidebar tidak collapsed, tampilkan teks "Menu" secara normal
          }`}
        >
          {isSidebarCollapsed && !isHovered ? "..." : "Menu"}
        </h1>

        <ul className="space-y-4">
          {/* Dashboard */}
          <li className="mt-3">
            <NavLink
              to="/admin/dashboard"
              className={
                ({ isActive }) =>
                  isSidebarCollapsed
                    ? isHovered
                      ? isActive
                        ? "text-blue-500 bg-blue-100/70 px-4 py-2.5 space-x-2 rounded-md font-semibold text-sm w-full flex items-center" // Sidebar collapsed, hover, dan aktif
                        : "text-hitam hover:bg-gray-200 px-4 py-2.5  text-graytext hover:bg-opacity-40 w-full space-x-2 font-semibold text-sm flex items-center" // Sidebar collapsed, hover, dan tidak aktif
                      : isActive
                      ? "text-blue-500 px-4 py-2.5 rounded-md bg-blue-100/70 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan aktif
                      : "text-hitam px-4 py-2.5 hover:bg-gray-200 text-graytext hover:bg-opacity-40 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan tidak aktif
                    : isActive
                    ? "text-blue-500 bg-blue-100/70 space-x-2  px-4 py-2.5 rounded-md font-semibold text-sm flex items-center" // Sidebar normal dan aktif
                    : "text-hitam hover:bg-gray-200 space-x-2 text-graytext hover:bg-opacity-40 px-4 py-2.5 font-semibold text-sm flex items-center" // Sidebar normal dan tidak aktif
              }
            >
              <BsGrid className="text-xl " />{" "}
              {isHovered || !isSidebarCollapsed ? (
                <span className="flex-1">Dashboard</span>
              ) : (
                <></>
              )}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* E COMMERCE */}
      <div className="mt-3">
        <h1
          className={`font-semibold text-graytext/40 text-sm ${
            isSidebarCollapsed
              ? isHovered
                ? ""
                : "font-semibold text-black px-4 mr-2  text-center"
              : ""
          }`}
        >
          {isSidebarCollapsed && !isHovered ? "..." : "E-Commerce"}
        </h1>
        <ul className="space-y-4">
          {/* Categories */}
          <li className="mt-5">
            <NavLink
              to="/admin/data/categories"
              className={
                ({ isActive }) =>
                  isSidebarCollapsed
                    ? isHovered
                      ? isActive
                        ? "text-blue-500 bg-blue-100/70 px-4 py-2.5 space-x-2 rounded-md font-semibold text-sm w-full flex items-center" // Sidebar collapsed, hover, dan aktif
                        : "text-hitam hover:bg-gray-200 px-4 py-2.5  text-graytext hover:bg-opacity-40 w-full space-x-2 font-semibold text-sm flex items-center" // Sidebar collapsed, hover, dan tidak aktif
                      : isActive
                      ? "text-blue-500 px-4 py-2.5 rounded-md bg-blue-100/70 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan aktif
                      : "text-hitam px-4 py-2.5 hover:bg-gray-200 text-graytext hover:bg-opacity-40 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan tidak aktif
                    : isActive
                    ? "text-blue-500 bg-blue-100/70 space-x-2  px-4 py-2.5 rounded-md font-semibold text-sm flex items-center" // Sidebar normal dan aktif
                    : "text-hitam hover:bg-gray-200 space-x-2 text-graytext hover:bg-opacity-40 px-4 py-2.5 font-semibold text-sm flex items-center" // Sidebar normal dan tidak aktif
              }
            >
              <BsCollection className="text-xl " />{" "}
              {isHovered || !isSidebarCollapsed ? (
                <span className="flex-1">Kategori</span> // Tampilkan teks saat hover atau sidebar normal
              ) : (
                <></>
              )}
            </NavLink>
          </li>
          {/* Produk */}
          <li className="mt-5">
            <NavLink
              to="/admin/data/products"
              className={
                ({ isActive }) =>
                  isSidebarCollapsed
                    ? isHovered
                      ? isActive
                        ? "text-blue-500 bg-blue-100/70 px-4 py-2.5 space-x-2 rounded-md font-semibold text-sm w-full flex items-center" // Sidebar collapsed, hover, dan aktif
                        : "text-hitam hover:bg-gray-200 px-4 py-2.5  text-graytext hover:bg-opacity-40 w-full space-x-2 font-semibold text-sm flex items-center" // Sidebar collapsed, hover, dan tidak aktif
                      : isActive
                      ? "text-blue-500 px-4 py-2.5 rounded-md bg-blue-100/70 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan aktif
                      : "text-hitam px-4 py-2.5 hover:bg-gray-200 text-graytext hover:bg-opacity-40 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan tidak aktif
                    : isActive
                    ? "text-blue-500 bg-blue-100/70 space-x-2  px-4 py-2.5 rounded-md font-semibold text-sm flex items-center" // Sidebar normal dan aktif
                    : "text-hitam hover:bg-gray-200 space-x-2 text-graytext hover:bg-opacity-40 px-4 py-2.5 font-semibold text-sm flex items-center" // Sidebar normal dan tidak aktif
              }
            >
              <BsBox className="text-xl " />{" "}
              {isHovered || !isSidebarCollapsed ? (
                <span className="flex-1">Produk</span> // Tampilkan teks saat hover atau sidebar normal
              ) : (
                <></>
              )}
            </NavLink>
          </li>

          <li className="mt-5">
            <NavLink
              to="/admin/data/orders"
              className={
                ({ isActive }) =>
                  isSidebarCollapsed
                    ? isHovered
                      ? isActive
                        ? "text-blue-500 bg-blue-100/70 px-4 py-2.5 space-x-2 rounded-md font-semibold text-sm w-full flex items-center" // Sidebar collapsed, hover, dan aktif
                        : "text-hitam hover:bg-gray-200 px-4 py-2.5  text-graytext hover:bg-opacity-40 w-full space-x-2 font-semibold text-sm flex items-center" // Sidebar collapsed, hover, dan tidak aktif
                      : isActive
                      ? "text-blue-500 px-4 py-2.5 rounded-md bg-blue-100/70 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan aktif
                      : "text-hitam px-4 py-2.5 hover:bg-gray-200 text-graytext hover:bg-opacity-40 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan tidak aktif
                    : isActive
                    ? "text-blue-500 bg-blue-100/70 space-x-2  px-4 py-2.5 rounded-md font-semibold text-sm flex items-center" // Sidebar normal dan aktif
                    : "text-hitam hover:bg-gray-200 space-x-2 text-graytext hover:bg-opacity-40 px-4 py-2.5 font-semibold text-sm flex items-center" // Sidebar normal dan tidak aktif
              }
            >
              <BsCart className="text-xl " />{" "}
              {isHovered || !isSidebarCollapsed ? (
                <span className="flex-1">Pesanan</span> // Tampilkan teks saat hover atau sidebar normal
              ) : (
                <></>
              )}
            </NavLink>
          </li>

          <li className="mt-5">
            <NavLink
              to="/admin/data/transactions"
              className={
                ({ isActive }) =>
                  isSidebarCollapsed
                    ? isHovered
                      ? isActive
                        ? "text-blue-500 bg-blue-100/70 px-4 py-2.5 space-x-2 rounded-md font-semibold text-sm w-full flex items-center" // Sidebar collapsed, hover, dan aktif
                        : "text-hitam hover:bg-gray-200 px-4 py-2.5  text-graytext hover:bg-opacity-40 w-full space-x-2 font-semibold text-sm flex items-center" // Sidebar collapsed, hover, dan tidak aktif
                      : isActive
                      ? "text-blue-500 px-4 py-2.5 rounded-md bg-blue-100/70 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan aktif
                      : "text-hitam px-4 py-2.5 hover:bg-gray-200 text-graytext hover:bg-opacity-40 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan tidak aktif
                    : isActive
                    ? "text-blue-500 bg-blue-100/70 space-x-2  px-4 py-2.5 rounded-md font-semibold text-sm flex items-center" // Sidebar normal dan aktif
                    : "text-hitam hover:bg-gray-200 space-x-2 text-graytext hover:bg-opacity-40 px-4 py-2.5 font-semibold text-sm flex items-center" // Sidebar normal dan tidak aktif
              }
            >
              <IoWalletOutline className="text-xl " />{" "}
              {isHovered || !isSidebarCollapsed ? (
                <span className="flex-1">Transaksi</span>
              ) : (
                <></>
              )}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Manajemen User */}
      <div className="mt-3">
        <h1
          className={`font-semibold text-graytext/40 text-sm ${
            isSidebarCollapsed
              ? isHovered
                ? ""
                : "font-semibold text-black px-4 mr-2   text-center"
              : ""
          }`}
        >
          {isSidebarCollapsed && !isHovered ? "..." : "Manajemen Pengguna"}
        </h1>
        <ul className="space-y-4">
          {/* Data Pengguna */}
          <li className="mt-5">
            <NavLink
              to="/admin/data/users"
              className={
                ({ isActive }) =>
                  isSidebarCollapsed
                    ? isHovered
                      ? isActive
                        ? "text-blue-500 bg-blue-100/70 px-4 py-2.5 space-x-2 rounded-md font-semibold text-sm w-full flex items-center" // Sidebar collapsed, hover, dan aktif
                        : "text-hitam hover:bg-gray-200 px-4 py-2.5  text-graytext hover:bg-opacity-40 w-full space-x-2 font-semibold text-sm flex items-center" // Sidebar collapsed, hover, dan tidak aktif
                      : isActive
                      ? "text-blue-500 px-4 py-2.5 rounded-md bg-blue-100/70 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan aktif
                      : "text-hitam px-4 py-2.5 hover:bg-gray-200 text-graytext hover:bg-opacity-40 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan tidak aktif
                    : isActive
                    ? "text-blue-500 bg-blue-100/70 space-x-2  px-4 py-2.5 rounded-md font-semibold text-sm flex items-center" // Sidebar normal dan aktif
                    : "text-hitam hover:bg-gray-200 space-x-2 text-graytext hover:bg-opacity-40 px-4 py-2.5 font-semibold text-sm flex items-center" // Sidebar normal dan tidak aktif
              }
            >
              <BsPerson className="text-xl" />{" "}
              {isHovered || !isSidebarCollapsed ? (
                <span className="flex-1">Data Pengguna</span>
              ) : (
                <></>
              )}
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Others */}
      <div className="mt-3">
        <h1
          className={`font-semibold text-graytext/40 text-sm ${
            isSidebarCollapsed
              ? isHovered
                ? ""
                : "font-semibold text-black px-4 mr-2  text-center"
              : ""
          }`}
        >
          {isSidebarCollapsed && !isHovered ? "..." : "Lainnya"}
        </h1>
        <ul className="space-y-4">
          {/* Data Pengguna */}
          <li className="mt-5">
            <NavLink
              to="/admin/data/promo/codes"
              className={
                ({ isActive }) =>
                  isSidebarCollapsed
                    ? isHovered
                      ? isActive
                        ? "text-blue-500 bg-blue-100/70 px-4 py-2.5 space-x-2 rounded-md font-semibold text-sm w-full flex items-center" // Sidebar collapsed, hover, dan aktif
                        : "text-hitam hover:bg-gray-200 px-4 py-2.5  text-graytext hover:bg-opacity-40 w-full space-x-2 font-semibold text-sm flex items-center" // Sidebar collapsed, hover, dan tidak aktif
                      : isActive
                      ? "text-blue-500 px-4 py-2.5 rounded-md bg-blue-100/70 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan aktif
                      : "text-hitam px-4 py-2.5 hover:bg-gray-200 text-graytext hover:bg-opacity-40 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan tidak aktif
                    : isActive
                    ? "text-blue-500 bg-blue-100/70 space-x-2  px-4 py-2.5 rounded-md font-semibold text-sm flex items-center" // Sidebar normal dan aktif
                    : "text-hitam hover:bg-gray-200 space-x-2 text-graytext hover:bg-opacity-40 px-4 py-2.5 font-semibold text-sm flex items-center" // Sidebar normal dan tidak aktif
              }
            >
              <BsPercent className="text-xl" />
              {isHovered || !isSidebarCollapsed ? (
                <span className="flex-1">Kode Promo</span>
              ) : (
                <></>
              )}
            </NavLink>
          </li>
        </ul>

        <ul className="space-y-4">
          {/* Data Ulasan */}
          <li className="mt-5">
            <NavLink
              to="/admin/data/reviews"
              className={
                ({ isActive }) =>
                  isSidebarCollapsed
                    ? isHovered
                      ? isActive
                        ? "text-blue-500 bg-blue-100/70 px-4 py-2.5 space-x-2 rounded-md font-semibold text-sm w-full flex items-center" // Sidebar collapsed, hover, dan aktif
                        : "text-hitam hover:bg-gray-200 px-4 py-2.5  text-graytext hover:bg-opacity-40 w-full space-x-2 font-semibold text-sm flex items-center" // Sidebar collapsed, hover, dan tidak aktif
                      : isActive
                      ? "text-blue-500 px-4 py-2.5 rounded-md bg-blue-100/70 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan aktif
                      : "text-hitam px-4 py-2.5 hover:bg-gray-200 text-graytext hover:bg-opacity-40 w-fit font-semibold text-sm flex items-center" // Sidebar collapsed, tidak hover, dan tidak aktif
                    : isActive
                    ? "text-blue-500 bg-blue-100/70 space-x-2  px-4 py-2.5 rounded-md font-semibold text-sm flex items-center" // Sidebar normal dan aktif
                    : "text-hitam hover:bg-gray-200 space-x-2 text-graytext hover:bg-opacity-40 px-4 py-2.5 font-semibold text-sm flex items-center" // Sidebar normal dan tidak aktif
              }
            >
              <GoComment className="text-xl" />
              {isHovered || !isSidebarCollapsed ? (
                <span className="flex-1">Ulasan</span>
              ) : (
                <></>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;
