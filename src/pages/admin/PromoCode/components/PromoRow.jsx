import React from "react";
import {
  formatDiscountType,
  formatDiscountValue,
  formatExpiryDate,
} from "../utils/formatters";
import StatusToggle from "./StatusToggle";

const PromoRow = ({
  promo,
  isDropdownOpen,
  dropdownRef,
  onToggleDropdown,
  onToggleStatus,
  onOpenEditModal,
  onOpenDrawer,
  onOpenDeleteModal,
}) => {
  return (
    <tr>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <div className="">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {promo.code}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
          {formatDiscountType(promo.discount_type)}
        </p>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex flex-col">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            {formatDiscountValue(promo)}
          </p>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <StatusToggle
          isActive={promo.is_active}
          onToggle={() => onToggleStatus(promo.id)}
        />
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal opacity-70">
          {formatExpiryDate(promo.expiry_date)}
        </p>
      </td>

      <td className="p-4 border-b border-blue-gray-50 relative">
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleDropdown(promo.id);
            }}
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
          >
            ⋮
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <button
                  onClick={() => onOpenEditModal(promo.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => onOpenDrawer(promo.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Detail
                </button>
                <button
                  onClick={() => onOpenDeleteModal(promo.id)}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Hapus
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default PromoRow;
