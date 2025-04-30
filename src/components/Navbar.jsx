import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  CiHeart,
  CiShoppingCart,
  CiSearch,
  CiMap,
  CiUser,
  CiLogout,
  CiShoppingTag,
  CiChat1,
} from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { instance } from "../utils/axios";
import { fetchCartItemCount } from "../redux/cartSlice";
import { resetWishlist } from "../redux/wishlistSlice";
import { resetCart } from "../redux/cartSlice";
import { fetchWishlist } from "../redux/wishlistSlice";
export default function NavBar({ handleOpenModal }) {
  const dispatch = useDispatch();
  const itemCount = useSelector((state) => state.cart.itemCount);

  const user = useSelector((state) => state.user.user);
  const userId = user?.id;
  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItemCount(userId));
      dispatch(fetchWishlist(userId));
    }
  }, [dispatch, userId]);

  const [navbar, setNavbar] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setNavbar(open);
  };

  const handleLogout = async () => {
    try {
      await instance.post("/logout");
      dispatch(logout());
      dispatch(resetWishlist());
      dispatch(resetCart());
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className="p-4 w-64"
    >
      <ul className="space-y-4">
        <li>
          <NavLink to="/" className="flex items-center">
            <CiMap className="mr-2" />
            <span>Beranda</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/product" className="flex items-center">
            <CiMap className="mr-2" />
            <span>Produk</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/tentang" className="flex items-center">
            <IoIosInformationCircleOutline className="mr-2" />
            <span>Tentang</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/kontak" className="flex items-center">
            <IoCallOutline className="mr-2" />
            <span>Kontak</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );

  return (
    <nav
      className={`sticky py-1 2xl:px-32 w-full top-0 md:px-[75px] transition-colors duration-300 ${
        scrolling ? " bg-black text-white" : "bg-black  text-white"
      } z-50`}
    >
      <div className="justify-start hidden md:block  lg:ml-0 lg:max-w-7xl xl:max-w-full lg:items-center lg:flex md:px-0">
        <div className="">
          <div className="flex items-center justify-between py-3 lg:py-1.5 2xl:py-1.5 lg:block">
            <div className={`${scrolling ? "scrolled" : " lg:ml-0"}`}>
              <div className="flex 2xl:-ml-4 lg:ml-0 md:ml-0 items-center">
                <Link
                  to="/"
                  className={`${
                    scrolling ? "scrolled hidden lg:block" : "lg:ml-0"
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <img
                      src="/images/logofprimary.svg"
                      className="w-6 2xl:w-36"
                      alt="Logo"
                    />
                    <img
                      src="/images/logotext.svg"
                      className="w-14 2xl:w-36"
                      alt="Logo"
                    />
                  </div>
                </Link>
                {scrolling && (
                  <>
                    {" "}
                    <div className="relative mx-4 lg:hidden">
                      <span className="ml-1 sm:ml-2 absolute left-3 top-1/2 transform -translate-y-1/2 text-hover pointer-events-none">
                        <CiSearch className="text-2xl font-bold" />
                      </span>
                      <button
                        type="text"
                        placeholder="Wisata, atraksi, atau aktivitas"
                        className="pl-11 text-left sm:pl-14 text-xs lg:text-base px-6 py-2.5 md:py-3 text-hover border border-hover rounded-full w-[250px] sm:w-[400px] md:w-[400px] lg:w-[500px] focus:outline-none focus:border-hover"
                      >
                        Cari Destinasi
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <ul className="lg:items-center gap-7 items-baseline lg:px-5 lg:py-4 lg:rounded-full justify-start lg:flex lg:space-x-1">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "lg:font-medium font-bold text-sm md:text-sm lg:text-base lg:relative lg:shadow-[0_1px_0_0px_black] lg:shadow-b-[2px] lg:shadow-white lg:duration-200 flex items-center justify-between"
                  : "text-hitam font-medium text-sm md:text-sm lg:text-base lg:relative lg:hover:shadow-[0_1px_0_0px_black] lg:hover:shadow-b-[2px] lg:hover:shadow-white duration-200 flex items-center justify-between"
              }
            >
              <CiMap className="text-base mr-2 lg:hidden" />
              <span className="flex-1 text-sm 2xl:text-lg">Beranda</span>{" "}
              <MdKeyboardArrowRight className="lg:hidden text-2xl ml-2" />{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive
                  ? "lg:font-medium font-bold text-sm md:text-sm lg:text-base lg:relative lg:shadow-[0_1px_0_0px_black] lg:shadow-b-[2px] lg:shadow-white lg:duration-200 flex items-center justify-between"
                  : "text-hitam font-medium text-sm md:text-sm lg:text-base lg:relative lg:hover:shadow-[0_1px_0_0px_black] lg:hover:shadow-b-[2px] lg:hover:shadow-white duration-200 flex items-center justify-between"
              }
            >
              <CiMap className="text-base mr-2 lg:hidden" />
              <span className="flex-1 text-sm 2xl:text-lg">Produk</span>{" "}
              <MdKeyboardArrowRight className="lg:hidden text-2xl ml-2" />{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tentang"
              className={({ isActive }) =>
                isActive
                  ? "lg:font-medium font-bold text-sm md:text-sm lg:text-base lg:relative lg:shadow-[0_1px_0_0px_black] lg:shadow-b-[2px] lg:shadow-white lg:duration-200 flex items-center justify-between"
                  : "text-hitam font-medium text-sm md:text-sm lg:text-base lg:relative lg:hover:shadow-[0_1px_0_0px_black] lg:hover:shadow-b-[2px] lg:hover:shadow-white duration-200 flex items-center justify-between"
              }
            >
              <IoIosInformationCircleOutline className="text-base mr-2 lg:hidden" />
              <span className="flex-1 text-sm 2xl:text-lg">Faqs</span>{" "}
              <MdKeyboardArrowRight className="lg:hidden text-2xl ml-2" />{" "}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/kontak"
              className={({ isActive }) =>
                isActive
                  ? "lg:font-medium font-bold text-sm md:text-sm lg:text-base lg:relative lg:shadow-[0_1px_0_0px_black] lg:shadow-b-[2px] lg:shadow-white lg:duration-200 flex items-center justify-between"
                  : "text-hitam font-medium text-sm md:text-sm lg:text-base lg:relative lg:hover:shadow-[0_1px_0_0px_black] lg:hover:shadow-b-[2px] lg:hover:shadow-white duration-200 flex items-center justify-between"
              }
            >
              <IoCallOutline className="text-base mr-2 lg:hidden" />
              <span className="flex-1 text-sm 2xl:text-lg">Kontak</span>{" "}
              <MdKeyboardArrowRight className="lg:hidden text-2xl ml-2" />{" "}
            </NavLink>
          </li>
        </ul>

        <div className="hidden  ml-auto space-x-2 lg:inline-block">
          <div className="hidden lg:flex items-center space-x-2 ml-auto">
            <button className="rounded-full  px-3 py-1.5 hover:bg-gray-200/15">
              <CiSearch className="text-2xl font-bold" />
            </button>
            <Link
              to="/checkout/cart"
              className="relative  rounded-full hover:bg-gray-200/15  px-3 py-1.5"
            >
              <CiShoppingCart className="text-2xl" />

              {/* Menampilkan jumlah produk di keranjang */}
              <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[12px]">
                {itemCount}
              </span>
            </Link>

            <div className="hidden  px-2 ml-auto space-x-2 lg:inline-block">
              {isLoggedIn ? (
                <>
                  <div
                    className="flex hover:bg-gray-300 hover:duration-200 hover:bg-opacity-30 hover:rounded-full hover:p-1.5 p-1.5 items-center gap-3 cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <Avatar />
                  </div>

                  {isOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
                    >
                      <ul className="py-2 text-sm text-hitam">
                        <li className="">
                          <NavLink
                            to="/account/profile"
                            className={({ isActive }) =>
                              isActive
                                ? "w-full text-black font-bold flex items-center px-6 py-4 text-left hover:bg-gray-100"
                                : "w-full flex items-center px-6 text-black py-4 text-left hover:bg-gray-100"
                            }
                          >
                            <CiUser className="text-base mr-2" />
                            Profil
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            to="/account/order"
                            className={({ isActive }) =>
                              isActive
                                ? "w-full text-black font-bold flex items-center px-6 py-4 text-left hover:bg-gray-100"
                                : "w-full flex items-center text-black px-6 py-4 text-left hover:bg-gray-100"
                            }
                          >
                            <CiShoppingTag className="text-base mr-2" />
                            Pesanan
                          </NavLink>
                        </li>

                        <li>
                          <NavLink
                            to="/account/review"
                            className={({ isActive }) =>
                              isActive
                                ? "w-full text-black font-bold flex items-center px-6 py-4 text-left hover:bg-gray-100"
                                : "w-full text-black flex items-center px-6 py-4 text-left hover:bg-gray-100"
                            }
                          >
                            <CiChat1 className="text-base mr-2" />
                            Ulasan
                          </NavLink>
                        </li>
                        <li>
                          <hr className="my-1" />
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="w-full text-black flex items-center  px-6 py-4 text-left text-hitam hover:bg-gray-100"
                          >
                            <CiLogout className="text-base mr-2" />
                            Keluar
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-x-3">
                  <button
                    onClick={() => handleOpenModal("login")}
                    className="text-white py-2 px-3 hover:bg-gray-200/15 rounded-full md:text-sm 2xl:text-lg font-medium"
                  >
                    Masuk
                  </button>
                  <button
                    onClick={() => handleOpenModal("register")}
                    className="px-3 py-2 border md:text-sm 2xl:text-lg font-medium rounded-full shadow hover:bg-gray-200/15"
                  >
                    Daftar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex px-4 py-2 lg:hidden items-center justify-between">
        <Link to="/">
          <img src="/images/logo2.png" className="w-28 lg:hidden" alt="Logo" />
        </Link>
        <div className="lg:hidden">
          <IconButton onClick={toggleDrawer(true)} edge="start">
            <MenuIcon className="text-black" />
          </IconButton>
          <Drawer anchor="right" open={navbar} onClose={toggleDrawer(false)}>
            {list()}
          </Drawer>
        </div>
      </div>
    </nav>
  );
}
