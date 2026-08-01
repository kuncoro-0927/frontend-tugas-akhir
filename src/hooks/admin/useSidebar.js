import { useState } from "react";

const useSidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const handleSidebarHover = (isHovered) => {
    setIsSidebarHovered(isHovered);
  };

  return {
    isSidebarCollapsed,
    isSidebarHovered,
    toggleSidebar,
    handleSidebarHover,
  };
};

export default useSidebar;
