import React from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const itemLinkClass = ({ isActive }) =>
  isActive
    ? "w-full text-black font-bold justify-between flex items-center py-4 text-left hover:bg-gray-100"
    : "w-full flex items-center justify-between text-black py-4 text-left hover:bg-gray-100";

const MobileMenuSection = ({ title, items, onNavigate }) => {
  return (
    <div className="mx-7 sm:mx-12 md:mx-24 mt-3">
      <h1 className="font-bold">{title}</h1>
      <ul className="py-2 text-base text-hitam">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink onClick={onNavigate} to={to} className={itemLinkClass}>
              <span className="flex items-center">
                <Icon className="text-base mr-2" />
                {label}
              </span>
              <span>
                <IoIosArrowForward />
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenuSection;
