import React from "react";

import useOrderShipping from "./hooks/useOrderShipping";
import useClickOutside from "../../../../hooks/admin/useClickOutside";

import SearchInput from "./components/SearchInput";
import ShippingTable from "./components/ShippingTable";

const DataOrderShipping = () => {
  const { filteredOrderItems, searchQuery, setSearchQuery } =
    useOrderShipping();

  const { openDropdown, setOpenDropdown, dropdownRef } = useClickOutside();

  return (
    <div className="mt-10 px-5 text-xl font-bold">
      Data Pengguna
      <div className="border p-5 mt-10">
        <div className="flex items-start justify-between">
          <p className="font-semibold text-sm">Tabel Data Pengguna</p>
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="px-0">
          <ShippingTable
            orders={filteredOrderItems}
            openDropdown={openDropdown}
            dropdownRef={dropdownRef}
            onToggleDropdown={setOpenDropdown}
          />
        </div>
      </div>
    </div>
  );
};

export default DataOrderShipping;
