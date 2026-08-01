import { useState } from "react";

const usePromoModals = (onDataChanged) => {
  const [selectedPromoId, setSelectedPromoId] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = (promoId) => {
    setSelectedPromoId(promoId);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleOpenCreateModal = () => setCreateModal(true);
  const handleCloseCreateModal = () => setCreateModal(false);

  const handleOpenEditModal = (promoId) => {
    setSelectedPromoId(promoId);
    setEditModal(true);
  };
  const handleCloseEditModal = () => setEditModal(false);

  const handleOpenDeleteModal = (promoId) => {
    setSelectedPromoId(promoId);
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setDeleteModal(false);

  const handleCreateSuccess = () => onDataChanged?.();
  const handleEditSuccess = () => onDataChanged?.();
  const handleDeleteSuccess = () => onDataChanged?.();

  return {
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
  };
};

export default usePromoModals;
