import React from "react";

const StatCard = ({ icon, iconBg, iconColor, title, value, footer, footerColor }) => {
  return (
    <div className="border border-gray-300 hover:-translate-y-2 duration-300 w-full h-36 rounded-2xl px-5 p-5">
      <div className="text-sm flex items-center gap-4">
        <div className={`${iconBg} p-2 rounded-md ${iconColor} text-base font-extrabold`}>
          {icon}
        </div>
        <p className="font-semibold">{title}</p>
      </div>
      <p className="font-extrabold text-xl mt-3">{value}</p>
      <p className={`text-xs font-bold mt-5 ${footerColor}`}>{footer}</p>
    </div>
  );
};

export default StatCard;
