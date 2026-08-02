import React from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import BrandLogo from "./BrandLogo";
import SearchButton from "./SearchButton";
import CartButton from "./CartButton";

const MobileTopBar = ({
  scrolling,
  itemCount,
  navbarOpen,
  onSearchOpen,
  onCartClick,
  onToggleDrawer,
}) => {
  return (
    <div className="flex fixed bg-black w-full top-0 z-0 px-12 md:px-24 py-2 lg:hidden items-center justify-between">
      <div className="lg:hidden flex items-center justify-between">
        {scrolling ? (
          <SearchButton onClick={onSearchOpen} variant="mobile" />
        ) : (
          <BrandLogo onClick={onToggleDrawer(false)} />
        )}
      </div>

      <div className="lg:hidden flex gap-4">
        <div className="flex items-center">
          <CartButton itemCount={itemCount} onClick={onCartClick} />
        </div>
        {navbarOpen ? (
          <IconButton onClick={onToggleDrawer(false)} edge="start">
            <CloseIcon className="text-white" />
          </IconButton>
        ) : (
          <IconButton onClick={onToggleDrawer(true)} edge="start">
            <MenuIcon className="text-white" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default MobileTopBar;
