import React from "react";

const TABS = ["all", "paid", "shipped", "completed"];

const StatusTabs = ({ activeTab, onChange }) => {
  return (
    <div className="flex">
      {TABS.map((status) => (
        <button
          key={status}
          onClick={() => onChange(status)}
          className={`px-4 py-2 text-sm ${
            activeTab === status
              ? "border-b-2 font-bold border-blue-500"
              : "font-normal"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default StatusTabs;
