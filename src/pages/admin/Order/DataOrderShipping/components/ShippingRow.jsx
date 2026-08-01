import React from "react";
import { formatCurrency } from "../utils/formatters";

const ShippingRow = ({
  order,
  isDropdownOpen,
  dropdownRef,
  onToggleDropdown,
}) => {
  return (
    <tr>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <div className="">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {order.order_code}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <p className="text-sm text-blue-gray-900 font-normal">
              {order.city}
            </p>
          </div>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <div className="">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            {order.courier}
          </p>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            {order.etd}
          </p>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
          {formatCurrency(order.shipping_cost)}
        </p>
      </td>

      <td className="p-4 border-b border-blue-gray-50 relative">
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleDropdown(order.id);
            }}
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
          >
            ⋮
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Edit
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Detail
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
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

export default ShippingRow;
