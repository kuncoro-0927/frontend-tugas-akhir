import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { IoIosArrowForward } from "react-icons/io";
import {
  CiHeart,
  CiShoppingCart,
  CiSearch,
  CiMap,
  CiUser,
  CiLogout,
  CiCircleQuestion,
  CiShoppingTag,
  CiChat1,
} from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "./Avatar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { instance } from "../utils/axios";
import { fetchCartItemCount } from "../redux/cartSlice";
import { resetWishlist } from "../redux/wishlistSlice";
import { resetCart } from "../redux/cartSlice";
import { fetchWishlist } from "../redux/wishlistSlice";
import { openDrawer } from "../redux/cartDrawer";

export default function NavBar({ handleOpenModal, handleSearchOpen }) {
  const dispatch = useDispatch();
  const itemCount = useSelector((state) => state.cart.itemCount);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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

  useEffect(() => {
    if (isDesktop) {
      setNavbar(false); // drawer otomatis ditutup di desktop
    }
  }, [isDesktop]);

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

  // const list = () => (
  //   <div
  //     role="presentation"
  //     onClick={toggleDrawer(false)}
  //     onKeyDown={toggleDrawer(false)}
  //     className="p-4 w-screen"
  //   >
  //     <ul className="space-y-4">
  //       <li>
  //         <NavLink to="/" className="flex items-center">
  //           <CiMap className="mr-2" />
  //           <span>Beranda</span>
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to="/product" className="flex items-center">
  //           <CiMap className="mr-2" />
  //           <span>Produk</span>
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to="/tentang" className="flex items-center">
  //           <IoIosInformationCircleOutline className="mr-2" />
  //           <span>Tentang</span>
  //         </NavLink>
  //       </li>
  //       <li>
  //         <NavLink to="/kontak" className="flex items-center">
  //           <IoCallOutline className="mr-2" />
  //           <span>Kontak</span>
  //         </NavLink>
  //       </li>
  //     </ul>
  //   </div>
  // );

  return (
    <>
      <nav className="sticky md:py-2 2xl:px-32  w-full bg-black text-white top-0 md:px-14 transition-colors duration-300 z-50">
        <div className="justify-start hidden  lg:ml-0 lg:max-w-7xl xl:max-w-full md:items-center md:flex md:px-0">
          <div className="flex 2xl:-ml-4 lg:ml-0 md:ml-0 items-center">
            <Link
              to="/"
              className={`${
                scrolling ? "scrolled hidden md:block" : "lg:ml-0"
              }`}
            >
              <div className="flex items-center gap-1">
                <img
                  src="/images/logofprimary.svg"
                  className="md:w-6 2xl:w-36"
                  alt="Logo"
                />
                <img
                  src="/images/logotext.svg"
                  className="w-14 2xl:w-36"
                  alt="Logo"
                />
              </div>
            </Link>
          </div>

          <div className="hidden ml-auto space-x-2 md:inline-block">
            <div className="hidden md:flex items-center space-x-2 ml-auto">
              <button
                onClick={handleSearchOpen}
                className="mr-3 flex items-center gap-2 border w-80   rounded-full hover:bg-gray-200/15  px-4 py-2 "
              >
                <CiSearch className="text-2xl font-bold" />{" "}
                <span className="text-sm">Belanja sekarang...</span>
              </button>
              <Link
                to="/help/center"
                className=" rounded-full hover:bg-gray-200/15  px-3 py-1.5 "
              >
                <CiCircleQuestion className="text-2xl font-bold" />{" "}
              </Link>
              <button
                onClick={() => dispatch(openDrawer())}
                className="relative  rounded-full hover:bg-gray-200/15  px-3 py-1.5"
              >
                <CiShoppingCart className="text-2xl" />

                {/* Menampilkan jumlah produk di keranjang */}
                <span className="absolute top-1 right-1 w-4 h-4 bg-white text-black rounded-full flex items-center justify-center text-[10px]">
                  {itemCount}
                </span>
              </button>

              <div className="hidden  ml-auto md:inline-block">
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
        <div className="flex fixed bg-black w-full top-0  z-0 px-4 py-2 md:hidden items-center justify-between ">
          <div className="md:hidden mx-4 flex items-center justify-between">
            {scrolling ? (
              // Search Button (muncul saat scroll)
              <button
                onClick={handleSearchOpen}
                className=" flex items-center border w-52 rounded-full hover:bg-gray-200/15 px-4 py-2"
              >
                <CiSearch className="text-2xl  mr-2 font-bold" />
                <span className="text-xs">Belanja sekarang...</span>
              </button>
            ) : (
              // Logo (muncul saat di atas)
              <Link onClick={toggleDrawer(false)} to="/">
                <div className="flex items-center gap-1">
                  <img
                    src="/images/logofprimary.svg"
                    className="w-6"
                    alt="Logo"
                  />
                  <img src="/images/logotext.svg" className="w-14" alt="Logo" />
                </div>
              </Link>
            )}
          </div>

          <div className="lg:hidden flex gap-4">
            <div className="flex items-center">
              <button
                onClick={() => dispatch(openDrawer())}
                className="relative  rounded-full hover:bg-gray-200/15  px-3 py-1.5"
              >
                <CiShoppingCart className="text-2xl" />

                {/* Menampilkan jumlah produk di keranjang */}
                <span className="absolute top-1 right-1 w-4 h-4 bg-white text-black rounded-full flex items-center justify-center text-[10px]">
                  {itemCount}
                </span>
              </button>
            </div>
            {navbar ? (
              <IconButton onClick={toggleDrawer(false)} edge="start">
                <CloseIcon className="text-white" />
              </IconButton>
            ) : (
              <IconButton onClick={toggleDrawer(true)} edge="start">
                <MenuIcon className="text-white" />
              </IconButton>
            )}
          </div>
        </div>
      </nav>

      <div className="md:hidden">
        <Drawer
          anchor="top"
          open={navbar}
          onClose={toggleDrawer(false)}
          hideBackdrop
          ModalProps={{
            style: {
              zIndex: 40,
              top: "56px", // geser posisi modal root ke bawah navbar
              height: "calc(100% - 56px)", // tinggi sisa layar
              overflow: "hidden",
              position: "fixed", // pastikan posisi tetap fixed
              width: "100%", // full width
            },
          }}
          PaperProps={{
            style: {
              height: "100%", // isi drawer penuh modal
              boxSizing: "border-box",
              backgroundColor: "#fff",
            },
          }}
        >
          <div className="p-4 pt-20 flex flex-col h-full">
            <div className="mt-4 mb-6">
              {isLoggedIn ? (
                <>
                  <div className="flex hover:bg-gray-300 hover:duration-200 hover:bg-opacity-30 hover:rounded-full w-fit hover:p-1.5 p-1.5 items-center gap-3 cursor-pointer">
                    <Avatar />
                    <span className="font-bold text-base">
                      {(user?.name && user.name.trim()) ||
                        `${user?.firstname || ""} ${user?.lastname || ""}`}
                    </span>
                  </div>
                  <div className="border-b pb-3">
                    <ul className="py-2 px-2 text-base text-hitam">
                      <li className="">
                        <NavLink
                          onClick={toggleDrawer(false)}
                          to="/account/profile"
                          className={({ isActive }) =>
                            isActive
                              ? "w-full text-black font-bold justify-between flex items-center  py-4 text-left hover:bg-gray-100"
                              : "w-full flex items-center justify-between  text-black py-4 text-left hover:bg-gray-100"
                          }
                        >
                          <span className="flex items-center">
                            <CiUser className="text-base mr-2" />
                            Profil
                          </span>
                          <span>
                            <IoIosArrowForward />
                          </span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={toggleDrawer(false)}
                          to="/account/order"
                          className={({ isActive }) =>
                            isActive
                              ? "w-full text-black font-bold justify-between flex items-center  py-4 text-left hover:bg-gray-100"
                              : "w-full flex items-center justify-between  text-black py-4 text-left hover:bg-gray-100"
                          }
                        >
                          <span className="flex items-center">
                            <CiShoppingTag className="text-base mr-2" />
                            Pesanan
                          </span>
                          <span>
                            <IoIosArrowForward />
                          </span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          onClick={toggleDrawer(false)}
                          to="/account/wishlist"
                          className={({ isActive }) =>
                            isActive
                              ? "w-full text-black justify-between font-bold flex items-center  py-4 text-left hover:bg-gray-100"
                              : "w-full flex items-center justify-between  text-black py-4 text-left hover:bg-gray-100"
                          }
                        >
                          <span className="flex items-center">
                            <CiHeart className="text-base mr-2" />
                            Favorit
                          </span>
                          <span>
                            <IoIosArrowForward />
                          </span>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          onClick={toggleDrawer(false)}
                          to="/account/review"
                          className={({ isActive }) =>
                            isActive
                              ? "w-full text-black justify-between font-bold flex items-center  py-4 text-left hover:bg-gray-100"
                              : "w-full flex items-center justify-between  text-black py-4 text-left hover:bg-gray-100"
                          }
                        >
                          <span className="flex items-center">
                            <CiChat1 className="text-base mr-2" />
                            Ulasan
                          </span>
                          <span>
                            <IoIosArrowForward />
                          </span>
                        </NavLink>
                      </li>

                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full justify-between text-black flex items-center py-4 text-left text-hitam hover:bg-gray-100"
                        >
                          <span className="flex items-center">
                            <CiLogout className="text-base mr-2" />
                            Keluar
                          </span>

                          <span>
                            <IoIosArrowForward />
                          </span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="flex mx-2 bg-birumuda bg-opacity-40 rounded-lg py-4 px-2 items-end gap-3">
                  <div>
                    <img className="w-44" src="/images/sign-up.svg" alt="" />
                  </div>
                  <div>
                    <div>
                      <span className="text-base font-bold">
                        Yuk, mulai pengalaman belanja Anda!
                      </span>
                    </div>
                    <div className="mt-3 py-2">
                      <button
                        onClick={() => handleOpenModal("register")}
                        className="px-4 mr-4 py-2 text-white bg-black text-sm md:text-sm lg:text-base font-medium rounded-md hover:bg-black/80"
                      >
                        Daftar
                      </button>
                      <button
                        onClick={() => handleOpenModal("login")}
                        className="text-black px-4  py-2 rounded-md border border-black md:mr-2 text-sm md:text-sm lg:text-base font-medium"
                      >
                        Masuk
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className=" "></div>
            <div className="mx-2 mt-3">
              <h1 className="font-bold">Menu</h1>
              <ul className="py-2  text-base text-hitam">
                <li className="">
                  <NavLink
                    onClick={toggleDrawer(false)}
                    to="/products/list"
                    className={({ isActive }) =>
                      isActive
                        ? "w-full text-black font-bold justify-between flex items-center  py-4 text-left hover:bg-gray-100"
                        : "w-full flex items-center justify-between  text-black py-4 text-left hover:bg-gray-100"
                    }
                  >
                    <span className="flex items-center">
                      <CiUser className="text-base mr-2" />
                      Produk
                    </span>
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="mx-2 mt-3">
              <h1 className="font-bold">Bantuan</h1>
              <ul className="py-2  text-base text-hitam">
                <li className="">
                  <NavLink
                    onClick={toggleDrawer(false)}
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "w-full text-black font-bold justify-between flex items-center  py-4 text-left hover:bg-gray-100"
                        : "w-full flex items-center justify-between  text-black py-4 text-left hover:bg-gray-100"
                    }
                  >
                    <span className="flex items-center">
                      <CiUser className="text-base mr-2" />
                      Kontak
                    </span>
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={toggleDrawer(false)}
                    to="/help/center"
                    className={({ isActive }) =>
                      isActive
                        ? "w-full text-black font-bold justify-between flex items-center  py-4 text-left hover:bg-gray-100"
                        : "w-full flex items-center justify-between  text-black py-4 text-left hover:bg-gray-100"
                    }
                  >
                    <span className="flex items-center">
                      <CiShoppingTag className="text-base mr-2" />
                      Help Center
                    </span>
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </Drawer>
      </div>
    </>
  );
}
