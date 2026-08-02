import React from "react";
import { Link } from "react-router-dom";

const BrandLogo = ({ onClick, iconClassName = "w-6", textClassName = "w-14" }) => {
  return (
    <Link onClick={onClick} to="/">
      <div className="flex items-center gap-1">
        <img src="/images/logofprimary.svg" className={iconClassName} alt="Logo" />
        <img src="/images/logotext.svg" className={textClassName} alt="Logo" />
      </div>
    </Link>
  );
};

export default BrandLogo;
