import React from "react";
import { formatCurrency, getStatusBadgeClass } from "../utils/formatters";

const TransactionRow = ({
  order,
  isDropdownOpen,
  dropdownRef,
  onToggleDropdown,
  onOpenDrawer,
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
            <p className="text-xs text-blue-gray-900 font-normal">
              {order.transaction_id}
            </p>
          </div>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <div className="">
          <p
            className={`block px-2 py-1 rounded-md w-fit text-sm font-medium ${getStatusBadgeClass(
              order.transaction_status
            )}`}
          >
            {order.transaction_status}
          </p>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="">
          <p className="block antialiased text-xs leading-normal text-blue-gray-900 font-normal">
            {formatCurrency(order.gross_amount)}
          </p>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
          {order.payment_method_display}
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
                <button
                  onClick={() => onOpenDrawer(order.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Detail
                </button>
                {/* <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  Hapus
                </button> */}
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default TransactionRow;
