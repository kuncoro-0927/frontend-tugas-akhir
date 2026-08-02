import React from "react";

const MobileGuestPrompt = ({ onRegisterClick, onLoginClick }) => {
  return (
    <div className="flex mx-2 sm:mx-12 md:mx-24 bg-birumuda bg-opacity-40 rounded-lg py-4 px-2 items-end gap-3">
      <div>
        <img className="w-44" src="/images/sign-up.svg" alt="" />
      </div>
      <div>
        <div>
          <span className="text-base font-bold">
            Yuk, mulai pengalaman belanja Anda!
          </span>
        </div>
        <div className="mt-3 py-2">
          <button
            onClick={onRegisterClick}
            className="px-4 mr-4 py-2 text-white bg-black text-sm md:text-sm lg:text-base font-medium rounded-md hover:bg-black/80"
          >
            Daftar
          </button>
          <button
            onClick={onLoginClick}
            className="text-black px-4 py-2 rounded-md border border-black md:mr-2 text-sm md:text-sm lg:text-base font-medium"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileGuestPrompt;
