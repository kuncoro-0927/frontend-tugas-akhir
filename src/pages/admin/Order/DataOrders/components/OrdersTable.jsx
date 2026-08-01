import React from "react";
import OrderRow from "./OrderRow";

const TABLE_HEADERS = [
  "ID Pesanan",
  "Nama",
  "Status",
  "Total Harga",
  "Resi",
  "Aksi",
];

const OrdersTable = ({
  orders,
  openDropdown,
  dropdownRef,
  onToggleDropdown,
  onOpenResiModal,
  onOpenEditModal,
  onOpenDrawer,
  onOpenDeleteModal,
}) => {
  return (
    <table className="w-full table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEADERS.map((header, index) => (
            <th
              key={index}
              className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
            >
              <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                {header}
              </p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderRow
            key={order.id}
            order={order}
            isDropdownOpen={openDropdown === order.id}
            dropdownRef={dropdownRef}
            onToggleDropdown={onToggleDropdown}
            onOpenResiModal={onOpenResiModal}
            onOpenEditModal={onOpenEditModal}
            onOpenDrawer={onOpenDrawer}
            onOpenDeleteModal={onOpenDeleteModal}
          />
        ))}
        {orders.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-5 text-gray-500">
              Tidak ada data pesanan.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrdersTable;
