import React from "react";

const AvatarAdmin = ({ firstname = "", lastname = "" }) => {
  const initials = `${firstname?.charAt(0) || ""}${
    lastname?.charAt(0) || ""
  }`.toUpperCase();

  return (
    <div className="p-2.5 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold ">
      {initials}
    </div>
  );
};

export default AvatarAdmin;
