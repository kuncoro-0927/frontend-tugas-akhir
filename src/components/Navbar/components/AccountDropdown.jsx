import React from "react";
import { NavLink } from "react-router-dom";
import { CiUser, CiShoppingTag, CiChat1, CiLogout } from "react-icons/ci";
import Avatar from "../../ui/Avatar";

const menuLinkClass = ({ isActive }) =>
  isActive
    ? "w-full text-black font-bold flex items-center px-6 py-4 text-left hover:bg-gray-100"
    : "w-full flex items-center px-6 text-black py-4 text-left hover:bg-gray-100";

const AccountDropdown = ({ isOpen, dropdownRef, onToggle, onLogout }) => {
  return (
    <>
      <div
        className="flex hover:bg-gray-300 hover:duration-200 hover:bg-opacity-30 hover:rounded-full hover:p-1.5 p-1.5 items-center gap-3 cursor-pointer"
        onClick={onToggle}
      >
        <Avatar />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50"
        >
          <ul className="py-2 text-sm text-hitam">
            <li>
              <NavLink to="/account/profile" className={menuLinkClass}>
                <CiUser className="text-base mr-2" />
                Profil
              </NavLink>
            </li>
            <li>
              <NavLink to="/account/order" className={menuLinkClass}>
                <CiShoppingTag className="text-base mr-2" />
                Pesanan
              </NavLink>
            </li>
            <li>
              <NavLink to="/account/review" className={menuLinkClass}>
                <CiChat1 className="text-base mr-2" />
                Ulasan
              </NavLink>
            </li>
            <li>
              <hr className="my-1" />
            </li>
            <li>
              <button
                onClick={onLogout}
                className="w-full text-black flex items-center px-6 py-4 text-left text-hitam hover:bg-gray-100"
              >
                <CiLogout className="text-base mr-2" />
                Keluar
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default AccountDropdown;
