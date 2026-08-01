import { useEffect, useRef, useState } from "react";

// Hook generik: mengelola dropdown yang terbuka (berdasarkan id)
// dan menutupnya otomatis saat klik di luar area ref.
const useClickOutside = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return { openDropdown, setOpenDropdown, dropdownRef };
};

export default useClickOutside;
