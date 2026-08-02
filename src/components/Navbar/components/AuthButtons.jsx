import React from "react";

const AuthButtons = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="space-x-3">
      <button
        onClick={onLoginClick}
        className="text-white py-2 px-3 hover:bg-gray-200/15 rounded-full md:text-sm 2xl:text-lg font-medium"
      >
        Masuk
      </button>
      <button
        onClick={onRegisterClick}
        className="px-3 py-2 border md:text-sm 2xl:text-lg font-medium rounded-full shadow hover:bg-gray-200/15"
      >
        Daftar
      </button>
    </div>
  );
};

export default AuthButtons;
