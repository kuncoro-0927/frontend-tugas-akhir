import React from "react";
import { isPromoActive } from "../utils/formatters";

const StatusToggle = ({ isActive, onToggle }) => {
  const active = isPromoActive(isActive);

  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
        active
          ? "bg-green-100 border border-green-400"
          : "bg-red-100 border border-red-400"
      }`}
    >
      <div
        className={`border w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
          active
            ? "translate-x-6 bg-green-200 border-green-400"
            : "translate-x-0 bg-red-200 border-red-400"
        }`}
      ></div>
    </button>
  );
};

export default StatusToggle;
