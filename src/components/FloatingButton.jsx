import { useState } from "react";
import { FaWhatsapp, FaPhone, FaPlus, FaTimes } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa6";
export default function FloatingButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {open && (
        <>
          <a
            href="https://wa.me/6281938594544"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-black to-black/70 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
            title="WhatsApp"
          >
            <FaWhatsapp size={25} />
          </a>
          <a
            href="/contact"
            className="bg-gradient-to-br from-black to-black/70 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
            title="Kontak"
          >
            <FaPhone size={18} />
          </a>
        </>
      )}
      <div className="flex items-center gap-5">
        <h1 className="bg-white shadow-md px-3 py-1.5 text-sm rounded-md">
          Perlu Bantuan?
        </h1>
        <button
          onClick={() => setOpen(!open)}
          className="bg-gradient-to-br from-black to-black/70 rounded-2xl tracking-wide  text-white w-14 h-14 flex items-center justify-center shadow-xl transition-transform duration-300"
          title="Menu"
        >
          <span
            className={`transition-all duration-300 ease-in-out transform ${
              open
                ? "opacity-0 rotate-180 scale-0 absolute"
                : "opacity-100 rotate-0 scale-100"
            }`}
          >
            <FaHeadset size={20} />
          </span>
          <span
            className={`transition-all duration-300 ease-in-out transform ${
              open
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 rotate-180 scale-0 absolute"
            }`}
          >
            <FaTimes size={20} />
          </span>
        </button>
      </div>
    </div>
  );
}
