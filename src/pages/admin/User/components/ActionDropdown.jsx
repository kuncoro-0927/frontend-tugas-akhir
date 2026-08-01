import React from "react";

const ActionDropdown = ({
  userId,
  isOpen,
  onToggle,
  onEdit,
  onDetail,
  onDelete,
  dropdownRef,
}) => {
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle(userId);
        }}
        type="button"
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
      >
        ⋮
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              onClick={() => onEdit(userId)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => onDetail(userId)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Detail
            </button>
            <button
              onClick={() => onDelete(userId)}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Hapus
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionDropdown;
