import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { CiUser, CiShoppingTag, CiHeart, CiChat1, CiLogout } from "react-icons/ci";
import Avatar from "../../Avatar";

const itemLinkClass = ({ isActive }) =>
  isActive
    ? "w-full text-black font-bold justify-between flex items-center py-4 text-left hover:bg-gray-100"
    : "w-full flex items-center justify-between text-black py-4 text-left hover:bg-gray-100";

const MobileAccountMenu = ({ user, onNavigate, onLogout }) => {
  const displayName =
    (user?.name && user.name.trim()) ||
    `${user?.firstname || ""} ${user?.lastname || ""}`;

  return (
    <>
      <div className="flex mx-7 sm:mx-12 md:mx-24 2xl:mx-32 hover:bg-gray-300 hover:duration-200 hover:bg-opacity-30 hover:rounded-full w-fit hover:p-1.5 p-1.5 items-center gap-3 cursor-pointer">
        <Avatar />
        <span className="font-bold text-base">{displayName}</span>
      </div>
      <div className="border-b pb-3 sm:mx-12 md:mx-24">
        <ul className="py-2  text-base text-hitam">
          <li>
            <NavLink onClick={onNavigate} to="/account/profile" className={itemLinkClass}>
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
            <NavLink onClick={onNavigate} to="/account/order" className={itemLinkClass}>
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
            <NavLink onClick={onNavigate} to="/account/wishlist" className={itemLinkClass}>
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
            <NavLink onClick={onNavigate} to="/account/review" className={itemLinkClass}>
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
              onClick={onLogout}
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
  );
};

export default MobileAccountMenu;
