import { useState } from "react";

const useProductModals = (onDataChanged) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = (productId) => {
    setSelectedProductId(productId);
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => setDrawerOpen(false);

  const handleOpenCreateModal = () => setCreateModal(true);
  const handleCloseCreateModal = () => setCreateModal(false);

  const handleOpenEditModal = (productId) => {
    setSelectedProductId(productId);
    setEditModal(true);
  };
  const handleCloseEditModal = () => setEditModal(false);

  const handleOpenDeleteModal = (productId) => {
    setSelectedProductId(productId);
    setDeleteModal(true);
  };
  const handleCloseDeleteModal = () => setDeleteModal(false);

  const handleCreateSuccess = () => onDataChanged?.();
  const handleEditSuccess = () => onDataChanged?.();
  const handleDeleteSuccess = () => onDataChanged?.();

  return {
    selectedProductId,
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

export default useProductModals;
