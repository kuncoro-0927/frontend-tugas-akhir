import { HiOutlineMenu } from "react-icons/hi";

const AdminNavBar = ({ onToggleSidebar }) => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <button onClick={onToggleSidebar} className="p-2 text-gray-600">
        <HiOutlineMenu size={30} />
      </button>
      <div className="flex items-center space-x-5">
        {/* Profil dan Notifikasi */}
      </div>
    </nav>
  );
};

export default AdminNavBar;
