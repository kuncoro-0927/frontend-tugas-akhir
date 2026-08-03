import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/common/Footer";

const MainLayout = ({ handleOpenModal, handleSearchOpen }) => (
  <>
    <NavBar handleOpenModal={handleOpenModal} handleSearchOpen={handleSearchOpen} />
    <Outlet />
    <Footer />
  </>
);

export default MainLayout;