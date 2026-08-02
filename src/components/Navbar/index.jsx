import { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";
import { instance } from "../../utils/axios";
import { fetchCartItemCount, resetCart } from "../../redux/cartSlice";
import { resetWishlist, fetchWishlist } from "../../redux/wishlistSlice";
import { openDrawer } from "../../redux/cartDrawer";

import useScrollEffect from "./hooks/useScrollEffect";
import useAccountDropdown from "./hooks/useAccountDropdown";
import useNavDrawer from "./hooks/useNavDrawer";

import DesktopNav from "./components/DesktopNav";
import MobileTopBar from "./components/MobileTopBar";
import MobileDrawer from "./components/MobileDrawer";

export default function NavBar({ handleOpenModal, handleSearchOpen }) {
  const dispatch = useDispatch();
  const itemCount = useSelector((state) => state.cart.itemCount);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const user = useSelector((state) => state.user.user);
  const userId = user?.id;
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItemCount(userId));
      dispatch(fetchWishlist(userId));
    }
  }, [dispatch, userId]);

  const scrolling = useScrollEffect();
  const { isOpen: isDropdownOpen, toggleDropdown, dropdownRef } = useAccountDropdown();
  const { navbar, toggleDrawer } = useNavDrawer(isDesktop);

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

  const handleCartClick = () => dispatch(openDrawer());

  return (
    <>
      <nav className="sticky md:py-2 2xl:px-32 w-full bg-black text-white top-0 lg:px-14 transition-colors duration-300 z-50">
        <DesktopNav
          scrolling={scrolling}
          itemCount={itemCount}
          isLoggedIn={isLoggedIn}
          isDropdownOpen={isDropdownOpen}
          dropdownRef={dropdownRef}
          onToggleDropdown={toggleDropdown}
          onLogout={handleLogout}
          onCartClick={handleCartClick}
          onSearchOpen={handleSearchOpen}
          onLoginClick={() => handleOpenModal("login")}
          onRegisterClick={() => handleOpenModal("register")}
        />

        <MobileTopBar
          scrolling={scrolling}
          itemCount={itemCount}
          navbarOpen={navbar}
          onSearchOpen={handleSearchOpen}
          onCartClick={handleCartClick}
          onToggleDrawer={toggleDrawer}
        />
      </nav>

      <MobileDrawer
        open={navbar}
        onClose={toggleDrawer(false)}
        isLoggedIn={isLoggedIn}
        user={user}
        onNavigate={toggleDrawer(false)}
        onLogout={handleLogout}
        onLoginClick={() => handleOpenModal("login")}
        onRegisterClick={() => handleOpenModal("register")}
      />
    </>
  );
}
