import React from "react";
import TransactionRow from "./TransactionRow";

const TABLE_HEADERS = [
  "ID Pesanan",
  "ID Transaksi",
  "Status",
  "Total Belanja",
  "Pembayaran",
  "Aksi",
];

const TransactionsTable = ({
  orders,
  openDropdown,
  dropdownRef,
  onToggleDropdown,
  onOpenDrawer,
}) => {
  return (
    <table className="w-full min-w-max table-auto text-left">
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
          <TransactionRow
            key={order.id}
            order={order}
            isDropdownOpen={openDropdown === order.id}
            dropdownRef={dropdownRef}
            onToggleDropdown={onToggleDropdown}
            onOpenDrawer={onOpenDrawer}
          />
        ))}
        {orders.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-5 text-gray-500">
              Tidak ada data transaksi.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TransactionsTable;
