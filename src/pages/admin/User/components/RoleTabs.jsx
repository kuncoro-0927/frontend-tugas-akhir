import React from "react";

const ROLES = ["admin", "user"];

const RoleTabs = ({ activeTab, onChange }) => {
  return (
    <div className="flex">
      {ROLES.map((role_name) => (
        <button
          key={role_name}
          onClick={() => onChange(role_name)}
          className={`px-4 py-2 text-sm ${
            activeTab === role_name
              ? "border-b-2 font-bold border-blue-500"
              : "font-normal"
          }`}
        >
          {role_name.charAt(0).toUpperCase() + role_name.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default RoleTabs;
