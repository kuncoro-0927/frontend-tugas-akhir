import { useEffect, useState } from "react";

/**
 * Hook untuk mengelola buka/tutup drawer navbar mobile.
 * Drawer otomatis tertutup saat viewport berubah jadi desktop.
 */
const useNavDrawer = (isDesktop) => {
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setNavbar(false);
    }
  }, [isDesktop]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setNavbar(open);
  };

  return { navbar, toggleDrawer };
};

export default useNavDrawer;
