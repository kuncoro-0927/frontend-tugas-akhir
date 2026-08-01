import React from "react";
import { isAvailable } from "../utils/formatters";

const StatusToggle = ({ status, onToggle }) => {
  const available = isAvailable(status);

  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
        available
          ? "bg-green-100 border border-green-400"
          : "bg-red-100 border border-red-400"
      }`}
    >
      <div
        className={`border w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
          available
            ? "translate-x-6 bg-green-200 border-green-400"
            : "translate-x-0 bg-red-200 border-red-400"
        }`}
      ></div>
    </button>
  );
};

export default StatusToggle;
