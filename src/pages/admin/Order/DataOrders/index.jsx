import React, { useState } from "react";
import AddResiModal from "../../../../components/Admin/Modal/AddTrackingNumber";
import ModalCreateOrder from "../../../../components/Admin/Modal/Orders/CreateOrder";
import ModalCreateOrderByAdmin from "../../../../components/Admin/Modal/Orders/CreateManualOrder";
import ModalUpdateOrder from "../../../../components/Admin/Modal/Orders/UpdateOrder";
import ModalDeleteOrder from "../../../../components/Admin/Modal/Orders/DeleteOrder";
import DetailOrders from "../../../../components/Admin/Modal/Orders/DetailOrders";

import useOrders from "./hooks/useOrders";
import useOrderModals from "./hooks/useOrderModals";
import useClickOutside from "../../../../hooks/admin/useClickOutside";

import OrdersHeader from "./components/OrdersHeader";
import SearchInput from "./components/SearchInput";
import StatusTabs from "./components/StatusTabs";
import OrdersTable from "./components/OrdersTable";

const DataOrders = () => {
  const [openExport, setOpenExport] = useState(false);

  const {
    filteredOrders,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    fetchOrders,
  } = useOrders();

  const { openDropdown, setOpenDropdown, dropdownRef } = useClickOutside();

  const {
    selectedOrderId,
    showResiModal,
    setShowResiModal,
    createModal,
    createModalByAdmin,
    editModal,
    deleteModal,
    drawerOpen,
    setDrawerOpen,
    handleOpenCreateModal,
    handleOpenCreateModalByAdmin,
    handleCloseCreateModal,
    handleCloseCreateModalByAdmin,
    handleCloseEditModal,
    handleCloseDeleteModal,
    handleOpenDrawer,
    handleOpenEditModal,
    handleOpenDeleteModal,
    handleOpenResiModal,
    handleSubmitResi,
    handleCreateSuccess,
    handleCreateByAdminSuccess,
    handleEditSuccess,
    handleDeleteSuccess,
  } = useOrderModals(fetchOrders);

  const handleToggleDropdown = (orderId) => {
    setOpenDropdown(orderId);
  };

  const handleOpenResiModalAndCloseDropdown = (orderId) => {
    handleOpenResiModal(orderId);
    setOpenDropdown(null);
  };

  return (
    <>
      <DetailOrders
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        orderId={selectedOrderId}
      />
      {showResiModal && (
        <AddResiModal
          orderId={selectedOrderId}
          onClose={() => setShowResiModal(false)}
          onSubmit={handleSubmitResi}
        />
      )}
      <ModalCreateOrder
        open={createModal}
        handleClose={handleCloseCreateModal}
        onUpdate={handleCreateSuccess}
      />
      <ModalCreateOrderByAdmin
        open={createModalByAdmin}
        handleClose={handleCloseCreateModalByAdmin}
        onUpdate={handleCreateByAdminSuccess}
      />
      <ModalUpdateOrder
        open={editModal}
        handleClose={handleCloseEditModal}
        orderId={selectedOrderId}
        onUpdate={handleEditSuccess}
      />
      <ModalDeleteOrder
        open={deleteModal}
        handleClose={handleCloseDeleteModal}
        orderId={selectedOrderId}
        onUpdate={handleDeleteSuccess}
      />

      <div className="mt-10 px-5 text-xl font-bold">
        <OrdersHeader
          openExport={openExport}
          onExportClick={() => setOpenExport(true)}
          onCloseExport={() => setOpenExport(false)}
          onCreateByAdminClick={handleOpenCreateModalByAdmin}
          onCreateClick={handleOpenCreateModal}
        />

        <div className="border p-5 mt-10">
          <div className="flex items-start justify-between">
            <p className="font-semibold text-sm">Tabel Data Pesanan</p>
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="px-0">
            <StatusTabs activeTab={activeTab} onChange={setActiveTab} />

            <OrdersTable
              orders={filteredOrders}
              openDropdown={openDropdown}
              dropdownRef={dropdownRef}
              onToggleDropdown={handleToggleDropdown}
              onOpenResiModal={handleOpenResiModalAndCloseDropdown}
              onOpenEditModal={handleOpenEditModal}
              onOpenDrawer={handleOpenDrawer}
              onOpenDeleteModal={handleOpenDeleteModal}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DataOrders;
