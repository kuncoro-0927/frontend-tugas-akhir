import React from "react";
import {
  getInitials,
  getColorFromString,
  formatCurrency,
  STATUS_STYLES,
} from "../utils/formatters";

const OrderRow = ({
  order,
  isDropdownOpen,
  dropdownRef,
  onToggleDropdown,
  onOpenResiModal,
  onOpenEditModal,
  onOpenDrawer,
  onOpenDeleteModal,
}) => {
  return (
    <tr>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <div className="">
            <p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
              {order.order_code}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <div
            className="rounded-full w-9 h-9 flex items-center justify-center text-white font-semibold text-sm"
            style={{
              backgroundColor: getColorFromString(
                order.user_email || order.user_name || "NN"
              ),
            }}
          >
            {getInitials(order.firstname, order.lastname)}
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-blue-gray-900 font-normal">
              {order.user_name}
            </p>
            <p className="text-xs text-blue-gray-900 font-normal opacity-70">
              {order.user_email}
            </p>
          </div>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <div className="">
          <p
            className={`block w-fit px-2 py-0.5 rounded-md antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal ${
              STATUS_STYLES[order.status] || "text-gray-500"
            }`}
          >
            {order.status}
          </p>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
          {formatCurrency(order.total_amount)}
        </p>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          {order.tracking_number ? (
            <p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
              {order.tracking_number}
            </p>
          ) : (
            <button
              onClick={() => onOpenResiModal(order.id)}
              disabled={order.status === "pending"}
              className={`text-xs ${
                order.status === "pending"
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-graytext hover:underline"
              }`}
            >
              + Tambah
            </button>
          )}
        </div>
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
                  onClick={() => onOpenResiModal(order.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Tambah Resi
                </button>
                <button
                  onClick={() => onOpenEditModal(order.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => onOpenDrawer(order.id)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Detail
                </button>
                <button
                  onClick={() => onOpenDeleteModal(order.id)}
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

export default OrderRow;
