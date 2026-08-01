import React from "react";
import UserAvatar from "./UserAvatar";
import VerifiedBadge from "./VerifiedBadge";
import ActionDropdown from "./ActionDropdown";

const UserTableRow = ({
  user,
  isDropdownOpen,
  onToggleDropdown,
  onEdit,
  onDetail,
  onDelete,
  dropdownRef,
}) => {
  return (
    <tr>
      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex items-center gap-3">
          <UserAvatar user={user} />
          <div className="flex flex-col">
            <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
              {user.name}
            </p>
            <p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal opacity-70">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
          {user.role_name}
        </p>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <div className="flex flex-col">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
            {user.city ? user.city : "Tidak ada data"}
          </p>
          <p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal opacity-70">
            {user.province ? user.province : "Tidak ada data"}
          </p>
        </div>
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <VerifiedBadge isVerified={user.isverified === 1} />
      </td>

      <td className="p-4 border-b border-blue-gray-50">
        <p className="block antialiased font-sans text-xs leading-normal text-blue-gray-900 font-normal">
          {user.phone ? user.phone : "Tidak ada data"}
        </p>
      </td>

      <td className="p-4 border-b border-blue-gray-50 relative">
        <ActionDropdown
          userId={user.id}
          isOpen={isDropdownOpen}
          onToggle={onToggleDropdown}
          onEdit={onEdit}
          onDetail={onDetail}
          onDelete={onDelete}
          dropdownRef={dropdownRef}
        />
      </td>
    </tr>
  );
};

export default UserTableRow;
