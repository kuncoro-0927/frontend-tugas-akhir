import React from "react";

const VerifiedBadge = ({ isVerified }) => {
  return (
    <div className="w-max">
      <div
        className={`relative grid items-center font-sans font-bold whitespace-nowrap select-none ${
          isVerified
            ? "bg-green-500/20 text-green-600"
            : "bg-red-500/20 text-red-600"
        } py-1 px-2 text-xs rounded-md`}
      >
        <span>{isVerified ? "Terverifikasi" : "Belum Verifikasi"}</span>
      </div>
    </div>
  );
};

export default VerifiedBadge;
