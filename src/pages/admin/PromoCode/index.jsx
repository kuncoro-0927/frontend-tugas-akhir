import React from "react";
import ModalCreatePromo from "../../../components/Admin/Modal/PromoCode/CreatePromoCode";
import ModalUpdatePromo from "../../../components/Admin/Modal/PromoCode/UpdatePromoCode";
import ModalDeletePromo from "../../../components/Admin/Modal/PromoCode/DeletePromo";
import DetailPromo from "../../../components/Admin/Modal/PromoCode/DetailPromoCode";

import usePromoCodes from "./hooks/usePromoCodes";
import usePromoModals from "./hooks/usePromoModals";
import useClickOutside from "../../../hooks/admin/useClickOutside";

import PromoCodesHeader from "./components/PromoCodesHeader";
import SearchInput from "./components/SearchInput";
import PromoCodesTable from "./components/PromoCodesTable";

const DataPromoCodes = () => {
  const {
    filteredUsers,
    searchQuery,
    setSearchQuery,
    fetchPromos,
    handleToggle,
  } = usePromoCodes();

  const { openDropdown, setOpenDropdown, dropdownRef } = useClickOutside();

  const {
    selectedPromoId,
    createModal,
    editModal,
    deleteModal,
    drawerOpen,
    handleOpenDrawer,
    handleCloseDrawer,
    handleOpenCreateModal,
    handleCloseCreateModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleCreateSuccess,
    handleEditSuccess,
    handleDeleteSuccess,
  } = usePromoModals(fetchPromos);

  return (
    <>
      <DetailPromo
        open={drawerOpen}
        onClose={handleCloseDrawer}
        promoId={selectedPromoId}
      />
      <ModalCreatePromo
        open={createModal}
        handleClose={handleCloseCreateModal}
        onUpdate={handleCreateSuccess}
      />
      <ModalUpdatePromo
        open={editModal}
        handleClose={handleCloseEditModal}
        promoId={selectedPromoId}
        onUpdate={handleEditSuccess}
      />

      <ModalDeletePromo
        open={deleteModal}
        handleClose={handleCloseDeleteModal}
        promoId={selectedPromoId}
        onUpdate={handleDeleteSuccess}
      />

      <div className="mt-10 px-5 text-xl font-bold">
        <PromoCodesHeader onCreateClick={handleOpenCreateModal} />

        <div className="border p-5 mt-10">
          <div className="flex items-start justify-between">
            <p className="font-semibold text-sm">Tabel Data Promo</p>
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="px-0">
            <PromoCodesTable
              promos={filteredUsers}
              openDropdown={openDropdown}
              dropdownRef={dropdownRef}
              onToggleDropdown={setOpenDropdown}
              onToggleStatus={handleToggle}
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

export default DataPromoCodes;
