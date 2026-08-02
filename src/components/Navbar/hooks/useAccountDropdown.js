import { useEffect, useRef, useState } from "react";

/**
 * Hook untuk toggle dropdown akun (desktop) yang otomatis tertutup
 * saat user klik di luar area dropdown.
 */
const useAccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return { isOpen, toggleDropdown, dropdownRef };
};

export default useAccountDropdown;
