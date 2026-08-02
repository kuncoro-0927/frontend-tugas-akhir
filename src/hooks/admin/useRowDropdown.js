import { useEffect, useState } from "react";

export function useRowDropdown() {
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("[data-row-dropdown]")) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return { openDropdown, setOpenDropdown };
}
