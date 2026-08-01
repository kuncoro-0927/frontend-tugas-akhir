import React from "react";
import ProductRow from "./ProductRow";

const TABLE_HEADERS = [
  "Nama",
  "Lebar / cm",
  "Tinggi / cm",
  "Kategori",
  "Stok",
  "Harga",
  "Status",
  "Aksi",
];

const ProductsTable = ({
  products,
  openDropdown,
  dropdownRef,
  onToggleDropdown,
  onToggleStatus,
  onOpenEditModal,
  onOpenDrawer,
  onOpenDeleteModal,
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
        {products.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
            isDropdownOpen={openDropdown === product.id}
            dropdownRef={dropdownRef}
            onToggleDropdown={onToggleDropdown}
            onToggleStatus={onToggleStatus}
            onOpenEditModal={onOpenEditModal}
            onOpenDrawer={onOpenDrawer}
            onOpenDeleteModal={onOpenDeleteModal}
          />
        ))}
        {products.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-5 text-gray-500">
              Tidak ada data produk.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ProductsTable;
