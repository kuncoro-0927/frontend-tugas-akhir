import React from "react";
import DetailTransaction from "../../../../components/Admin/Modal/Transactions/DetailTransaction";
import useTransactions from "./hooks/useTransactions";
import useTransactionDrawer from "./hooks/useTransactionDrawer";
import useClickOutside from "../../../../hooks/admin/useClickOutside";

import SearchInput from "./components/SearchInput";
import TransactionsTable from "./components/TransactionsTable";

const DataTransactions = () => {
  const { filteredOrderItems, searchQuery, setSearchQuery } = useTransactions();

  const { openDropdown, setOpenDropdown, dropdownRef } = useClickOutside();

  const {
    selectedTransactionId,
    drawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
  } = useTransactionDrawer();

  return (
    <>
      <DetailTransaction
        open={drawerOpen}
        onClose={handleCloseDrawer}
        transactionId={selectedTransactionId}
      />

      <div className="mt-10 px-5 text-xl font-bold">
        Data Transaksi
        <div className="border p-5 mt-10">
          <div className="flex items-start justify-between">
            <p className="font-semibold text-sm">Tabel Data Transaksi</p>
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="px-0">
            <TransactionsTable
              orders={filteredOrderItems}
              openDropdown={openDropdown}
              dropdownRef={dropdownRef}
              onToggleDropdown={setOpenDropdown}
              onOpenDrawer={handleOpenDrawer}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTransactions;
