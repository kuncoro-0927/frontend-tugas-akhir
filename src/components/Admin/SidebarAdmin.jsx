import { CiLogout } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { BsBox } from "react-icons/bs";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { AiOutlineAppstore } from "react-icons/ai";
import { IoCartOutline, IoWalletOutline } from "react-icons/io5";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SidebarAdmin = ({ onSidebarHover, isSidebarCollapsed }) => {
  const location = useLocation();
  const [isPesananOpen, setIsPesananOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (
      location.pathname.startsWith("/admin/data/orders") ||
      location.pathname.startsWith("/admin/data/order/items") ||
      location.pathname.startsWith("/admin/data/order/shipping")
    ) {
      setIsPesananOpen(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    onSidebarHover(isHovered); // Notify parent when sidebar is hovered
  }, [isHovered, onSidebarHover]);

  return (
    <div
      className={`py-[20px]  overflow-y-auto scrollbar-hide px-5 bg-opacity-50 h-full border-r border-gray-200 transition-all duration-300 ${
        isSidebarCollapsed
          ? isHovered
            ? "w-[300px]" // Collapsed tapi di-hover
            : "w-[100px]" // Collapsed dan tidak di-hover
          : "w-[300px]" // Tidak collapsed, tetap 300px
      }
      `}
      onMouseEnter={() => setIsHovered(true)} // Hover untuk buka sidebar
      onMouseLeave={() => setIsHovered(false)} // Hover keluar untuk collapse kembali
    >
      <img src="/logoindex.svg" className="w-10" alt="Logo" />

      {/* MENU */}
      <div className="mt-7">
        <h1
          className={`font-semibold text-gray-400/70 ${
            isSidebarCollapsed
              ? isHovered
                ? "" // Jika sidebar collapsed dan di-hover, tampilkan teks "Menu"
                : "font-semibold text-black px-4  text-center" // Jika sidebar collapsed dan tidak di-hover, tampilkan tiga titik
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
              <AiOutlineAppstore className="text-2xl " />{" "}
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
      <div className="mt-7">
        <h1
          className={`font-semibold text-gray-400/70 ${
            isSidebarCollapsed
              ? isHovered
                ? "" // Jika sidebar collapsed dan di-hover, tampilkan teks "Menu"
                : "font-semibold text-black px-4  text-center" // Jika sidebar collapsed dan tidak di-hover, tampilkan tiga titik
              : "" // Jika sidebar tidak collapsed, tampilkan teks "Menu" secara normal
          }`}
        >
          {isSidebarCollapsed && !isHovered ? "..." : "E-Commerce"}
        </h1>
        <ul className="space-y-4">
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

          {/* Pesanan (Dropdown) */}
          <li className="mt-5">
            <button
              onClick={() => setIsPesananOpen(!isPesananOpen)}
              className={`w-full space-x-2 px-4 py-2 font-semibold text-sm flex items-center justify-between rounded-md
              ${
                isPesananOpen
                  ? "text-blue-500 space-x-2 bg-blue-100/70"
                  : "text-hitam space-x-2 hover:bg-gray-200 hover:bg-opacity-40 text-graytext"
              }`}
            >
              <span className="flex space-x-2 items-center">
                <IoCartOutline className="text-2xl " />{" "}
                {isHovered || !isSidebarCollapsed ? (
                  <span className="">Pesanan</span>
                ) : (
                  <></>
                )}
              </span>
              {isPesananOpen ? <FiChevronUp /> : <FiChevronDown />}
            </button>

            {isPesananOpen && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <NavLink
                    to="/admin/data/orders"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 bg-blue-100/70 px-4 rounded-md py-2.5 font-semibold text-sm flex items-center"
                        : "text-hitam hover:bg-gray-200 px-4 text-graytext hover:bg-opacity-40 py-2.5 font-semibold text-sm flex items-center"
                    }
                  >
                    Order
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/data/order/items"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 bg-blue-100/70 px-4 rounded-md py-2.5 font-semibold text-sm flex items-center"
                        : "text-hitam hover:bg-gray-200 px-4 text-graytext hover:bg-opacity-40 py-2.5 font-semibold text-sm flex items-center"
                    }
                  >
                    Order Items
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/data/order/shipping"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 bg-blue-100/70 px-4 rounded-md py-2.5 font-semibold text-sm flex items-center"
                        : "text-hitam hover:bg-gray-200 px-4 text-graytext hover:bg-opacity-40 py-2.5 font-semibold text-sm flex items-center"
                    }
                  >
                    Order Shipping
                  </NavLink>
                </li>
              </ul>
            )}
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
      <div className="mt-7">
        <h1
          className={`font-semibold text-gray-400/70 ${
            isHovered || !isSidebarCollapsed ? "" : "hidden"
          }`}
        >
          Manajemen Pengguna
        </h1>
        <ul className="space-y-4">
          {/* Data Pengguna */}
          <li className="mt-5">
            <NavLink
              to="/admin/data/users"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 bg-blue-100/70 px-4 rounded-md py-2.5 font-semibold text-sm flex items-center"
                  : "text-hitam hover:bg-gray-200 px-4 text-graytext hover:bg-opacity-40 py-2.5 font-semibold text-sm flex items-center"
              }
            >
              <BsBox className="text-xl mr-2.5 ml-0.5 w-6 h-6" />{" "}
              {isHovered || !isSidebarCollapsed ? (
                <span className="flex-1">Data Pengguna</span>
              ) : (
                <span className="flex-1">D</span>
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarAdmin;
