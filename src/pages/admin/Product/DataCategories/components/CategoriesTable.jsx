import React from "react";
import CategoryRow from "./CategoryRow";

const TABLE_HEADERS = [
  "ID",
  "Nama",
  "Jumlah produk",
  "Dibuat pada",
  "Diperbarui pada",
  "Aksi",
];

const CategoriesTable = ({
  categories,
  openDropdown,
  dropdownRef,
  onToggleDropdown,
  onOpenEditModal,
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
        {categories.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            isDropdownOpen={openDropdown === category.id}
            dropdownRef={dropdownRef}
            onToggleDropdown={onToggleDropdown}
            onOpenEditModal={onOpenEditModal}
            onOpenDeleteModal={onOpenDeleteModal}
          />
        ))}
        {categories.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-5 text-gray-500">
              Tidak ada data kategori.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
