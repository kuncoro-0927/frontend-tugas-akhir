import { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "../components/Admin/SidebarAdmin";
import AdminNavBar from "../components/Admin/AdminNavBar";

const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);
  const handleSidebarHover = (isHovered) => setIsSidebarHovered(isHovered);

  const contentMarginClass = isSidebarCollapsed
    ? isSidebarHovered
      ? "ml-[250px]"
      : "ml-[100px]"
    : "ml-[250px]";

  return (
    <section className="flex gap-10">
      <div
        className={`h-screen fixed top-0 left-0 z-50 transition-all duration-300 ${
          isSidebarCollapsed ? "w-[100px]" : "w-[250px]"
        }`}
      >
        <SidebarAdmin
          onSidebarHover={handleSidebarHover}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      </div>

      <div
        className={`w-full transition-all duration-300 ${contentMarginClass}`}
      >
        <AdminNavBar onToggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </section>
  );
};

export default AdminLayout;
