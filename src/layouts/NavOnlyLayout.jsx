import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

const NavOnlyLayout = ({ handleOpenModal, handleSearchOpen }) => (
  <>
    <NavBar handleOpenModal={handleOpenModal} handleSearchOpen={handleSearchOpen} />
    <Outlet />
  </>
);

export default NavOnlyLayout;