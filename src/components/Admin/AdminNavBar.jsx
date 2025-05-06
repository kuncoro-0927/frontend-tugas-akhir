import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { FaChevronDown } from "react-icons/fa";
import { logoutAdmin } from "../../redux/adminSlice";
import AvatarAdmin from "./Avatar";
import { useState } from "react";

const AdminNavBar = ({ onToggleSidebar }) => {
  const { admin } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    window.location.href = "/admin/login"; // Redirect ke halaman login
  };

  return (
    <nav className="flex justify-between w-full items-center p-4 bg-white border-b">
      <div className="flex items-center gap-5">
        <button
          onClick={onToggleSidebar}
          className="p-2.5 border border-gray-300 rounded-md"
        >
          <HiOutlineMenuAlt1 className="text-xl" />
        </button>

        <button className="border text-graytext flex items-center gap-3 px-3 pr-20 py-2.5 rounded-md text-sm border-gray-300">
          <CiSearch className="text-xl" />
          Pencarian...
        </button>
      </div>

      <div className="relative">
        <div className="flex items-center gap-2 cursor-pointer">
          <AvatarAdmin
            firstname={admin?.firstname}
            lastname={admin?.lastname}
          />
          <div className="flex-col items-start text-xs flex">
            <span className="text-sm">{admin?.email}</span>
            <span className="text-graytext text-xs">Admin</span>
          </div>
          <button
            className=" bg-gray-100 ml-5 p-3 rounded-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            {" "}
            <FaChevronDown className="text-gray-400 text-sm" />
          </button>
        </div>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50">
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => {
                setIsOpen(false);
                alert("Fitur Profil belum tersedia");
              }}
            >
              Profil
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavBar;
