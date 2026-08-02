import { useEffect, useState } from "react";

/**
 * Hook untuk mendeteksi apakah halaman sudah discroll melewati threshold.
 */
const useScrollEffect = (threshold = 50) => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return scrolling;
};

export default useScrollEffect;
