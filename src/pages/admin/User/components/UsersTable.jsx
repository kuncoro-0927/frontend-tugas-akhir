import React, { useEffect, useRef, useState } from "react";
import UserTableRow from "./UserTableRow";

const TABLE_HEADERS = [
  "Nama",
  "Role",
  "Kota / Provinsi",
  "Status",
  "Nomor Telepon",
  "Aksi",
];

const UsersTable = ({ users, onEdit, onDetail, onDelete }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
        {users.map((user) => (
          <UserTableRow
            key={user.id}
            user={user}
            isDropdownOpen={openDropdown === user.id}
            onToggleDropdown={setOpenDropdown}
            onEdit={onEdit}
            onDetail={onDetail}
            onDelete={onDelete}
            dropdownRef={dropdownRef}
          />
        ))}
        {users.length === 0 && (
          <tr>
            <td colSpan="6" className="text-center py-5 text-gray-500">
              Tidak ada data pengguna.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UsersTable;
