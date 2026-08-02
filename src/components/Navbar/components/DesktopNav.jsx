import React from "react";
import { Link } from "react-router-dom";
import { CiCircleQuestion } from "react-icons/ci";
import BrandLogo from "./BrandLogo";
import SearchButton from "./SearchButton";
import CartButton from "./CartButton";
import AccountDropdown from "./AccountDropdown";
import AuthButtons from "./AuthButtons";

const DesktopNav = ({
  scrolling,
  itemCount,
  isLoggedIn,
  isDropdownOpen,
  dropdownRef,
  onToggleDropdown,
  onLogout,
  onCartClick,
  onSearchOpen,
  onLoginClick,
  onRegisterClick,
}) => {
  return (
    <div className="justify-start hidden lg:ml-0 lg:max-w-7xl xl:max-w-full lg:items-center lg:flex lg:px-0">
      <div className="flex lg:ml-0 items-center">
        <div className={scrolling ? "scrolled hidden lg:block" : "lg:ml-0"}>
          <BrandLogo iconClassName="md:w-6 2xl:w-10" textClassName="w-14 2xl:w-16" />
        </div>
      </div>

      <div className="hidden ml-auto space-x-2 lg:inline-block">
        <div className="hidden lg:flex items-center space-x-2 ml-auto">
          <SearchButton onClick={onSearchOpen} variant="desktop" />

          <Link
            to="/help/center"
            className="rounded-full hover:bg-gray-200/15 px-3 py-1.5"
          >
            <CiCircleQuestion className="text-2xl font-bold" />
          </Link>

          <CartButton itemCount={itemCount} onClick={onCartClick} />

          <div className="hidden ml-auto lg:inline-block">
            {isLoggedIn ? (
              <AccountDropdown
                isOpen={isDropdownOpen}
                dropdownRef={dropdownRef}
                onToggle={onToggleDropdown}
                onLogout={onLogout}
              />
            ) : (
              <AuthButtons
                onLoginClick={onLoginClick}
                onRegisterClick={onRegisterClick}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopNav;
